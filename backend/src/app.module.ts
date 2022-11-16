import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProfileModule } from './social-media/profile/module/profile.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './social-media/post/module/post.module';
import { PostLikeModule } from './social-media/post/module/post-like.module';
import { ImageModule } from './social-media/image/module/image.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FriendshipModule } from './social-media/profile/module/friendship.module';
import { PostCommentModule } from './social-media/post/module/post-comment.module';
import { ProductModule } from './marketplace/product/module/product.module';
import { ProductImageModule } from './marketplace/image/module/product_image.module';


@Module({
  imports: [
    //social media
    ProfileModule,
    PostModule,
    PostCommentModule,
    PostLikeModule,
    DatabaseModule,
    AuthModule,
    ImageModule,
    FriendshipModule,

    //marketplace
    ProductModule,
    ProductImageModule,


    //GET the image
    ServeStaticModule.forRoot({
      serveRoot: '/uploads/images',
      rootPath: join(__dirname, '../uploads/images'),
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
