import { Injectable } from '@nestjs/common';
import { NOTIFICATION_DESCRIPTION, NOTIFICATION_TYPE } from 'src/common/constants/notification.constant';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { NotificationResponseDto } from 'src/database/dtos/notification-response.dto';
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

  async getPostIdByCommentId(post_comment_id: number): Promise<number> {
    try {
      const data = await this.notificationRepository.getPostIdByCommentId(post_comment_id);
      return data["post_id"];
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

  async getPostByPostCommentId(post_comment_id: number): Promise<number> {
    try {
      const data = await this.notificationRepository.getPostByPostCommentId(post_comment_id);
      return data["post_id"];
    } catch (err) {
      ExceptionResponse(err);
    }
  }

  //create
  async createNotification(profile_sender: number, profile_receiver: number, notification_type: NOTIFICATION_TYPE, notification_description: NOTIFICATION_DESCRIPTION, post_id?: number, post_comment_id?: number): Promise<NotificationResponseDto> {
    try {
      const data = await this.notificationRepository.createNotification(profile_sender, profile_receiver, notification_type, notification_description, post_id, post_comment_id);
      return data;
    } catch (err) {
      ExceptionResponse(err);
    }
  }

  async removeNotification(profile_sender: number, profile_receiver: number, notification_type: NOTIFICATION_TYPE, post_id?: number, post_comment_id?: number): Promise<Boolean> {
    try {
      const data = await this.notificationRepository.removeNotification(profile_sender, profile_receiver, notification_type, post_id, post_comment_id);
      return data;
    } catch (err) {
      ExceptionResponse(err);
    }
  }

  async removeFriendRequestNotification(profile_sender: number, profile_receiver: number, notification_type: NOTIFICATION_TYPE): Promise<Boolean> {
    try {
      const data = await this.notificationRepository.removeFriendRequestNotification(profile_sender, profile_receiver, notification_type);
      return data;
    } catch (err) {
      ExceptionResponse(err);
    }
  }

  async removePostCommentNotification(post_comment_id: number[]): Promise<Boolean> {
    try {
      const data = await this.notificationRepository.removePostCommentNotification(post_comment_id);
      return data;
    } catch (err) {
      ExceptionResponse(err);
    }
  }

  async removePostNotification(post_id: number): Promise<Boolean> {
    try {
      const data = await this.notificationRepository.removePostNotification(post_id);
      return data;
    } catch (err) {
      ExceptionResponse(err);
    }
  }

  async getAllNotification(profile_id: number): Promise<ResponseData<Notification[]>> {
    try {
      const response = new ResponseData<Notification[]>();
      const data = await this.notificationRepository.getAllNotification(profile_id);
      response.results = data;
      return response;
    } catch (err) {
      ExceptionResponse(err);
    }
  }

  async getAllUnreadNotification(profile_id: number): Promise<ResponseData<Notification[]>> {
    try {
      const response = new ResponseData<Notification[]>();
      const data = await this.notificationRepository.getAllUnreadNotification(profile_id);
      response.results = data;
      return response;
    } catch (err) {
      ExceptionResponse(err);
    }
  }

  async getAllFriendRequestNotification(profile_id: number): Promise<ResponseData<Notification[]>> {
    try {
      const response = new ResponseData<Notification[]>();
      const data = await this.notificationRepository.getAllFriendRequestNotification(profile_id);
      response.results = data;
      return response;
    } catch (err) {
      ExceptionResponse(err);
    }
  }

  async readNotification(profile_id: number, notification_id: number): Promise<ResponseData<Boolean>> {
    try {
      const response = new ResponseData<Boolean>();
      const data = await this.notificationRepository.readNotification(profile_id, notification_id);
      response.results = data;
      return response;
    } catch (err) {
      ExceptionResponse(err);
    }
  }
}
