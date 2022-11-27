import { Injectable } from '@nestjs/common';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { Profile } from 'src/database/model/profile.model';
import { NotificationRepository } from '../repository/notification.repository';

@Injectable()
export class NotificationService {

  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) { }

  //HELPER
  async getProfileReceiverByPostId(post_id: number): Promise<number> {
    try {
      const data = await this.notificationRepository.getProfileReceiverByPostId(post_id);
      return data["profile_id"];
    } catch (err) {
      ExceptionResponse(err);
    }
  }

  async getProfileReceiverByCommentId(post_comment_id: number): Promise<number> {
    try {
      const data = await this.notificationRepository.getProfileReceiverByCommentId(post_comment_id);
      return data["profile_id"];
    } catch (err) {
      ExceptionResponse(err);
    }
  }

  async getProfileSenderByProfileId(profile_id: number): Promise<Profile> {
    try {
      const data = await this.notificationRepository.getProfileSenderByProfileId(profile_id);
      return data;
    } catch (err) {
      ExceptionResponse(err);
    }
  }

  //create
  // async createNotificationData
}
