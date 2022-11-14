import { Controller, Param, UseGuards } from '@nestjs/common';
import { Body, Delete, Get, Post, Put, Request, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostData } from 'src/database/dtos/post-data.dto';
import { Post as Posts } from 'src/database/model/post.model';
import { Profile } from 'src/database/model/profile.model';
import { Page } from 'src/database/view-model/page-model';
import { PostService } from '../service/post.service';



@UseGuards(JwtAuthGuard)
@ApiTags('Post')
@ApiBearerAuth()
@Controller('/api/post')
export class PostController {
    constructor(private readonly postService: PostService) { };

    @ApiBody({
        type: Posts,
        description: `
        Get all post with paging
        path: /api/post/all`,
        examples: {
            ex1: {
                summary: "Empty Data",
                description: `{ 'page': 0, 'pageSize': 10}`,
                value: {}
            },
            ex2: {
                summary: "Sample Data",
                description: "Sample input for this API",
                value: { page: 0, pageSize: 10 }
            }
        }
    })
    @Post('/all')
    async getAllPost(@Request() request: any, @Body() page: Page){
        const profile = <Profile>request.user;
        return await this.postService.getAllPost(profile, page);
    }

    // @ApiBody({
    //     type: Posts,
    //     description: `
    //     Get all post by Profile_Id with paging
    //     path: /api/post/profile`,
    //     examples: {
    //         ex1: {
    //             summary: "Empty Data",
    //             description: `{ page: 0, pageSize: 10 }`,
    //             value: {}
    //         },
    //         ex2: {
    //             summary: "Sample Data",
    //             description: "Sample input for this API",
    //             value: { page: 0, pageSize: 10 }
    //         }
    //     }
    // })
    // @Post('/getOwnPost')
    // async getOwnPost(@Request() request: any, @Body() page: Page) {
    //     const profile = <Profile>request.user;
    //     return await this.postService.getPostByProfileId(profile.profile_id, page);
    // }

    @Post('/getPost/:profile_id')
    async getPostByProfileId(@Param("profile_id") profile_id: number, @Body() page: Page) {
        return await this.postService.getPostByProfileId(profile_id, page);
    }

    @Get('/:post_id')
    async getSinglePostDetailByPostId(@Request() request: any, @Param('post_id') post_id: number) {
        const profile = <Profile>request.user;
        return await this.postService.getSinglePostDetailByPostId(profile.profile_id, post_id);
    }


    @ApiBody({
        type: Posts,
        description: `
        Create new post
        path: /api/post/newPost`,
        examples: {
            ex1: {
                summary: "Empty Data",
                description: `{ "written_text": "TEST CREATE POST", "media_type": "TEST CREATE POST", "media_location": "TEST CREATE POST"}`,
                value: {}
            },
            ex2: {
                summary: "Sample Data",
                description: "Sample input for this API",
                value: { written_text: "TEST CREATE POST", media_type: "TEST CREATE POST", media_location: "TEST CREATE POST" }
            }
        }
    })
    @Post('/newPost')
    async createNewPost(@Request() request: any, @Body() newPost: PostData) {
        const profile = <Profile>request.user;
        return await this.postService.createNewPost(profile, newPost);
    }

    @ApiBody({
        type: Posts,
        description: `
        Login API. This will need {email, password} to use. 
        The reponse will be {access_token, refresh_token}
        path: /api/post/updatePost`,
        examples: {
            ex1: {
                summary: "Empty Data",
                description: `{ "written_text": "TEST UPDATE POST", "media_type": "TEST UPDATE POST", "media_location": "TEST UPDATE POST"}`,
                value: {}
            },
            ex2: {
                summary: "Sample Data",
                description: "Sample input for this API",
                value: { written_text: "TEST UPDATE POST", media_type: "TEST UPDATE POST", media_location: "TEST UPDATE POST"  }
            }
        }
    })
    @Put('/updatePost')
    async updatePost(@Request() request: any, @Body() updatePostData: PostData) {
        const profile = <Profile>request.user;
        return await this.postService.updatePost(profile, updatePostData);
    }

    @ApiOperation({description: 'Delete post'})
    @Delete('/delete/:post_id')
    async deletePost(@Request() request: any, @Param('post_id') post_id: number) {
        const profile = <Profile>request.user;
        return this.postService.deletePost(profile, post_id);
    }
}