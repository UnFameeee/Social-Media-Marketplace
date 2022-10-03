import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PROVIDER } from "src/common/constants/provider.constant";
import { PostLikeEntity } from "src/common/models/entity/post-like";
import { Profile } from "src/social-media/profile/model/profile.model";
import { PostLike } from "../model/post-like.model";
import { Post } from "../model/post.model";

@Injectable()
export class PostLikeRepository {
    constructor(@Inject(PROVIDER.PostLike) private postLikeRepository: typeof PostLike) { };

    async likePost(profile_id: number, post_id: number): Promise<Boolean> {
        try {
            var model = new PostLikeEntity();
            model.post_id = post_id;
            model.profile_id = profile_id;
            var recentAdded: PostLike;

            var checkPostLike = await this.postLikeRepository.findOne({ 
                include: [
                    {
                        model: Profile,
                        attributes: [],
                        where: {profile_id: profile_id}
                    },
                    {
                        model: Post,
                        attributes: [],
                        where: {post_id: post_id}
                    }
                ], 
            });
            if(!checkPostLike){
                var res = await this.postLikeRepository.create(model);
                recentAdded = await this.postLikeRepository.findOne({ where: { post_like_id: res.post_like_id } });
            }

            return recentAdded ? true : false;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async unlikePost(profile_id: number, post_id: number): Promise<Boolean> {
        try {
            var model = new PostLikeEntity();
            model.post_id = post_id;
            model.profile_id = profile_id;
            var postLikeModel = await this.postLikeRepository.findOne({ 
                include: [
                    {
                        model: Profile,
                        attributes: [],
                        where: {profile_id: profile_id}
                    },
                    {
                        model: Post,
                        attributes: [],
                        where: {post_id: post_id}
                    }
                ],
            });

            var res: number;
            if(postLikeModel){
                res = await this.postLikeRepository.destroy({
                    where: {
                        post_like_id: postLikeModel.post_like_id
                    }
                });
            }

            return res ? true : false;

        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async allLikeOfPost(profile_id: number, post_id: number): Promise<number>{
        try {
            var model = new PostLikeEntity();
            model.post_id = post_id;
            model.profile_id = profile_id;

            var allPostLikeModel = await this.postLikeRepository.findAll({ 
                include: [
                    {
                        model: Post,
                        attributes: [],
                        where: {post_id: post_id}
                    }
                ],
            });

            console.log(allPostLikeModel.length);
            return allPostLikeModel ? allPostLikeModel.length : 0;

        } catch (err) {
            throw new InternalServerErrorException(err.message);
        };
    }
}