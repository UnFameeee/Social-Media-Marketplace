import { Module } from '@nestjs/common';
import { postCommentProviders } from 'src/common/providers/all.providers';
import { PostCommentController } from '../controller/post-comment.controller';
import { PostCommentRepository } from '../repository/post-comment.repository';
import { PostCommentService } from '../service/post-comment.service';

@Module({
  imports: [],
  controllers: [PostCommentController],
  providers: [PostCommentService, PostCommentRepository, ...postCommentProviders],
  exports: [PostCommentRepository]
})
export class PostCommentModule {}
