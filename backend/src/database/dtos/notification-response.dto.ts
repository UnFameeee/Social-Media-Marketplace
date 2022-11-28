import { NOTIFICATION_TYPE } from "src/common/constants/notification.constant";

export class NotificationResponseDto {
    notification_type: NOTIFICATION_TYPE;
    avatar: string;
    profile_name: string;
    content: string;
    post_id: number;
    profile_id: number;
}