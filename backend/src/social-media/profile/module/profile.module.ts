import { Module } from '@nestjs/common';
import { friendshipProviders, profileAvatarImageProviders, profilePostImageProviders, profileProviders, profileWallpaperImageProviders } from 'src/database/providers/all.providers';
import { ShoppingCartModule } from 'src/marketplace/shopping_cart/module/shopping_cart.module';
import { ProfileController } from '../controller/profile.controller';
import { ProfileRepository } from '../repository/profile.repository';
import { ProfileService } from '../service/profile.service';
import { DescriptionModule } from './description.module';
import { FriendshipModule } from './friendship.module';

@Module({
  imports: [
    FriendshipModule,
    DescriptionModule,
    ShoppingCartModule,
  ],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    ProfileRepository,
    ...profileProviders,
    ...friendshipProviders,
    ...profileAvatarImageProviders,
    ...profileWallpaperImageProviders,
    ...profilePostImageProviders,
  ],
  exports: [ProfileRepository]
})
export class ProfileModule { }