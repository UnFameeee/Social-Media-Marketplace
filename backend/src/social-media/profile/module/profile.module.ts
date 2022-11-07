import { Module } from '@nestjs/common';
import { friendshipProviders, profileProviders } from 'src/common/providers/all.providers';
import { ProfileController } from '../controller/profile.controller';
import { ProfileRepository } from '../repository/profile.repository';
import { ProfileService } from '../service/profile.service';
import { FriendshipModule } from './friendship.module';

@Module({
  imports: [FriendshipModule],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    ProfileRepository,
    ...profileProviders,
    ...friendshipProviders],
  exports: [ProfileRepository]
})
export class ProfileModule { }