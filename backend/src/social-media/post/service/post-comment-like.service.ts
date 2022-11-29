import { Injectable } from '@nestjs/common';
import { NOTIFICATION_DESCRIPTION, NOTIFICATION_TYPE } from 'src/common/constants/notification.constant';
import { SOCKET_EVENT } from 'src/common/constants/socket.constant';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { Profile } from 'src/database/model/profile.model';
import { ResponseData } from 'src/database/view-model/success-message.model';
import { NotificationGateway } from 'src/notification/gateway/notification.gateway';
import { NotificationService } from 'src/notification/service/notification.service';
import { PostCommentLikeRepository } from '../repository/post-comment-like.repository';

@Injectable()
export class PostCommentLikeService {
    constructor(
        private readonly postCommentLikeRepository: PostCommentLikeRepository,
        private readonly notificationGateway: NotificationGateway,
        private readonly notificationService: NotificationService,
    ) { }

    async likeUnlikePostComment(profile: Profile, post_comment_id: number): Promise<ResponseData<Boolean>> {
        try {
            const response = new ResponseData<Boolean>();
            var res = await this.postCommentLikeRepository.likeUnlikePostComment(profile.profile_id, post_comment_id);
            response.results = res;

            if (response.results) {
                const profile_receiver = await this.notificationService.getProfileReceiverByCommentId(post_comment_id);
                if (profile_receiver && profile_receiver != profile.profile_id) {
                    const post_id = await this.notificationService.getPostByPostCommentId(post_comment_id);

                    const NotificationResponseDto = await this.notificationService.createNotification(profile.profile_id, profile_receiver, NOTIFICATION_TYPE.LIKE, NOTIFICATION_DESCRIPTION.LIKE_COMMENT, post_id, post_comment_id);
                    
                    this.notificationGateway.server.to(`${profile_receiver}`).emit(SOCKET_EVENT.RECEIVE_NOTIFICATION, NotificationResponseDto);
                }
            } else {
                const profile_receiver = await this.notificationService.getProfileReceiverByCommentId(post_comment_id);
                
                if (profile_receiver && profile_receiver != profile.profile_id) {
                    const post_id = await this.notificationService.getPostByPostCommentId(post_comment_id);
                    await this.notificationService.removeNotification(profile.profile_id, profile_receiver, NOTIFICATION_TYPE.LIKE, post_id, post_comment_id);
                    this.notificationGateway.server.to(`${profile_receiver}`).emit(SOCKET_EVENT.RERENDER_NOTIFICATION);
                }
            }

            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async allLikeOfPostComment(post_comment_id: number): Promise<ResponseData<number>> {
        try {
            const response = new ResponseData<number>();
            var res = await this.postCommentLikeRepository.allLikeOfPostComment(post_comment_id);
            response.results = res;
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }
}
