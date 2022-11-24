import { Module } from '@nestjs/common';
import { NotificationGateway } from '../gateway/notification.gateway';
import { NotificationService } from '../service/notification.service';

@Module({
  providers: [NotificationGateway, NotificationService]
})
export class NotificationModule {}
