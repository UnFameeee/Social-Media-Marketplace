import { Inject, Injectable } from "@nestjs/common";
import { InternalServerErrorException } from "@nestjs/common/exceptions";
import { PROVIDER } from "src/common/providers/provider.constant";
import { Profile } from "../../profile/model/profile.model";
import { PostData } from "../../../common/models/dtos/post-data.dto";
import { Post } from "../model/post.model";
import { PagingData } from "src/common/models/view-model/paging.model";
import { Page } from "src/common/models/view-model/page-model";
import { paginate } from "src/common/utils/paginate.utils";
import { Sequelize } from "sequelize-typescript";
import { PostLikeRepository } from "./post-like.repository";
import { ProfilePostImage } from "src/social-media/image/model/profile_post_image.model";
import { ProfileAvatarImage } from "src/social-media/image/model/profile_avatar_image.model";

@Injectable()
export class PostRepository {
    constructor(@Inject(PROVIDER.Post) private postRepository: typeof Post,
        @Inject(PostLikeRepository) private postLikeRepository: PostLikeRepository
    ) { }

    async getAllPost(page: Page): Promise<PagingData<Post[]>> {
        try {
            var result = new PagingData<Post[]>();
            var queryData = await this.postRepository.findAndCountAll({
                attributes: [
                    "post_id", "written_text", "createdAt", "updatedAt", "totalLike", "profile_id",
                    [Sequelize.col("post_profile.profile_name"), "profile_name"],
                    [Sequelize.col("post_profile.profile_avatar.link"), "avatar"]
                ],
                include: [
                    {
                        model: Profile,
                        as: "post_profile",
                        attributes: [],
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
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ],
                raw: false,
                subQuery: false,
                ...paginate({ page })
            });

            for (const element of queryData.rows) {
                var totalLike = await this.postLikeRepository.allLikeOfPost(element["profile_id"], element.post_id);
                var isLiked = await this.postLikeRepository.isLikedPost(element["profile_id"], element.post_id);
                element.setDataValue("totalLike", totalLike);
                element.setDataValue("isLiked", isLiked);
            }

            result.data = queryData.rows;
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
                    [Sequelize.col("post_profile.profile_avatar.link"), "avatar"]
                ],
                include: [
                    {
                        model: Profile,
                        as: "post_profile",
                        attributes: [],
                        where: { profile_id: profile_id },
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
                        attributes: ["link"]
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ],
                raw: false,
                subQuery: false,
                ...paginate({ page })
            });

            for (const element of queryData.rows) {
                var totalLike = await this.postLikeRepository.allLikeOfPost(element["profile_id"], element.post_id);
                var isLiked = await this.postLikeRepository.isLikedPost(element["profile_id"], element.post_id);
                element.setDataValue("totalLike", totalLike);
                element.setDataValue("isLiked", isLiked);
            }

            result.data = queryData.rows;
            page.totalElement = queryData.count;
            result.page = page;
            return result;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getSinglePostDetailByPostId(post_id: number): Promise<Post> {
        try {
            const dataQuery = await this.postRepository.findOne({
                where: { post_id: post_id },
                attributes: [
                    "post_id", "written_text", "createdAt", "updatedAt", "totalLike", "profile_id",
                    [Sequelize.col("post_profile.profile_name"), "profile_name"],
                    [Sequelize.col("post_profile.profile_avatar.link"), "avatar"]
                ],
                include: [
                    {
                        model: Profile,
                        as: "post_profile",
                        attributes: [],
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
                        attributes: ["link"]
                    }
                ],
            });

            var totalLike = await this.postLikeRepository.allLikeOfPost(dataQuery["profile_id"], post_id);
            var isLiked = await this.postLikeRepository.isLikedPost(dataQuery["profile_id"], post_id);
            dataQuery.setDataValue("totalLike", totalLike);
            dataQuery.setDataValue("isLiked", isLiked);
            return dataQuery;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async createNewPost(newPost: PostData): Promise<Post> {
        try {
            const res = await this.postRepository.create(newPost);
            return await this.postRepository.findOne({ where: { post_id: res.post_id } });
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async updatePost(postData: PostData): Promise<Post> {
        try {
            const res = await this.postRepository.update(postData, { where: { post_id: postData.post_id } });
            return await this.postRepository.findOne({
                where: { post_id: postData.post_id }
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async deletePost(profile_id: number, post_id: number): Promise<Boolean> {
        try {
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