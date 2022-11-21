import { Module } from '@nestjs/common';
import { postCommentLikeProviders } from 'src/database/providers/all.providers';
import { PostCommentLikeController } from '../controller/post-comment-like.controller';
import { PostCommentLikeRepository } from '../repository/post-comment-like.repository';
import { PostCommentLikeService } from '../service/post-comment-like.service';

@Module({
    imports: [],
    controllers: [PostCommentLikeController],
    providers: [
        PostCommentLikeService,
        PostCommentLikeRepository,
        ...postCommentLikeProviders
    ],
    exports: [
        PostCommentLikeRepository,
        PostCommentLikeService
    ]
})
export class PostCommentLikeModule { }