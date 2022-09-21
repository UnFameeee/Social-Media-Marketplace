import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProfileModule } from './social-media/profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './social-media/post/post.module';


@Module({
  imports: [ProfileModule, PostModule, DatabaseModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
