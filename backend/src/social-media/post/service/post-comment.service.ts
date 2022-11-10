import { Injectable } from '@nestjs/common';
import { PostCommentDto } from 'src/common/models/dtos/post-comment.dto';
import { PostCommentEntity } from 'src/common/models/entity/post-comment';
import { Page } from 'src/common/models/view-model/page-model';
import { ResponseData } from 'src/common/models/view-model/success-message.model';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { Profile } from 'src/social-media/profile/model/profile.model';
import { PostCommentRepository } from '../repository/post-comment.repository';

@Injectable()
export class PostCommentService {
    constructor(private readonly postCommentRepository: PostCommentRepository) { }

    async createComment(profile: Profile, postCommentDto: PostCommentDto): Promise<ResponseData<any>> {
        try {
            const response = new ResponseData<boolean>();
            var res = await this.postCommentRepository.createComment(profile.profile_id, postCommentDto);
            response.results = res;
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async getAllCommentOfPost(post_id: number, page: Page): Promise<ResponseData<any>> {
        try {
            const response = new ResponseData<boolean>();
            var res = await this.postCommentRepository.getAllCommentOfPost(post_id, page);
            response.results = res;
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async updateComment(post_comment_id: number, comment_text: string){
        try{
            const response = new ResponseData<boolean>();
            var res = await this.postCommentRepository.updateComment(post_comment_id, comment_text);
            response.results = res;
            return response; 
        }catch(err){
            ExceptionResponse(err);
        }
    }

    async deleteComment(post_comment_id: number){
        try{
            const response = new ResponseData<boolean>();
            var res = await this.postCommentRepository.deleteComment(post_comment_id);
            response.results = res;
            return response; 
        }catch(err){
            ExceptionResponse(err);
        }
    }

    //CRUD bình luận
    //Tổng số bình luận của bài post
    //Load ra paging bình luận của hệ thống.

    //Phản hồi 1 bình luận
    //Thích 1 bình luận
}
