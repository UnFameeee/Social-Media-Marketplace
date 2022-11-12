import { Module } from '@nestjs/common';
import { postLikeProviders } from 'src/database/providers/all.providers';
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