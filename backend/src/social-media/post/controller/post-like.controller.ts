import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Profile } from 'src/database/model/profile.model';
import { PostLikeService } from '../service/post-like.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Post')
@Controller('/api/post')
export class PostLikeController {
    constructor(
        private readonly postLikeService: PostLikeService,
    ) { };

    //Like a post
    @Post("/like/:post_id")
    async likePost(@Request() request: any, @Param("post_id") postId: number) {
        const profile = <Profile>request.user;
        return await this.postLikeService.likeUnlikePost(profile, postId);
    }

    //See all like of post
    @Post("/allLikeOfPost/:post_id")
    async allLikeOfPost(@Request() request: any, @Param("post_id") postId: number) {
        const profile = <Profile>request.user;
        return await this.postLikeService.allLikeOfPost(profile, postId);
    }
}
