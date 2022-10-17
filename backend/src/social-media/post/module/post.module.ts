import { Module } from '@nestjs/common';
import { postProviders } from 'src/common/providers/all.providers';
import { PostController } from '../controller/post.controller';
import { PostRepository } from '../repository/post.repository';
import { PostService } from '../service/post.service';
import { PostLikeModule } from './post-like.module';

@Module({
    imports: [PostLikeModule],
    controllers: [PostController],
    providers: [PostService, PostRepository, ...postProviders],
    exports: [PostRepository]
})
export class PostModule {}