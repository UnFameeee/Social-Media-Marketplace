import { Module } from '@nestjs/common';
import { friendshipProviders } from 'src/database/providers/all.providers';
import { FriendshipController } from '../controller/friendship.controller';
import { FriendshipRepository } from '../repository/friendship.repository';
import { FriendshipService } from '../service/friendship.service';
import { ProfileModule } from './profile.module';

@Module({
  imports: [],
  controllers: [FriendshipController],
  providers: [FriendshipService, FriendshipRepository, ...friendshipProviders],
  exports: [FriendshipRepository],
})
export class FriendshipModule {}
