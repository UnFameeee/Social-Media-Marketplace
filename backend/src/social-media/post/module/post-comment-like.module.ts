import { Module } from '@nestjs/common';
import { postCommentLikeProviders } from 'src/database/providers/all.providers';
import { NotificationModule } from 'src/notification/module/notification.module';
import { PostCommentLikeController } from '../controller/post-comment-like.controller';
import { PostCommentLikeRepository } from '../repository/post-comment-like.repository';
import { PostCommentLikeService } from '../service/post-comment-like.service';

@Module({
    imports: [NotificationModule],
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