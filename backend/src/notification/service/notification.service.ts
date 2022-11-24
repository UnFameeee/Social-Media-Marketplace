import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  create(notificationDto: any) {
    return 'This action adds a new message';
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }
}
