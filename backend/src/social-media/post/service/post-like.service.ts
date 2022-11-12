import { Injectable } from '@nestjs/common';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { Profile } from 'src/database/model/profile.model';
import { ResponseData } from 'src/database/view-model/success-message.model';
import { PostLikeRepository } from '../repository/post-like.repository';

@Injectable()
export class PostLikeService {
    constructor(private readonly postLikeRepository: PostLikeRepository) {}

    async likeUnlikePost(profile: Profile, post_id: number): Promise<ResponseData<boolean>>{
        try{
            const response = new ResponseData<boolean>();
            var res = await this.postLikeRepository.likeUnlikePost(profile.profile_id, post_id);
            response.results = res ? true : false;
            return response;
        }catch(err){
            ExceptionResponse(err);
        }
    }

    async allLikeOfPost(profile: Profile, post_id: number): Promise<ResponseData<number>>{
        try{
            const response = new ResponseData<number>();
            var res = await this.postLikeRepository.allLikeOfPost(profile.profile_id, post_id);
            response.results = res;
            return response;
        }catch(err){
            ExceptionResponse(err);
        }
    }
}
