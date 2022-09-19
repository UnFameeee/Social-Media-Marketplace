import { Inject, Injectable } from "@nestjs/common";
import { InternalServerErrorException } from "@nestjs/common/exceptions";
import { PROVIDER } from "src/common/constants/provider.constant";
import { Profile } from "../profile/model/profile.model";
import { PostData } from "./dto/post-data.dto";
import { Post } from "./model/post.model";

@Injectable()
export class PostRepository {
    constructor(@Inject(PROVIDER.Post) private postRepository: typeof Post) { }

    async getPostByProfileId(profile_id: number): Promise<Post[]> {
        try {
            return this.postRepository.findAll({
                include: [{
                    model: Profile,
                    attributes: [],
                    where: { profile_id: profile_id },
                }]
            });
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async createNewPost(newPost: PostData): Promise<Post> {
        try {
            const res = await this.postRepository.create(newPost);
            return this.postRepository.findOne({ where: { post_id: res.post_id } });
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
    
    async updatePost(postData: PostData): Promise<Boolean>{
        try{
            const res = await this.postRepository.update(postData, {where: {post_id: postData.post_id}});
            return res ? true : false;
        }catch(err){
            throw new InternalServerErrorException(err.message);
        }
    }

    async deletePost(profile_id: number, post_id: number): Promise<Boolean>{
        try{
            const res = await this.postRepository.destroy({
                where: {
                    post_id: post_id
                }
                //Include profile_id
            });
            return res ? true : false;
        }catch(err){
            throw new InternalServerErrorException(err.message);
        }
    }
}