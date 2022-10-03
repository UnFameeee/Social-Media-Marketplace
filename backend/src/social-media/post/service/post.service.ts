import { Injectable } from '@nestjs/common';
import { ResponseData } from 'src/common/models/view-model/success-message.model';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { Profile } from '../../profile/model/profile.model';
import { PostData } from '../../../common/models/dtos/post-data.dto';
import { Post } from '../model/post.model';
import { PostRepository } from '../repository/post.repository';
import { PagingData } from 'src/common/models/view-model/paging.model';
import { Page } from 'src/common/models/view-model/page-model';

@Injectable()
export class PostService {
    constructor(private readonly postRepository: PostRepository) {}

    //Need to improve, paging for example.
    async getAllPost(page: Page): Promise<ResponseData<PagingData<Post[]>>> {
        try{
            var response = new ResponseData<PagingData<Post[]>>();
            response.results = await this.postRepository.getAllPost(page);
            return response;
        }catch(err){
            ExceptionResponse(err);
        }
    }
    //paging
    async getPostByProfileId(profile: Profile, data: Page): Promise<ResponseData<PagingData<Post[]>>> {
        try{
            var response = new ResponseData<PagingData<Post[]>>();
            response.results = await this.postRepository.getPostByProfileId(profile.profile_id, data);
            return response;
        }catch(err){
            ExceptionResponse(err);
        }
    }

    //User create a post.
    async createNewPost(profile: Profile, newPost: PostData): Promise<ResponseData<string>>{
        try{
            const response = new ResponseData<string>();
            newPost.profile_id = profile.profile_id;
            const data = await this.postRepository.createNewPost(newPost);
            if(data){
                response.results = "Create new post successfully"
            }
            return response;
        }catch(err){
            ExceptionResponse(err);
        }
    }

    async updatePost(profile: Profile, postData: PostData): Promise<ResponseData<string>>{
        try{
            const response = new ResponseData<string>();
            const data = await this.postRepository.updatePost(postData);
            if(data){
                response.results = "Update post successfully"
            }
            return response;
        }catch(err){
            ExceptionResponse(err);
        }
    }

    async deletePost(profile: Profile, post_id: number): Promise<ResponseData<string>>{
        try{
            const response = new ResponseData<string>();
            const res = await this.postRepository.deletePost(profile.profile_id, post_id);
            if(res){
                response.results = "Delete post successfully"
            }
            return response;
        }catch(err){
            ExceptionResponse(err);
        }
    }
}