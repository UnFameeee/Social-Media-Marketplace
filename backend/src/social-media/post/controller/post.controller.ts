import { Controller, Param, UseGuards } from '@nestjs/common';
import { Body, Delete, Post, Put, Request } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Page } from 'src/common/models/view-model/page-model';
import { PostData } from 'src/common/models/dtos/post-data.dto';
import { PostService } from '../service/post.service';
import { Profile } from 'src/social-media/profile/model/profile.model';

@UseGuards(JwtAuthGuard)
@ApiTags('Post')
@Controller('/api/post')
export class PostController {
    constructor(private readonly postService: PostService) { };

    @Post('/all')
    async getAllPost(@Body() page: Page){
        return await this.postService.getAllPost(page);
    }

    @Post('/profile')
    async getPostByProfileId(@Request() request: any, @Body() page: Page) {
        const profile = <Profile>request.user;
        return await this.postService.getPostByProfileId(profile, page);
    }

    @Post('/newPost')
    async createNewPost(@Request() request: any, @Body() newPost: PostData) {
        const profile = <Profile>request.user;
        return await this.postService.createNewPost(profile, newPost);
    }

    @Put('/updatePost')
    async updatePost(@Request() request: any, @Body() updatePostData: PostData) {
        const profile = <Profile>request.user;
        return await this.postService.updatePost(profile, updatePostData);
    }

    @Delete('/delete/:post_id')
    async deletePost(@Request() request: any, @Param('post_id') post_id: number) {
        const profile = <Profile>request.user;
        return this.postService.deletePost(profile, post_id);
    }
}