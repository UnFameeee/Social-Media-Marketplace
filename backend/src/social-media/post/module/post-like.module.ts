import { Module } from '@nestjs/common';
import { postLikeProviders } from 'src/common/providers/all.providers';
import { PostLikeController } from '../controller/post-like.controller';
import { PostLikeRepository } from '../repository/post-like.repository';
import { PostLikeService } from '../service/post-like.service';

@Module({
    imports: [],
    controllers: [PostLikeController],
    providers: [PostLikeService, PostLikeRepository, ...postLikeProviders],
    exports: [PostLikeRepository, PostLikeService]
})
export class PostLikeModule {}