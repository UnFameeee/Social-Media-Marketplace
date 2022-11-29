import { Module } from '@nestjs/common';
import { postProviders, profilePostImageProviders } from 'src/database/providers/all.providers';
import { NotificationModule } from 'src/notification/module/notification.module';
import { PostController } from '../controller/post.controller';
import { PostRepository } from '../repository/post.repository';
import { PostService } from '../service/post.service';
import { PostLikeModule } from './post-like.module';

@Module({
    imports: [PostLikeModule, NotificationModule],
    controllers: [PostController],
    providers: [
        PostService, 
        PostRepository, 
        ...postProviders,
        ...profilePostImageProviders,
    ],
    exports: [PostRepository]
})
export class PostModule {}