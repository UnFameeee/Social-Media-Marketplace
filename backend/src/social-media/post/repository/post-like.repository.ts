import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PostLikeEntity } from "src/database/entity/post-like";
import { PostLike } from "src/database/model/post-like.model";
import { Post } from "src/database/model/post.model";
import { Profile } from "src/database/model/profile.model";
import { PROVIDER } from "src/database/providers/provider.constant";


@Injectable()
export class PostLikeRepository {
    constructor(@Inject(PROVIDER.PostLike) private postLikeRepository: typeof PostLike) { };

    async likeUnlikePost(profile_id: number, post_id: number): Promise<Boolean> {
        try {
            var model = new PostLikeEntity();
            model.post_id = post_id;
            model.profile_id = profile_id;
            var recentModified: PostLike;

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
                recentModified = await this.postLikeRepository.findOne({ where: { post_like_id: res.post_like_id } });
            }else{
                await this.postLikeRepository.destroy({
                    where: {
                        post_like_id: checkPostLike.post_like_id
                    }
                });
                recentModified = await this.postLikeRepository.findOne({ where: { post_like_id: checkPostLike.post_like_id } });
            }

            return recentModified ? true : false;
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
            return allPostLikeModel ? allPostLikeModel.length : 0;

        } catch (err) {
            throw new InternalServerErrorException(err.message);
        };
    }

    async isLikedPost(profile_id: number, post_id: number): Promise<boolean>{
        try{
            var checkPostLikeModel = await this.postLikeRepository.findOne({
                include: [
                    {
                        model: Post,
                        attributes: [],
                        where: {post_id: post_id}
                    },
                    {
                        model: Profile,
                        attributes: [],
                        where: {profile_id: profile_id}
                    },
                ],
            })
            return checkPostLikeModel ? true : false;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        };
    }
}