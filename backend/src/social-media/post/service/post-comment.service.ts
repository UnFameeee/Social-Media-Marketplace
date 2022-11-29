import { Injectable } from '@nestjs/common';
import { PostCommentDto } from 'src/database/dtos/post-comment.dto';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { PostCommentRepository } from '../repository/post-comment.repository';
import { Profile } from 'src/database/model/profile.model';
import { ResponseData } from 'src/database/view-model/success-message.model';
import { Page } from 'src/database/view-model/page-model';
import { NotificationGateway } from 'src/notification/gateway/notification.gateway';
import { NotificationService } from 'src/notification/service/notification.service';
import { NOTIFICATION_DESCRIPTION, NOTIFICATION_TYPE } from 'src/common/constants/notification.constant';
import { SOCKET_EVENT } from 'src/common/constants/socket.constant';

@Injectable()
export class PostCommentService {
    constructor(
        private readonly postCommentRepository: PostCommentRepository,
        private readonly notificationGateway: NotificationGateway,
        private readonly notificationService: NotificationService,
    ) { }

    async createComment(profile: Profile, postCommentDto: PostCommentDto): Promise<ResponseData<any>> {
        try {
            const response = new ResponseData<boolean>();
            var res = await this.postCommentRepository.createComment(profile.profile_id, postCommentDto);
            response.results = res ? true : false;

            if (response.results) {
                var profile_receiver: any;
                var message: NOTIFICATION_DESCRIPTION;
                if (postCommentDto.parent_comment_id) {
                    //Comment to comment
                    profile_receiver = await this.notificationService.getProfileReceiverByCommentId(postCommentDto.parent_comment_id);

                    message = NOTIFICATION_DESCRIPTION.COMMENT_TO_COMMENT;
                } else {
                    //Comment to post
                    profile_receiver = await this.notificationService.getProfileReceiverByPostId(postCommentDto.post_id);

                    message = NOTIFICATION_DESCRIPTION.COMMENT_TO_POST;
                }

                if (profile_receiver && profile_receiver != profile.profile_id) {
                    const NotificationResponseDto = await this.notificationService.createNotification(profile.profile_id, profile_receiver, NOTIFICATION_TYPE.COMMENT, message, postCommentDto.post_id, res.post_comment_id);

                    this.notificationGateway.server.to(`${profile_receiver}`).emit(SOCKET_EVENT.RECEIVE_NOTIFICATION, NotificationResponseDto);
                }
            }

            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async getAllCommentOfPost(profile_id: number, post_id: number, page: Page): Promise<ResponseData<any>> {
        try {
            const response = new ResponseData<boolean>();
            var res = await this.postCommentRepository.getAllCommentOfPost(profile_id, post_id, page);
            response.results = res;
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async updateComment(post_comment_id: number, comment_text: string) {
        try {
            const response = new ResponseData<boolean>();
            var res = await this.postCommentRepository.updateComment(post_comment_id, comment_text);
            response.results = res ? true : false;
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async deleteComment(profile_id: number, post_comment_id: number) {
        try {
            const response = new ResponseData<any>();
            var res = await this.postCommentRepository.deleteComment(profile_id, post_comment_id);
            response.results = res;
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }       
    }
}
