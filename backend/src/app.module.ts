import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProfileModule } from './social-media/profile/module/profile.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './social-media/post/module/post.module';
import { PostLikeModule } from './social-media/post/module/post-like.module';
import { ImageModule } from './social-media/image/image.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FriendshipModule } from './social-media/profile/module/friendship.module';
import { MessageModule } from './social-media/message/message.module';


@Module({
  imports: [ProfileModule, PostModule, PostLikeModule, DatabaseModule, AuthModule, ImageModule, FriendshipModule, MessageModule,
    ServeStaticModule.forRoot({
      serveRoot: '/uploads/images',
      rootPath: join(__dirname, '../uploads/images'),
    })],
  controllers: [],
  providers: [],
})
export class AppModule { }
