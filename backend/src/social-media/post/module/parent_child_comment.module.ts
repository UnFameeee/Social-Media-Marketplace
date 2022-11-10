import { Module } from '@nestjs/common';
import { ParentChildCommentController } from '../controller/parent_child_comment.controller';
import { ParentChildCommentService } from '../service/parent_child_comment.service';

@Module({
  controllers: [ParentChildCommentController],
  providers: [ParentChildCommentService],
  
})
export class ParentChildCommentModule {}
