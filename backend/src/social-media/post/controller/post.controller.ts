import { Controller, Param, UseGuards } from '@nestjs/common';
import { Body, Delete, Post, Put, Request } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Page } from 'src/common/models/view-model/page-model';
import { PostData } from 'src/common/models/dtos/post-data.dto';
import { PostService } from '../service/post.service';
import { Profile } from 'src/social-media/profile/model/profile.model';
import { Post as Posts } from '../model/post.model';

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
    async getAllPost(@Body() page: Page){
        return await this.postService.getAllPost(page);
    }

    @ApiBody({
        type: Posts,
        description: `
        Get all post by Profile_Id with paging
        path: /api/post/profile`,
        examples: {
            ex1: {
                summary: "Empty Data",
                description: `{ page: 0, pageSize: 10 }`,
                value: {}
            },
            ex2: {
                summary: "Sample Data",
                description: "Sample input for this API",
                value: { page: 0, pageSize: 10 }
            }
        }
    })
    @Post('/profile')
    async getPostByProfileId(@Request() request: any, @Body() page: Page) {
        const profile = <Profile>request.user;
        return await this.postService.getPostByProfileId(profile, page);
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