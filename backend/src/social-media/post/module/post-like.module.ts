import { Module } from '@nestjs/common';
import { postLikeProviders } from 'src/database/providers/all.providers';
import { NotificationModule } from 'src/notification/module/notification.module';
import { PostLikeController } from '../controller/post-like.controller';
import { PostLikeRepository } from '../repository/post-like.repository';
import { PostLikeService } from '../service/post-like.service';

@Module({
    imports: [NotificationModule],
    controllers: [PostLikeController],
    providers: [PostLikeService, PostLikeRepository, ...postLikeProviders],
    exports: [PostLikeRepository, PostLikeService]
})
export class PostLikeModule {}