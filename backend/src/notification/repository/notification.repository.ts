import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import { NOTIFICATION_DESCRIPTION, NOTIFICATION_TYPE } from "src/common/constants/notification.constant";
import { NotificationResponseDto } from "src/database/dtos/notification-response.dto";
import { NotificationEntity } from "src/database/entity/notification.entity";
import { Notification } from "src/database/model/notification.model";
import { PostComment } from "src/database/model/post-comment.model";
import { Post } from "src/database/model/post.model";
import { Profile } from "src/database/model/profile.model";
import { ProfileAvatarImage } from "src/database/model/profile_avatar_image.model";
import { PROVIDER } from "src/database/providers/provider.constant";
import { NotificationGateway } from "../gateway/notification.gateway";

@Injectable()
export class NotificationRepository {
    constructor(
        @Inject(PROVIDER.Notification) private readonly notificationRepository: typeof Notification,
        @Inject(PROVIDER.Post) private readonly postRepository: typeof Post,
        @Inject(PROVIDER.PostComment) private readonly postCommentRepository: typeof PostComment,
        @Inject(PROVIDER.Profile) private readonly profileRepository: typeof Profile,
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

    async getPostIdByCommentId(post_comment_id: number): Promise<PostComment> {
        try {
            const queryData = await this.postCommentRepository.findOne({
                attributes: ["post_id"],
                where: {
                    post_comment_id: post_comment_id,
                },
                include: [
                    {
                        model: Post,
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

    async getPostByPostCommentId(post_comment_id: number): Promise<PostComment> {
        try {
            const queryData = await this.postCommentRepository.findOne({
                attributes: [
                    [Sequelize.col("Post.post_id"), "post_id"]
                ],
                where: {
                    post_comment_id: post_comment_id,
                },
                include: [
                    {
                        model: Post,
                        attributes: [],
                    }
                ],
                raw: true
            })
            return queryData;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async createNotification(profile_sender: number, profile_receiver: number, notification_type: NOTIFICATION_TYPE, notification_description: NOTIFICATION_DESCRIPTION, post_id?: number, post_comment_id?: number): Promise<NotificationResponseDto> {
        try {
            const queryProfileData = await this.profileRepository.findOne({
                attributes: ["profile_name", [Sequelize.col("profile_avatar.link"), "avatar"]],
                where: {
                    profile_id: profile_sender,
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

            var notificationEntity = new NotificationEntity();
            notificationEntity = {
                notification_id: null,
                profile_sender_id: profile_sender,
                profile_receiver_id: profile_receiver,
                content: `${queryProfileData.profile_name} ${notification_description}`,
                notification_type: notification_type,
                was_seen: false,
                post_id: post_id ? post_id : null,
                post_comment_id: post_comment_id ? post_comment_id : null,
            }

            const queryData = await this.notificationRepository.create(notificationEntity);

            var notificationResponse = new NotificationResponseDto();
            notificationResponse = {
                notification_type: notification_type,
                avatar: queryProfileData["avatar"],
                profile_name: queryProfileData.profile_name,
                content: queryData.content,
                post_id: post_id ? post_id : null,
                profile_id: post_comment_id ? post_comment_id : null,
            }

            return notificationResponse;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async removeNotification(profile_sender: number, profile_receiver: number, notification_type: NOTIFICATION_TYPE, post_id?: number, post_comment_id?: number): Promise<Boolean> {
        try {
            var queryData: any;
            if (post_comment_id) {
                queryData = await this.notificationRepository.findOne({
                    attributes: ["notification_id"],
                    where: {
                        notification_type: notification_type
                    },
                    include: [
                        {
                            model: Profile,
                            as: "profile_sender",
                            attributes: [],
                            where: {
                                profile_id: profile_sender
                            }
                        },
                        {
                            model: Profile,
                            as: "profile_receiver",
                            attributes: [],
                            where: {
                                profile_id: profile_receiver
                            }
                        },
                        {
                            model: Post,
                            attributes: [],
                            where: {
                                post_id: post_id
                            }
                        },
                        {
                            model: PostComment,
                            attributes: [],
                            where: {
                                post_comment_id: post_comment_id
                            },
                        },
                    ]
                })
            } else {
                queryData = await this.notificationRepository.findOne({
                    attributes: ["notification_id"],
                    where: {
                        notification_type: notification_type
                    },
                    include: [
                        {
                            model: Profile,
                            as: "profile_sender",
                            attributes: [],
                            where: {
                                profile_id: profile_sender
                            }
                        },
                        {
                            model: Profile,
                            as: "profile_receiver",
                            attributes: [],
                            where: {
                                profile_id: profile_receiver
                            }
                        },
                        {
                            model: Post,
                            attributes: [],
                            where: {
                                post_id: post_id
                            }
                        },
                    ]
                })
            }

            if (queryData) {
                await queryData.destroy();
            }
            return true;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async removeFriendRequestNotification(profile_sender: number, profile_receiver: number, notification_type: NOTIFICATION_TYPE): Promise<Boolean> {
        try {
            const queryData = await this.notificationRepository.findOne({
                attributes: ["notification_id"],
                where: {
                    notification_type: notification_type
                },
                include: [
                    {
                        model: Profile,
                        as: "profile_sender",
                        attributes: [],
                        where: {
                            profile_id: profile_sender
                        }
                    },
                    {
                        model: Profile,
                        as: "profile_receiver",
                        attributes: [],
                        where: {
                            profile_id: profile_receiver
                        }
                    },
                ]
            })
            if (queryData) {
                await queryData.destroy();
            }
            return true;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async removePostCommentNotification(post_comment_id: number[]): Promise<Boolean> {
        try {
            const queryData = await this.notificationRepository.findAll({
                attributes: ["notification_id"],
                include: [
                    {
                        model: PostComment,
                        attributes: [],
                        where: {
                            post_comment_id: {
                                [Op.in]: post_comment_id
                            }
                        },
                    },
                ]
            })
            var idArrayDelete: number[] = [];
            for (const element of queryData) {
                idArrayDelete.push(element.notification_id);
            }

            const deleteEffected = await this.notificationRepository.destroy({
                where: {
                    notification_id: {
                        [Op.in]: idArrayDelete
                    }
                }
            })



            return deleteEffected ? true : false;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async removePostNotification(post_id: number): Promise<Boolean> {
        try {
            const queryData = await this.notificationRepository.findAll({
                attributes: ["notification_id"],
                include: [
                    {
                        model: Post,
                        attributes: [],
                        where: {
                            post_id: post_id
                        }
                    },
                ]
            })

            var idArrayDelete: number[] = [];
            for (const element of queryData) {
                idArrayDelete.push(element.notification_id);
            }
            const deleteEffected = await this.notificationRepository.destroy({
                where: {
                    notification_id: {
                        [Op.in]: idArrayDelete
                    }
                }
            })

            return deleteEffected ? true : false;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getAllNotification(profile_id: number): Promise<Notification[]> {
        try {
            const queryData = await this.notificationRepository.findAndCountAll({
                attributes: ["notification_id", "content", "was_seen", "notification_type", "content",
                    [Sequelize.col("profile_sender.profile_avatar.link"), "profile_sender_avatar"],
                    [Sequelize.col("profile_sender.profile_name"), "profile_sender_name"],
                    [Sequelize.col("profile_sender.profile_id"), "profile_sender_id"],
                    [Sequelize.col("Post.post_id"), "post_id"],
                ],
                where: {
                    notification_type: {
                        [Op.ne]: NOTIFICATION_TYPE.FRIEND_REQUEST
                    }
                },
                include: [
                    {
                        model: Profile,
                        as: "profile_sender",
                        attributes: [],
                        include: [
                            {
                                model: ProfileAvatarImage,
                                as: "profile_avatar",
                                attributes: []
                            }
                        ]
                    },
                    {
                        model: Profile,
                        as: "profile_receiver",
                        attributes: [],
                        where: {
                            profile_id: profile_id,
                        },
                    },
                    {
                        model: Post,
                        attributes: [],
                    },
                ],
                order: [
                    ['createdAt', 'DESC'],
                ],
            })
            return queryData.rows;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getAllFriendRequestNotification(profile_id: number): Promise<Notification[]> {
        try {
            const queryData = await this.notificationRepository.findAndCountAll({
                attributes: ["notification_id", "content", "was_seen", "notification_type", "content",
                    [Sequelize.col("profile_sender.profile_avatar.link"), "profile_sender_avatar"],
                    [Sequelize.col("profile_sender.profile_name"), "profile_sender_name"],
                    [Sequelize.col("profile_sender.profile_id"), "profile_sender_id"],
                    [Sequelize.col("Post.post_id"), "post_id"],
                ],
                where: {
                    notification_type: NOTIFICATION_TYPE.FRIEND_REQUEST
                },
                include: [
                    {
                        model: Profile,
                        as: "profile_sender",
                        attributes: [],
                        include: [
                            {
                                model: ProfileAvatarImage,
                                as: "profile_avatar",
                                attributes: []
                            }
                        ]
                    },
                    {
                        model: Profile,
                        as: "profile_receiver",
                        attributes: [],
                        where: {
                            profile_id: profile_id,
                        },
                    },
                    {
                        model: Post,
                        attributes: [],
                    },
                ],
                order: [
                    ['createdAt', 'DESC'],
                ],
            })
            return queryData.rows;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getAllUnreadNotification(profile_id: number): Promise<Notification[]> {
        try {
            const queryData = await this.notificationRepository.findAndCountAll({
                attributes: ["notification_id", "content", "was_seen", "notification_type", "content",
                    [Sequelize.col("profile_sender.profile_avatar.link"), "profile_sender_avatar"],
                    [Sequelize.col("profile_sender.profile_name"), "profile_sender_name"],
                    [Sequelize.col("profile_sender.profile_id"), "profile_sender_id"],
                    [Sequelize.col("Post.post_id"), "post_id"],
                ],
                where: {
                    was_seen: false,
                    // notification_type: {
                    //     [Op.ne]: NOTIFICATION_TYPE.FRIEND_REQUEST
                    // }
                },
                include: [
                    {
                        model: Profile,
                        as: "profile_sender",
                        attributes: [],
                        include: [
                            {
                                model: ProfileAvatarImage,
                                as: "profile_avatar",
                                attributes: []
                            }
                        ]
                    },
                    {
                        model: Profile,
                        as: "profile_receiver",
                        attributes: [],
                        where: {
                            profile_id: profile_id,
                        },
                    },
                    {
                        model: Post,
                        attributes: [],
                    },
                ],
                order: [
                    ['createdAt', 'DESC'],
                ],
            })
            return queryData.rows;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async readNotification(profile_id: number, notifcation_id: number): Promise<Boolean> {
        try {
            const queryData = await this.notificationRepository.findOne({
                attributes: ["notification_id", "content", "was_seen"],
                where: {
                    notification_id: notifcation_id
                },
                include: [
                    {
                        model: Profile,
                        as: "profile_receiver",
                        attributes: [],
                        where: {
                            profile_id: profile_id,
                        },
                    },
                ],
            })

            queryData.was_seen = true;
            await queryData.save();

            return queryData ? true : false;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}