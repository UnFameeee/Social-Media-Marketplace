import { Injectable } from '@nestjs/common';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
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

    // async getPostByProfileId

}
