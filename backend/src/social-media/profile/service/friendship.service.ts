import { Injectable } from '@nestjs/common';
import { FriendshipRepository } from './../repository/friendship.repository';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { Profile } from 'src/database/model/profile.model';
import { Page } from 'src/database/view-model/page-model';
import { ResponseData } from 'src/database/view-model/success-message.model';
import { Friendship } from 'src/database/model/friendship.model';
import { PagingData } from 'src/database/view-model/paging.model';
import { NotificationGateway } from 'src/notification/gateway/notification.gateway';
import { NotificationService } from 'src/notification/service/notification.service';
import { NOTIFICATION_DESCRIPTION, NOTIFICATION_TYPE } from 'src/common/constants/notification.constant';
import { SOCKET_EVENT } from 'src/common/constants/socket.constant';
@Injectable()
export class FriendshipService {
    constructor(
        private readonly friendshipRepository: FriendshipRepository,
        private readonly notificationGateway: NotificationGateway,
        private readonly notificationService: NotificationService,
    ) { }

    async getAllFriendRequest(profile: Profile, page: Page): Promise<ResponseData<PagingData<Friendship[]>>> {
        try {
            var response = new ResponseData<PagingData<Friendship[]>>();
            response.results = await this.friendshipRepository.getAllFriendRequest(profile.profile_id, page);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async getAllFriend(profile_id: number, page: Page): Promise<ResponseData<PagingData<Friendship[]>>> {
        try {
            var response = new ResponseData<PagingData<Friendship[]>>();
            response.results = await this.friendshipRepository.getAllFriend(profile_id, page);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async sendFriendRequest(profile: Profile, profile_target_id: number): Promise<ResponseData<Boolean>> {
        try {
            var response = new ResponseData<Boolean>();
            response.results = await this.friendshipRepository.sendFriendRequest(profile.profile_id, profile_target_id);

            if (response.results) {
                const profile_receiver = profile_target_id;
                if (profile_receiver && profile_receiver != profile.profile_id) {
                    const NotificationResponseDto = await this.notificationService.createNotification(profile.profile_id, profile_receiver, NOTIFICATION_TYPE.FRIEND_REQUEST, NOTIFICATION_DESCRIPTION.SEND_FRIEND_REQUEST, null, null);

                    this.notificationGateway.server.to(`${profile_receiver}`).emit(SOCKET_EVENT.RECEIVE_NOTIFICATION, NotificationResponseDto);
                }
            } else {
                const profile_receiver = profile_target_id;
                if (profile_receiver && profile_receiver != profile.profile_id) {
                    await this.notificationService.removeFriendRequestNotification(profile.profile_id, profile_receiver, NOTIFICATION_TYPE.FRIEND_REQUEST);
                    this.notificationGateway.server.to(`${profile_receiver}`).emit(SOCKET_EVENT.RERENDER_NOTIFICATION);
                }
            }

            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async unfriend(profile: Profile, profile_target_id: number): Promise<ResponseData<boolean>> {
        try {
            var response = new ResponseData<boolean>();
            response.results = await this.friendshipRepository.unfriend(profile.profile_id, profile_target_id);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async isSentFriendRequest(profile: Profile, profile_target_id: number): Promise<ResponseData<string>> {
        try {
            var response = new ResponseData<string>();
            response.results = await this.friendshipRepository.isSentFriendRequest(profile.profile_id, profile_target_id);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async acceptFriendRequest(profile: Profile, profile_request_id: number): Promise<ResponseData<boolean>> {
        try {
            var response = new ResponseData<boolean>();
            response.results = await this.friendshipRepository.acceptFriendRequest(profile.profile_id, profile_request_id);

            if (response.results) {
                const profile_receiver = profile.profile_id;
                await this.notificationService.removeFriendRequestNotification(profile_request_id, profile_receiver, NOTIFICATION_TYPE.FRIEND_REQUEST);
                this.notificationGateway.server.to(`${profile_receiver}`).emit(SOCKET_EVENT.RERENDER_NOTIFICATION);
            }

            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async denyFriendRequest(profile: Profile, profile_request_id: number): Promise<ResponseData<boolean>> {
        try {
            var response = new ResponseData<boolean>();
            response.results = await this.friendshipRepository.denyFriendRequest(profile.profile_id, profile_request_id);

            if (!response.results) {
                const profile_receiver = profile.profile_id;
                console.log(profile_receiver);
                await this.notificationService.removeFriendRequestNotification(profile_request_id, profile_receiver, NOTIFICATION_TYPE.FRIEND_REQUEST);
                this.notificationGateway.server.to(`${profile_receiver}`).emit(SOCKET_EVENT.RERENDER_NOTIFICATION);
            }

            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async getMutualFriend(profile: Profile, profile_target_id: number): Promise<ResponseData<number>> {
        try {
            var response = new ResponseData<number>();
            response.results = await this.friendshipRepository.getMutualFriend(profile.profile_id, profile_target_id);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async isFriend(profile: Profile, profile_target_id: number): Promise<ResponseData<boolean>> {
        try {
            var response = new ResponseData<boolean>();
            response.results = await this.friendshipRepository.isFriend(profile.profile_id, profile_target_id);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async getAllProfileSentRequest(profile_id: number, page: Page): Promise<ResponseData<PagingData<Friendship[]>>> {
        try {
            var response = new ResponseData<PagingData<Friendship[]>>();
            response.results = await this.friendshipRepository.getAllProfileSentRequest(profile_id, page);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }
}
