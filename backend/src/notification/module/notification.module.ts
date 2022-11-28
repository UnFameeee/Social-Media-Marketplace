import { Module } from '@nestjs/common';
import { notificationProviders, postCommentProviders, postProviders, profileProviders } from 'src/database/providers/all.providers';
import { NotificationController } from '../controller/notification.controller';
import { NotificationGateway } from '../gateway/notification.gateway';
import { NotificationRepository } from '../repository/notification.repository';
import { NotificationService } from '../service/notification.service';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [
    NotificationGateway, 
    NotificationService,
    NotificationRepository,
    ...postProviders,
    ...postCommentProviders,
    ...profileProviders,
    ...notificationProviders,
  ],
  exports: [NotificationGateway, NotificationService],
})
export class NotificationModule {}
