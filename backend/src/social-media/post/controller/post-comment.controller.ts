import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostCommentService } from '../service/post-comment.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Post')
@Controller('/api/post')
export class PostCommentController {
    constructor(private readonly postCommentService: PostCommentService){};

    //Comment to a post
    

    //Update comment of a post

    //Delete comment of a post

    //See all comment of post
}
