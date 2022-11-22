import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostCommentDto } from 'src/database/dtos/post-comment.dto';
import { Profile } from 'src/database/model/profile.model';
import { Page } from 'src/database/view-model/page-model';

import { PostCommentService } from '../service/post-comment.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Post')
@ApiBearerAuth()
@Controller('/api/post/comment')
export class PostCommentController {
    constructor(private readonly postCommentService: PostCommentService) { };

    //Comment to a post
    @Post("/create")
    async createComment(@Request() request: any, @Body() postCommentDto: PostCommentDto) {
        const profile = <Profile>request.user;
        return await this.postCommentService.createComment(profile, postCommentDto);
    }

    //See all comment of post
    @Post("/:post_id")
    async getAllCommentOfPost(@Request() request: any, @Param("post_id") post_id: number, @Body() page: Page) {
        const profile = <Profile>request.user;
        return await this.postCommentService.getAllCommentOfPost(profile.profile_id, post_id, page);
    }

    //Update comment of a posts
    @Put("/update/:post_comment_id")
    async updateComment(@Param("post_comment_id") post_comment_id: number, @Body() body: any) {
        return await this.postCommentService.updateComment(post_comment_id, body.comment_text);
    }

    //Delete comment of a post
    @Delete("/delete/:post_comment_id")
    async deleteComment(@Request() request: any, @Param("post_comment_id") post_comment_id: number) {
        const profile = <Profile>request.user;
        return await this.postCommentService.deleteComment(profile.profile_id, post_comment_id);
    }
}
