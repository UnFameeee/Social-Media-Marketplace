import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PROVIDER } from "src/common/constants/provider.constant";
import { PostCommentEntity } from "src/common/models/entity/post-comment";
import { PostComment } from "../model/post-comment.model";

@Injectable()
export class PostCommentRepository {
    constructor(@Inject(PROVIDER.PostComment) private postCommentRepository: typeof PostComment){};
    
    // async commentToPost(profile_id: number, postCommentEntity: PostCommentEntity): Promise<Boolean>{
    //     try{
    //         var model = new PostCommentEntity();
    //         model.
    //     }catch(err){
    //         throw new InternalServerErrorException(err.message);
    //     }
    // }
}