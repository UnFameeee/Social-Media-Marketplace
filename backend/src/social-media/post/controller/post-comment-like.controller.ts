import { Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Profile } from 'src/database/model/profile.model';
import { PostCommentLikeService } from '../service/post-comment-like.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Post')
@Controller('/api/post/comment')
export class PostCommentLikeController {
    constructor(private readonly postCommentLikeService: PostCommentLikeService){};
    
    //Like a post
    @Post("/like/:post_comment_id")
    async likeComment(@Request() request: any, @Param("post_comment_id") post_comment_id: number){
        const profile = <Profile>request.user;
        return await this.postCommentLikeService.likeUnlikePostComment(profile, post_comment_id);
    }
    
    //See all like of post
    @Get("/allLikeOfPostComment/:post_comment_id")
    async allLikeOfComment(@Request() request: any, @Param("post_comment_id") post_comment_id: number){
        // const profile = <Profile>request.user;
        return await this.postCommentLikeService.allLikeOfPostComment(post_comment_id);
    }
}
