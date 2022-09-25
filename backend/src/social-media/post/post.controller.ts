import { Controller, Param, UseGuards } from '@nestjs/common';
import { Body, Delete, Get, Post, Put, Request, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { storage } from 'src/common/utils/storage.utils';
import { Profile } from '../profile/model/profile.model';
import { PostData } from '../../common/models/dtos/post-data.dto';
import { PostService } from './post.service';
import { Page } from 'src/common/models/view-model/page-model';

@UseGuards(JwtAuthGuard)
@ApiTags('Post')
@Controller('/api/post')
export class PostController {
    constructor(private readonly postService: PostService) { };

    @Get('/all')
    async getAllPost(@Body() page: Page){
        return await this.postService.getAllPost(page);
    }

    @Get('/profile')
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

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', storage))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file.path);
        return file;
    }
}
