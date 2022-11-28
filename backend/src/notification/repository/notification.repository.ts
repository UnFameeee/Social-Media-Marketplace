import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { Notification } from "src/database/model/notification.model";
import { PostComment } from "src/database/model/post-comment.model";
import { Post } from "src/database/model/post.model";
import { Profile } from "src/database/model/profile.model";
import { ProfileAvatarImage } from "src/database/model/profile_avatar_image.model";
import { PROVIDER } from "src/database/providers/provider.constant";

@Injectable()
export class NotificationRepository {
    constructor(
        @Inject(PROVIDER.Post) private readonly postRepository: typeof Post,
        @Inject(PROVIDER.PostComment) private readonly postCommentRepository: typeof PostComment,
        @Inject(PROVIDER.Profile) private readonly profileRepository: typeof Profile
    ) { };

    async getProfileReceiverByPostId(post_id: number): Promise<Post> {
        try {
            const queryData = await this.postRepository.findOne({
                attributes: ["profile_id"],
                where: {
                    post_id: post_id,
                },
                include: [
                    {
                        model: Profile,
                        as: "post_profile",
                        attributes: [],
                    }
                ]
            })
            
            return queryData;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getProfileReceiverByCommentId(post_comment_id: number): Promise<PostComment> {
        try {
            const queryData = await this.postCommentRepository.findOne({
                attributes: ["profile_id"],
                where: {
                    post_comment_id: post_comment_id,
                },
                include: [
                    {
                        model: Profile,
                        as: "comment_profile",
                        attributes: [],
                    }
                ]
            })
            return queryData;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getProfileSenderByProfileId(profile_id: number): Promise<Profile> {
        try {
            const queryData = await this.profileRepository.findOne({
                attributes: ["profile_name", [Sequelize.col("profile_avatar.link"), "avatar"]],
                where: {
                    profile_id: profile_id,
                },
                include: [
                    {
                        model: ProfileAvatarImage,
                        as: "profile_avatar",
                        attributes: ["link"],
                    }
                ],
                raw: true
            })
            return queryData;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }    

    async createNotificationData(profile_sender: number, profile_receiver: number, profile_id?: number, post_id?: number, post_comment_id?: number): Promise<Notification> {
        try {
            return null;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }    

    async removeNotificationData(profile_sender: number, profile_receiver: number, profile_id?: number, post_id?: number, post_comment_id?: number): Promise<Notification> {
        try {
            return null;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }    

    async getAllNotificationData(profile_id: number): Promise<Notification[]> {
        try {
            return null;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }    
}