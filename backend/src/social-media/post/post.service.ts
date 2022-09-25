import { Injectable } from '@nestjs/common';
import { ResponseData } from 'src/common/models/success-message.model';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { Profile } from '../profile/model/profile.model';
import { PostData } from './dto/post-data.dto';
import { Post } from './model/post.model';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
    constructor(private readonly postRepository: PostRepository) {}

    //Need to improve, paging for example.
    async getAllPost(): Promise<Post[]> {
        try{
            // return await this.postRepository
            return null;
        }catch(err){
            ExceptionResponse(err);
        }
    }
    //paging
    async getPostByProfileId(profile: Profile): Promise<ResponseData> {
        try{
            const response = new ResponseData();
            response.data = await this.postRepository.getPostByProfileId(profile.profile_id);
            return response;
        }catch(err){
            ExceptionResponse(err);
        }
    }

    //User create a post.
    async createNewPost(profile: Profile, newPost: PostData): Promise<ResponseData>{
        try{
            const response = new ResponseData();
            newPost.profile_id = profile.profile_id;
            const data = await this.postRepository.createNewPost(newPost);
            if(data){
                response.message = "Create new post successfully"
            }
            return response;
        }catch(err){
            ExceptionResponse(err);
        }
    }

    async updatePost(profile: Profile, postData: PostData){
        try{
            const response = new ResponseData();
            const data = await this.postRepository.updatePost(postData);
            if(data){
                response.message = "Update post successfully"
            }
            return response;
        }catch(err){
            ExceptionResponse(err);
        }
    }

    async deletePost(profile: Profile, post_id: number){
        try{
            const response = new ResponseData();
            const res = await this.postRepository.deletePost(profile.profile_id, post_id);
            if(res){
                response.message = "Delete post successfully"
            }
            return response;
        }catch(err){
            ExceptionResponse(err);
        }
    }
}
