import { Injectable } from '@nestjs/common';
import { PostCommentEntity } from 'src/common/models/entity/post-comment';
import { ResponseData } from 'src/common/models/view-model/success-message.model';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { Profile } from 'src/social-media/profile/model/profile.model';
import { PostCommentRepository } from '../repository/post-comment.repository';

@Injectable()
export class PostCommentService {
    constructor(private readonly postCommentRepository: PostCommentRepository) {}   

    // async commentToPost(profile: Profile, postCommentEntity: PostCommentEntity): Promise<ResponseData<boolean>>{
    //     try{
    //         const response = new ResponseData<boolean>();
    //         var res = await this.postCommentRepository.commentToPost(profile.profile_id, postCommentEntity);
    //         response.results = res ? true : false;
    //         return response;
    //     }catch(err){
    //         ExceptionResponse(err);
    //     }
    // }

    // async updateCommentToPost(profile: Profile, ){
    //     try{
    //         const 
    //     }catch(err){
    //         ExceptionResponse(err);
    //     }
    // }

    //CRUD bình luận
    //Tổng số bình luận của bài post
    //Load ra paging bình luận của hệ thống.
    //Phản hồi 1 bình luận
    //Thích 1 bình luận
}
