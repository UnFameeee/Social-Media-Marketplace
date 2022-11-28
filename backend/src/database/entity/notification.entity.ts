import { NOTIFICATION_TYPE } from "src/common/constants/notification.constant";

export class NotificationEntity {
    notification_id: number;
    profile_sender_id: number;
    profile_receiver_id: number;
    content: string;
    notification_type: NOTIFICATION_TYPE;
    was_seen: boolean;
    
    post_id: number;
    post_comment_id: number;

    // updateAt: string;
    // createAt: string;
    // deleteAt: string;
}