import { Injectable } from '@nestjs/common';
import { PostCommentDto } from 'src/database/dtos/post-comment.dto';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { PostCommentRepository } from '../repository/post-comment.repository';
import { Profile } from 'src/database/model/profile.model';
import { ResponseData } from 'src/database/view-model/success-message.model';
import { Page } from 'src/database/view-model/page-model';

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

    async deleteComment(profile_id: number,post_comment_id: number){
        try{
            const response = new ResponseData<any>();
            var res = await this.postCommentRepository.deleteComment(profile_id, post_comment_id);
            response.results = res;
            return response; 
        }catch(err){
            ExceptionResponse(err);
        }
    }
}
