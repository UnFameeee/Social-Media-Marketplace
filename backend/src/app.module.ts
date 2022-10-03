import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProfileModule } from './social-media/profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './social-media/post/module/post.module';
import { PostLikeModule } from './social-media/post/module/post-like.module';


@Module({
  imports: [ProfileModule, PostModule, PostLikeModule, DatabaseModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
