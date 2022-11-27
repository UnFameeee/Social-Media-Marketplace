import { Module } from '@nestjs/common';
import { postCommentProviders, postProviders, profileProviders } from 'src/database/providers/all.providers';
import { NotificationGateway } from '../gateway/notification.gateway';
import { NotificationRepository } from '../repository/notification.repository';
import { NotificationService } from '../service/notification.service';

@Module({
  imports: [],
  providers: [
    NotificationGateway, 
    NotificationService,
    NotificationRepository,
    ...postProviders,
    ...postCommentProviders,
    ...profileProviders,
  ],
  exports: [NotificationGateway, NotificationService],
})
export class NotificationModule {}
