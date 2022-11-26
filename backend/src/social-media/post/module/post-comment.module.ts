import { Module } from '@nestjs/common';
import { parentChildCommentProviders, postCommentProviders, postProviders } from 'src/database/providers/all.providers';
import { NotificationModule } from 'src/notification/module/notification.module';
import { PostCommentController } from '../controller/post-comment.controller';
import { PostCommentRepository } from '../repository/post-comment.repository';
import { PostCommentService } from '../service/post-comment.service';
import { PostCommentLikeModule } from './post-comment-like.module';

@Module({
  imports: [PostCommentLikeModule, NotificationModule],
  controllers: [PostCommentController],
  providers: [
    PostCommentService,
    PostCommentRepository,
    ...postProviders,
    ...postCommentProviders,
    ...parentChildCommentProviders
  ],
  exports: [PostCommentRepository]
})
export class PostCommentModule { }
