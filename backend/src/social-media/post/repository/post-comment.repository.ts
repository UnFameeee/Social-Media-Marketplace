import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PROVIDER } from "src/database/providers/provider.constant";
import { PostCommentDto } from "src/database/dtos/post-comment.dto";
import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import { paginate } from "src/common/utils/paginate.utils";
import { Post } from "src/database/model/post.model";
import { PostComment } from "src/database/model/post-comment.model";
import { ParentChildComment } from "src/database/model/parent_child_comment.model";
import { PostCommentEntity } from "src/database/entity/post-comment";
import { ParentChildCommentEntity } from "src/database/entity/parent-child-comment";
import { Page } from "src/database/view-model/page-model";
import { PagingData } from "src/database/view-model/paging.model";
import { Profile } from "src/database/model/profile.model";
import { ProfileAvatarImage } from "src/database/model/profile_avatar_image.model";
import { Helper } from "src/common/utils/helper.utils";
import { PostCommentLikeRepository } from "./post-comment-like.repository";
import { NotificationService } from "src/notification/service/notification.service";
import { NotificationGateway } from "src/notification/gateway/notification.gateway";
import { SOCKET_EVENT } from "src/common/constants/socket.constant";

@Injectable()
export class PostCommentRepository {
    constructor(
        @Inject(PROVIDER.Post) private postRepository: typeof Post,
        @Inject(PROVIDER.PostComment) private postCommentRepository: typeof PostComment,
        @Inject(PostCommentLikeRepository) private postCommentLikeRepository: PostCommentLikeRepository,
        @Inject(PROVIDER.ParentChildComment) private parentChildCommentRepository: typeof ParentChildComment,
        private readonly notificationService: NotificationService,
        private readonly notificationGateway: NotificationGateway,
    ) { };

    async createComment(profile_id: number, postCommentDto: PostCommentDto): Promise<PostComment> {
        try {
            //comment to a post
            var postCommentModel = new PostCommentEntity();
            postCommentModel.profile_id = profile_id;
            postCommentModel.post_id = postCommentDto.post_id;
            postCommentModel.comment_text = postCommentDto.comment_text;
            const queryCreateData = await this.postCommentRepository.create(postCommentModel);

            //comment to a comment
            if (postCommentDto.parent_comment_id != null) {
                var parentChildCommentModel = new ParentChildCommentEntity();
                parentChildCommentModel.parent_comment_id = postCommentDto.parent_comment_id;
                parentChildCommentModel.child_comment_id = queryCreateData.post_comment_id;
                await this.parentChildCommentRepository.create(parentChildCommentModel);
            }
            return queryCreateData;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async updateComment(post_comment_id: number, comment_text: string): Promise<PostComment> {
        try {
            const queryUpdateData = await this.postCommentRepository.findOne({
                where: { post_comment_id: post_comment_id }
            })
            queryUpdateData.comment_text = comment_text;
            const res = await queryUpdateData.save();

            return res;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async deleteComment(profile_id: number, post_comment_id: number): Promise<any> {
        try {
            const queryData = await this.postCommentRepository.findOne({
                where: {
                    post_comment_id: post_comment_id,
                },
                include: [
                    {
                        model: Profile,
                        as: "comment_profile",
                        attributes: [],
                        where: {
                            profile_id: profile_id
                        }
                    }
                ]
            })
            if (queryData) {

                const queryChildCommentData = await this.parentChildCommentRepository.findAll({
                    where: {
                        [Op.or]: [
                            { "$parent_comment.post_comment_id$": post_comment_id },
                            { "$child_comment.post_comment_id$": post_comment_id }
                        ],
                    },
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "deletedAt"]
                    },
                    include: [
                        {
                            model: PostComment,
                            as: "parent_comment",
                            attributes: [],
                        },
                        {
                            model: PostComment,
                            as: "child_comment",
                            attributes: []
                        }
                    ]
                })

                // return queryChildCommentData;

                var idCommentDelete: number[] = [];

                if (queryChildCommentData.length > 0) {
                    var idAssociationDelete: number[] = [];
                    //if delete parent cmt
                    if (queryChildCommentData[0]["parent_comment_id"] == post_comment_id) {
                        for (const element of queryChildCommentData) {
                            idCommentDelete.push(element["child_comment_id"]);
                            idAssociationDelete.push(element.parent_child_comment_id);
                        }
                    } else {
                        idAssociationDelete.push(queryChildCommentData[0].parent_child_comment_id);
                    }

                    
                    await this.parentChildCommentRepository.destroy({
                        where: {
                            parent_child_comment_id: { [Op.in]: idAssociationDelete },
                        },
                    })
                }

                idCommentDelete.push(queryData.post_comment_id);

                await this.notificationService.removePostCommentNotification(idCommentDelete);
                var profile_rerender: number;
                for(const element of idCommentDelete){
                    if(element == queryData.post_comment_id){
                        const post_id = await this.notificationService.getPostIdByCommentId(element);
                        profile_rerender = await this.notificationService.getProfileReceiverByPostId(post_id);
                    }else{
                        profile_rerender = await this.notificationService.getProfileReceiverByCommentId(element);
                    }
                    console.log(profile_rerender);
                    this.notificationGateway.server.to(`${profile_rerender}`).emit(SOCKET_EVENT.RERENDER_NOTIFICATION);
                }

                const res = await this.postCommentRepository.destroy({
                    where: {
                        post_comment_id: { [Op.in]: idCommentDelete },
                    },
                })

                return res ? true : false;
            } else return false;

        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getAllCommentOfPost(profile_id: number, post_id: number, page: Page): Promise<any> {
        try {
            var result = new PagingData<any[]>();
            //query to get exclude array child comment
            const queryDataChildArray = await this.postCommentRepository.findAndCountAll({
                attributes: [
                    [Sequelize.col("all_child_comment.child_comment_id"), "child_comment_id_element"]
                ],
                include: [
                    {
                        model: ParentChildComment,
                        // attributes: ["child_comment_id"],
                        attributes: [],
                        as: "all_child_comment",
                        where: {
                            parent_comment_id: [Sequelize.col("post_comment_id")]
                        },
                    },
                    {
                        model: Post,
                        attributes: [],
                        where: { post_id: post_id },
                    },
                ],
                nest: true,
                raw: true,
                subQuery: false
            })

            var dataChildArray: number[] = [];
            for (const element of queryDataChildArray.rows) {
                dataChildArray.push(element["child_comment_id_element"]);
            }

            // const queryData2 = await this.postRepository.findAndCountAll({
            //     // attributes: [
            //     //     // "post_id", "written_text",
            //     //     // [Sequelize.col("post_profile.profile_id"), "profile_id"],
            //     //     // [Sequelize.col("post_profile.profile_name"), "profile_name"],
            //     //     // [Sequelize.col("post_profile.profile_avatar.link"), "avatar"],
            //     //     // [Sequelize.col("post_comment.comment_profile.profile_avatar.link"), "post_comment.avatar"],
            //     //     // [Sequelize.col("post_comment.comment_profile.profile_name"), "post_comment.profile_name"],
            //     //     [Sequelize.col("post_comment.post_comment_id"), "post_comment.post_comment_id"],
            //     //     [Sequelize.col("post_comment.comment_text"), "post_comment.comment_text"],
            //     //     [Sequelize.col("post_comment.createdAt"), "post_comment.post_comment_id_lmao"],
            //     //     [Sequelize.col("post_comment.updatedAt"), "post_comment.updatedAt"],

            //     //     [Sequelize.col("post_comment.comment_profile.profile_name"), "post_comment.profile_name"],
            //     //     [Sequelize.col("post_comment.comment_profile.profile_id"), "post_comment.profile_id"],
            //     //     [Sequelize.col("post_comment.comment_profile.profile_avatar.link"), "post_comment.avatar"],

            //     //     // [Sequelize.col("post_comment.all_parent_comment.child_comment.comment_profile.profile_id"), "post_comment.all_parent_comment.child_comment.profile_id"],
            //     //     // [Sequelize.col("post_comment.all_parent_comment.child_comment.comment_profile.profile_name"), "post_comment.all_parent_comment.child_comment.profile_name"],
            //     //     // [Sequelize.col("post_comment.all_parent_comment.child_comment.comment_profile.profile_avatar.link"), "post_comment.all_parent_comment.child_comment.avatar"],
            //     //     // [Sequelize.col("post_comment.comment_profile.profile_name"), "post_comment.profile_name"],
            //     //     // [Sequelize.col("post_comment.comment_profile.profile_avatar.link"), "post_comment.avatar"],
            //     // ],
            //     // subQuery: false,
            //     attributes: [],
            //     where: { post_id: post_id },
            //     include: [
            //         {
            //             model: PostComment,
            //             as: "post_comment",
            //             order: [
            //                 ['createdAt', 'DESC']
            //             ],
            //             attributes: {
            //                 exclude: ["deletedAt"]
            //             },
            //             where: {
            //                 post_comment_id: { [Op.notIn]: dataChildArray }
            //             },
            //             include: [
            //                 {
            //                     model: Profile,
            //                     as: "comment_profile",
            //                     attributes: ["profile_id", "profile_name"],
            //                     include: [
            //                         {
            //                             model: ProfileAvatarImage,
            //                             as: "profile_avatar",
            //                             attributes: ["link"],
            //                         },
            //                     ],
            //                 },
            //                 {
            //                     model: ParentChildComment,
            //                     as: "all_child_comment",
            //                     attributes: ["child_comment_id"],
            //                     // required: true,
            //                     include: [
            //                         {
            //                             model: PostComment,
            //                             as: "child_comment",
            //                             attributes: {
            //                                 exclude: ["deletedAt"]
            //                             },
            //                             include: [
            //                                 {
            //                                     model: Profile,
            //                                     as: "comment_profile",
            //                                     attributes: ["profile_id", "profile_name"],
            //                                     include: [
            //                                         {
            //                                             model: ProfileAvatarImage,
            //                                             as: "profile_avatar",
            //                                             attributes: ["link"],
            //                                         },
            //                                     ],
            //                                 }
            //                             ],
            //                         },
            //                     ],
            //                 },
            //             ],

            //         },
            //     ],
            //     plain: true,
            //     ...paginate({ page })
            // })

            // console.log(queryData2.count);
            // return queryData2;

            //---------------------------

            const queryData = await this.postCommentRepository.findAndCountAll({
                where: {
                    post_comment_id: { [Op.notIn]: dataChildArray }
                },
                attributes: {
                    exclude: ["deletedAt"]
                },
                include: [
                    {
                        model: Profile,
                        as: "comment_profile",
                        attributes: ["profile_id", "profile_name"],
                        include: [
                            {
                                model: ProfileAvatarImage,
                                as: "profile_avatar",
                                attributes: ["link"],
                            },
                        ],
                    },
                    {
                        model: ParentChildComment,
                        as: "all_child_comment",
                        attributes: ["child_comment_id"],
                        include: [
                            {
                                model: PostComment,
                                as: "child_comment",
                                attributes: {
                                    exclude: ["deletedAt"]
                                },
                                include: [
                                    {
                                        model: Profile,
                                        as: "comment_profile",
                                        attributes: ["profile_id", "profile_name"],
                                        include: [
                                            {
                                                model: ProfileAvatarImage,
                                                as: "profile_avatar",
                                                attributes: ["link"],
                                            },
                                        ],
                                    }
                                ],
                            },
                        ],
                    },
                    {
                        model: Post,
                        attributes: [],
                        where: { post_id: post_id },
                    },
                ],
                order: [
                    ['createdAt', 'DESC']
                ],
                ...paginate({ page })
            })


            const post_comment = await Helper.SQLobjectToObject(queryData.rows);
            for (const comment of post_comment) {
                comment["isLiked"] = await  this.postCommentLikeRepository.isLikedPostComment(profile_id, comment["post_comment_id"]);
                comment["totalLike"] = await this.postCommentLikeRepository.allLikeOfPostComment(comment["post_comment_id"]);

                comment["profile_name"] = comment["comment_profile"]["profile_name"];

                //check if that profile doesnt have avatar
                if (comment["comment_profile"]["profile_avatar"] != null) {
                    comment["avatar"] = comment["comment_profile"]["profile_avatar"]["link"];
                } else {
                    comment["avatar"] = null;
                }
                delete comment["comment_profile"];

                //Go to child comment
                if (comment["all_child_comment"].length != 0) {
                    for (const child_comment of comment["all_child_comment"]) {
                        child_comment["post_comment_id"] = child_comment["child_comment"]["post_comment_id"];

                        child_comment["isLiked"] = await this.postCommentLikeRepository.isLikedPostComment(profile_id, child_comment["post_comment_id"]);
                        child_comment["totalLike"] = await this.postCommentLikeRepository.allLikeOfPostComment(child_comment["post_comment_id"]);


                        child_comment["comment_text"] = child_comment["child_comment"]["comment_text"];
                        child_comment["profile_id"] = child_comment["child_comment"]["profile_id"];
                        child_comment["post_id"] = child_comment["child_comment"]["post_id"];
                        child_comment["profile_id"] = child_comment["child_comment"]["profile_id"];
                        child_comment["profile_name"] = child_comment["child_comment"]["comment_profile"]["profile_name"];
                        // //check if that profile doesnt have avatar
                        if (child_comment["child_comment"]["comment_profile"]["profile_avatar"] != null) {
                            child_comment["avatar"] = child_comment["child_comment"]["comment_profile"]["profile_avatar"]["link"];
                        } else {
                            child_comment["avatar"] = null;
                        }
                        delete child_comment["comment_profile"];
                        child_comment["createdAt"] = child_comment["child_comment"]["createdAt"];
                        child_comment["updatedAt"] = child_comment["child_comment"]["updatedAt"];

                        //delete child_comment_id from SQL query
                        delete child_comment["child_comment_id"];
                        //delete child_comment from SQL query
                        delete child_comment["child_comment"];
                    }
                } else {
                    comment["all_child_comment"] = null;
                }
            }

            result.data = post_comment;
            page.totalElement = await this.postRepository.findAndCountAll({
                where: { post_id: post_id },
                include: [
                    {
                        model: PostComment,
                        as: "post_comment",
                        attributes: [],
                    }
                ]
            }).then((res) => { return res.count })
            result.page = page;
            return result;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}