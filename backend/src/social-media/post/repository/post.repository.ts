import { Inject, Injectable } from "@nestjs/common";
import { InternalServerErrorException } from "@nestjs/common/exceptions";
import { PROVIDER } from "src/database/providers/provider.constant";
import { PostData } from "../../../database/dtos/post-data.dto";
import { paginate } from "src/common/utils/paginate.utils";
import { Sequelize } from "sequelize-typescript";
import { PostLikeRepository } from "./post-like.repository";
import { Page } from "src/database/view-model/page-model";
import { PagingData } from "src/database/view-model/paging.model";
import { Post } from "src/database/model/post.model";
import { Profile } from "src/database/model/profile.model"; ''
import { ProfileAvatarImage } from "src/database/model/profile_avatar_image.model";
import { ProfilePostImage } from "src/database/model/profile_post_image.model";
import { Helper } from "src/common/utils/helper.utils";
import { Op } from "sequelize";

@Injectable()
export class PostRepository {
    constructor(
        @Inject(PROVIDER.Post) private postRepository: typeof Post,
        @Inject(PostLikeRepository) private postLikeRepository: PostLikeRepository,
        @Inject(PROVIDER.ProfilePostImage) private profilePostImageRepository: typeof ProfilePostImage,
    ) { }

    async getAllPost(profile_id: number, page: Page): Promise<PagingData<Post[]>> {
        try {
            var result = new PagingData<Post[]>();
            var queryData = await this.postRepository.findAndCountAll({
                attributes: [
                    "post_id", "written_text", "createdAt", "updatedAt", "totalLike", "profile_id",
                    // [Sequelize.col("post_profile.profile_name"), "profile_name"],
                    // [Sequelize.col("post_profile->profile_avatar.link"), "avatar"]
                ],
                include: [
                    {
                        model: Profile,
                        as: "post_profile",
                        attributes: [
                            // [Sequelize.col("profile_id"), "profile_id"],
                            // [Sequelize.col("profile_name"), "profile_name"],
                            "profile_name"
                        ],
                        // required: true,
                        include: [
                            {
                                model: ProfileAvatarImage,
                                as: "profile_avatar",
                                attributes: ["link"],
                                // required: true
                            },
                        ]
                    },
                    {
                        model: ProfilePostImage,
                        as: "post_image",
                        attributes: ["link"],
                    },
                ],
                order: [
                    ['createdAt', 'DESC']
                ],
                raw: false,
                ...paginate({ page })
            });


            const objectQueryData = await Helper.SQLobjectToObject(queryData.rows);
            for (const element of objectQueryData) {
                var totalLike = await this.postLikeRepository.allLikeOfPost(element["profile_id"], element.post_id);
                var isLiked = await this.postLikeRepository.isLikedPost(profile_id, element.post_id);
                // element.setDataValue("totalLike", totalLike);
                // element.setDataValue("isLiked", isLiked);

                element["totalLike"] = totalLike;
                element["isLiked"] = isLiked;
                element["profile_name"] = element["post_profile"]["profile_name"];
                if (element["post_profile"]["profile_avatar"]) {
                    element["avatar"] = element["post_profile"]["profile_avatar"]["link"]
                } else {
                    element["avatar"] = null;
                }
                delete element["post_profile"];
            }

            result.data = objectQueryData;
            page.totalElement = queryData.count;
            result.page = page;
            return result;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getPostByProfileId(profile_id: number, page: Page): Promise<PagingData<Post[]>> {
        try {
            var result = new PagingData<Post[]>();
            var queryData = await this.postRepository.findAndCountAll({
                attributes: [
                    "post_id", "written_text", "createdAt", "updatedAt", "totalLike", "profile_id",
                    [Sequelize.col("post_profile.profile_name"), "profile_name"],
                    // [Sequelize.col("post_profile->profile_avatar.link"), "avatar"]
                ],
                include: [
                    {
                        model: Profile,
                        as: "post_profile",
                        where: { profile_id: profile_id },
                        attributes: [
                            // [Sequelize.col("profile_id"), "profile_id"],
                            // [Sequelize.col("profile_name"), "profile_name"],
                            "profile_name"
                        ],
                        // required: true,
                        include: [
                            {
                                model: ProfileAvatarImage,
                                as: "profile_avatar",
                                attributes: ["link"],
                                // required: true
                            },
                        ]
                    },
                    {
                        model: ProfilePostImage,
                        as: "post_image",
                        attributes: ["link"],
                    },
                ],
                order: [
                    ['createdAt', 'DESC']
                ],
                raw: false,
                ...paginate({ page })
            });

            const objectQueryData = await Helper.SQLobjectToObject(queryData.rows);
            for (const element of objectQueryData) {
                var totalLike = await this.postLikeRepository.allLikeOfPost(element["profile_id"], element.post_id);
                var isLiked = await this.postLikeRepository.isLikedPost(profile_id, element.post_id);

                element["totalLike"] = totalLike;
                element["isLiked"] = isLiked;
                if (element["post_profile"]["profile_avatar"]) {
                    element["avatar"] = element["post_profile"]["profile_avatar"]["link"]
                } else {
                    element["avatar"] = null;
                }
                delete element["post_profile"];
            }

            result.data = objectQueryData;
            page.totalElement = queryData.count;
            result.page = page;
            return result;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getSinglePostDetailByPostId(post_id: number, profile_id?: number): Promise<Post> {
        try {
            const queryData = await this.postRepository.findOne({
                where: { post_id: post_id },
                attributes: [
                    "post_id", "written_text", "createdAt", "updatedAt", "totalLike", "profile_id",
                    [Sequelize.col("post_profile.profile_name"), "profile_name"]
                ],
                include: [
                    {
                        model: Profile,
                        as: "post_profile",
                        attributes: [
                            "profile_id", "profile_name"
                        ],
                        include: [
                            {
                                model: ProfileAvatarImage,
                                as: "profile_avatar",
                                attributes: ["link"],
                            },
                        ]
                    },
                    {
                        model: ProfilePostImage,
                        as: "post_image",
                        attributes: ["link"],
                    },
                ],
                order: [
                    ['createdAt', 'DESC']
                ],
                raw: false,
            });

            if (profile_id) {
                const objectQueryData = await Helper.SQLobjectToObject(queryData);
                var totalLike = await this.postLikeRepository.allLikeOfPost(objectQueryData["profile_id"], post_id);
                var isLiked = await this.postLikeRepository.isLikedPost(profile_id, post_id);

                objectQueryData["totalLike"] = totalLike;
                objectQueryData["isLiked"] = isLiked;
                if (objectQueryData["post_profile"]["profile_avatar"]) {
                    objectQueryData["avatar"] = objectQueryData["post_profile"]["profile_avatar"]["link"]
                } else {
                    objectQueryData["avatar"] = null;
                }
                delete objectQueryData["post_profile"];
                return objectQueryData;
            }

            return queryData;

        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async createNewPost(newPost: PostData, profile_id: number): Promise<Post> {
        try {
            const res = await this.postRepository.create(newPost);
            return await this.getSinglePostDetailByPostId(res.post_id, profile_id);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async updatePost(postData: PostData, profile_id: number): Promise<Post> {
        try {
            const res = await this.postRepository.update(postData, { where: { post_id: postData.post_id } });
            return await this.getSinglePostDetailByPostId(postData.post_id, profile_id);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async deletePost(profile_id: number, post_id: number): Promise<Boolean> {
        try {
            const queryImageData = await this.profilePostImageRepository.findAll({
                attributes: ["profile_post_image_id"],
                include: [
                    {
                        model: Post,
                        attributes: [],
                        where: {
                            post_id: post_id,
                        },
                    }
                ],
                raw: true
            })

            const imageDataArray: number[] = [];
            for (const element of queryImageData) {
                imageDataArray.push(element.profile_post_image_id);
            }

            await this.profilePostImageRepository.destroy({
                where: {
                    profile_post_image_id: {
                        [Op.in]: imageDataArray,
                    }
                }
            });

            const res = await this.postRepository.destroy({
                where: {
                    post_id: post_id
                }
            });
            return res ? true : false;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}