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
    @Get("/:post_id")
    async getAllCommentOfPost(@Param("post_id") post_id: number, @Body() page: Page) {
        return await this.postCommentService.getAllCommentOfPost(post_id, page);
    }

    //Update comment of a post
    @Put("/update/:post_comment_id")
    async updateComment(@Param("post_comment_id") post_comment_id: number, @Body() body: any) {
        return await this.postCommentService.updateComment(post_comment_id, body.comment_text);
    }
    
    //Delete comment of a post
    @Delete("/delete/:post_comment_id")
    async deleteComment(@Param("post_comment_id") post_comment_id: number) {
        return await this.postCommentService.deleteComment(post_comment_id);
    }
}
