import { Injectable } from '@nestjs/common';

import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { Post } from 'src/database/model/post.model';
import { Profile } from 'src/database/model/profile.model';
import { Page } from 'src/database/view-model/page-model';
import { PagingData } from 'src/database/view-model/paging.model';
import { ResponseData } from 'src/database/view-model/success-message.model';
import { NotificationService } from 'src/notification/service/notification.service';
import { PostData } from '../../../database/dtos/post-data.dto';
import { PostRepository } from '../repository/post.repository';

@Injectable()
export class PostService {
    constructor(
        private readonly postRepository: PostRepository,
        private readonly notificationService: NotificationService,
    ) { }

    async getAllPost(profile: Profile, page: Page): Promise<ResponseData<PagingData<Post[]>>> {
        try {
            var response = new ResponseData<PagingData<Post[]>>();
            response.results = await this.postRepository.getAllPost(profile.profile_id, page);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async getPostByProfileId(profile_id: number, data: Page): Promise<ResponseData<PagingData<Post[]>>> {
        try {
            var response = new ResponseData<PagingData<Post[]>>();
            response.results = await this.postRepository.getPostByProfileId(profile_id, data);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async getSinglePostDetailByPostId(profile_id: number, post_id: number): Promise<ResponseData<Post>> {
        try {
            var response = new ResponseData<Post>();
            response.results = await this.postRepository.getSinglePostDetailByPostId(post_id, profile_id);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    //User create a post.
    async createNewPost(profile: Profile, newPost: PostData): Promise<ResponseData<Post>> {
        try {
            const response = new ResponseData<Post>();
            newPost.profile_id = profile.profile_id;
            response.results = await this.postRepository.createNewPost(newPost, profile.profile_id);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async updatePost(profile: Profile, postData: PostData): Promise<ResponseData<Post>> {
        try {
            const response = new ResponseData<Post>();
            var tempPostDetail = await this.postRepository.getSinglePostDetailByPostId(postData.post_id);
            if (tempPostDetail) {
                if (tempPostDetail["profile_id"] == profile.profile_id) {
                    response.results = await this.postRepository.updatePost(postData, profile.profile_id);
                }
                else {
                    response.message = "You only can modify your post"
                }
            } else {
                response.message = "Post isn't exist"
            }

            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async deletePost(profile: Profile, post_id: number): Promise<ResponseData<string>> {
        try {
            const response = new ResponseData<string>();

            var tempPostDetail = await this.postRepository.getSinglePostDetailByPostId(post_id);

            if (tempPostDetail) {
                if (tempPostDetail["profile_id"] == profile.profile_id) {
                    await this.notificationService.removePostNotification(post_id);
                    const res = await this.postRepository.deletePost(profile.profile_id, post_id);
                    if (res) {
                        response.results = "Delete post successfully"
                    }
                }
                else {
                    response.message = "You only can modify your post"
                }
            } else {
                response.message = "Post isn't exist"
            }
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }
}