import { Module } from '@nestjs/common';
import { friendshipProviders } from 'src/database/providers/all.providers';
import { NotificationModule } from 'src/notification/module/notification.module';
import { FriendshipController } from '../controller/friendship.controller';
import { FriendshipRepository } from '../repository/friendship.repository';
import { FriendshipService } from '../service/friendship.service';

@Module({
  imports: [NotificationModule],
  controllers: [FriendshipController],
  providers: [
    FriendshipService,
    FriendshipRepository,
    ...friendshipProviders
  ],
  exports: [FriendshipRepository],
})
export class FriendshipModule { }
