import { Inject, Injectable } from '@nestjs/common';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { NotificationRepository } from '../repository/notification.repository';

@Injectable()
export class NotificationService {

  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) { }

  async getProfileReceiverByPostId(post_id: number): Promise<number> {
    try {
      const data = await this.notificationRepository.getProfileReceiverByPostId(post_id);
      return data["profile_id"];
    } catch (err) {
      ExceptionResponse(err);
    }
  }
}
