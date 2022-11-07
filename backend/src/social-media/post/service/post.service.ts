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

    async getAllPost(page: Page): Promise<ResponseData<PagingData<Post[]>>> {
        try{
            var response = new ResponseData<PagingData<Post[]>>();
            response.results = await this.postRepository.getAllPost(page);
            return response;
        }catch(err){
            ExceptionResponse(err);
        }
    }

    async getPostByProfileId(profile_id: number, data: Page): Promise<ResponseData<PagingData<Post[]>>> {
        try{
            var response = new ResponseData<PagingData<Post[]>>();
            response.results = await this.postRepository.getPostByProfileId(profile_id, data);
            return response;
        }catch(err){
            ExceptionResponse(err);
        }
    }

    async getSinglePostDetailByPostId(post_id: number): Promise<ResponseData<Post>>{
        try{
            var response = new ResponseData<Post>();
            response.results = await this.postRepository.getSinglePostDetailByPostId(post_id);
            return response;
        }catch (err) {
            ExceptionResponse(err);
        }
    }

    //User create a post.
    async createNewPost(profile: Profile, newPost: PostData): Promise<ResponseData<Post>>{
        try{
            const response = new ResponseData<Post>();
            newPost.profile_id = profile.profile_id;
            response.results = await this.postRepository.createNewPost(newPost);
            return response;
        }catch(err){
            ExceptionResponse(err);
        }
    }

    async updatePost(profile: Profile, postData: PostData): Promise<ResponseData<Post>>{
        try{
            const response = new ResponseData<Post>();
            var tempPostDetail= await this.postRepository.getSinglePostDetailByPostId(postData.post_id);
            if(tempPostDetail){
                if(tempPostDetail["profile_id"] == profile.profile_id){
                    response.results = await this.postRepository.updatePost(postData);
                }
                else{
                    response.message = "You only can modify your post"
                }
            }else{
                response.message = "Post isn't exist"
            }
            
            return response;
        }catch(err){
            ExceptionResponse(err);
        }
    }

    async deletePost(profile: Profile, post_id: number): Promise<ResponseData<string>>{
        try{
            const response = new ResponseData<string>();

            var tempPostDetail= await this.postRepository.getSinglePostDetailByPostId(post_id);

            if(tempPostDetail){
                if(tempPostDetail["profile_id"] == profile.profile_id){
                    const res = await this.postRepository.deletePost(profile.profile_id, post_id);
                    if(res){
                        response.results = "Delete post successfully"
                    }   
                }
                else{
                    response.message = "You only can modify your post"
                }
            }else{
                response.message = "Post isn't exist"
            }
            return response;
        }catch(err){
            ExceptionResponse(err);
        }
    }
}