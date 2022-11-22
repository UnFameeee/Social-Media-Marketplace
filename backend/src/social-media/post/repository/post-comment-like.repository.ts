import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PostCommentLikeEntity } from "src/database/entity/post-comment-like";
import { PostCommentLike } from "src/database/model/post-comment-like.model";
import { PostComment } from "src/database/model/post-comment.model";
import { Profile } from "src/database/model/profile.model";
import { PROVIDER } from "src/database/providers/provider.constant";


@Injectable()
export class PostCommentLikeRepository {
    constructor(@Inject(PROVIDER.PostCommentLike) private postCommentLikeRepository: typeof PostCommentLike) { };

    async likeUnlikePostComment(profile_id: number, post_comment_id: number): Promise<Boolean> {
        try {
            var model = new PostCommentLikeEntity();
            model.post_comment_id = post_comment_id;
            model.profile_id = profile_id;
            var recentModified: PostCommentLike;

            var checkPostCommentLike = await this.postCommentLikeRepository.findOne({
                include: [
                    {
                        model: Profile,
                        attributes: [],
                        where: { profile_id: profile_id }
                    },
                    {
                        model: PostComment,
                        attributes: [],
                        where: { post_comment_id: post_comment_id }
                    }
                ],
            });

            if (!checkPostCommentLike) {
                var res = await this.postCommentLikeRepository.create(model);
                recentModified = await this.postCommentLikeRepository.findOne({
                    where: { post_comment_like_id: res.post_comment_like_id }
                });
            } else {
                await this.postCommentLikeRepository.destroy({
                    where: {
                        post_comment_like_id: checkPostCommentLike.post_comment_like_id
                    }
                });
                recentModified = await this.postCommentLikeRepository.findOne({
                    where: {
                        post_comment_like_id: checkPostCommentLike.post_comment_like_id
                    }
                });
            }

            return recentModified ? true : false;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async allLikeOfPostComment(post_comment_id: number): Promise<number> {
        try {
            var allPostLikeModel = await this.postCommentLikeRepository.findAll({
                include: [
                    {
                        model: PostComment,
                        attributes: [],
                        where: { post_comment_id: post_comment_id }
                    }
                ],
            });
            return allPostLikeModel ? allPostLikeModel.length : 0;

        } catch (err) {
            throw new InternalServerErrorException(err.message);
        };
    }

    async isLikedPostComment(profile_id: number, post_comment_id: number): Promise<boolean> {
        try {
            var checkPostLikeModel = await this.postCommentLikeRepository.findOne({
                include: [
                    {
                        model: PostComment,
                        attributes: [],
                        where: { post_comment_id: post_comment_id }
                    },
                    {
                        model: Profile,
                        attributes: [],
                        where: { profile_id: profile_id }
                    },
                ],
            })
            return checkPostLikeModel ? true : false;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        };
    }
}