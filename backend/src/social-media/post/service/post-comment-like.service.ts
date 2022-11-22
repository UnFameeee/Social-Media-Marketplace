import { Injectable } from '@nestjs/common';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { Profile } from 'src/database/model/profile.model';
import { ResponseData } from 'src/database/view-model/success-message.model';
import { PostCommentLikeRepository } from '../repository/post-comment-like.repository';

@Injectable()
export class PostCommentLikeService {
    constructor(private readonly postCommentLikeRepository: PostCommentLikeRepository) {}

    async likeUnlikePostComment(profile: Profile, post_comment_id: number): Promise<ResponseData<boolean>>{
        try{
            const response = new ResponseData<boolean>();
            var res = await this.postCommentLikeRepository.likeUnlikePostComment(profile.profile_id, post_comment_id);
            response.results = res ? true : false;
            return response;
        }catch(err){
            ExceptionResponse(err);
        }
    }

    async allLikeOfPostComment(post_comment_id: number): Promise<ResponseData<number>>{
        try{
            const response = new ResponseData<number>();
            var res = await this.postCommentLikeRepository.allLikeOfPostComment(post_comment_id);
            response.results = res;
            return response;
        }catch(err){
            ExceptionResponse(err);
        }
    }
}
