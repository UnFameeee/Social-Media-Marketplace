import { Module } from '@nestjs/common';
import { postCommentProviders, postProviders } from 'src/database/providers/all.providers';
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
    ...postCommentProviders
  ],
  exports: [NotificationGateway, NotificationService],
})
export class NotificationModule {}
