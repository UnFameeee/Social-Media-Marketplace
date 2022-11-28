import { Injectable } from '@nestjs/common';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { Notification } from 'src/database/model/notification.model';
import { Profile } from 'src/database/model/profile.model';
import { ResponseData } from 'src/database/view-model/success-message.model';
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
  async createNotificationData(profile_sender: number, profile_receiver: number, profile_id?: number, post_id?: number, post_comment_id?: number): Promise<Notification> {
    try {
      const data = await this.notificationRepository.createNotificationData(profile_sender, profile_receiver, profile_id, post_id, post_comment_id);
      return data;
    } catch (err) {
      ExceptionResponse(err);
    }
  }

  async removeNotificationData(profile_sender: number, profile_receiver: number, profile_id?: number, post_id?: number, post_comment_id?: number): Promise<Notification> {
    try {
      const data = await this.notificationRepository.removeNotificationData(profile_sender, profile_receiver, profile_id, post_id, post_comment_id);
      return data;
    } catch (err) {
      ExceptionResponse(err);
    }
  }

  async getAllNotificationData(profile_id: number): Promise<ResponseData<Notification[]>> {
    try {
      const response = new ResponseData<Notification[]>();
      const data = await this.notificationRepository.getAllNotificationData(profile_id);
      response.results = data;
      return response;
    } catch (err) {
      ExceptionResponse(err);
    }
  }
}
