import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { postProviders } from './post.providers';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
    imports: [],
    controllers: [PostController],
    providers: [PostService, PostRepository, ...postProviders],
    exports: [PostRepository]
})
export class PostModule {}
