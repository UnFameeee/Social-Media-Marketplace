import { Controller, UseGuards, Post, Get, Put, Request, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Profile } from "src/database/model/profile.model";
import { NotificationService } from "../service/notification.service";

@UseGuards(JwtAuthGuard)
@ApiTags('Notification')
@Controller('/api/notification')
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService
    ) { };

    //get all notification
    @Get("/all")
    async getAllNotification(@Request() request: any) {
        const profile = <Profile>request.user;
        return await this.notificationService.getAllNotification(profile.profile_id);
    }

    //get all notification
    @Get("/all/friend_request")
    async getAllFriendRequestNotification(@Request() request: any) {
        const profile = <Profile>request.user;
        return await this.notificationService.getAllFriendRequestNotification(profile.profile_id);
    }

    //get all notification
    @Get("/all/unread")
    async getAllUnreadNotification(@Request() request: any) {
        const profile = <Profile>request.user;
        return await this.notificationService.getAllUnreadNotification(profile.profile_id);
    }

    //change status of notification
    @Put("/read/:notification_id")
    async readNotification(@Request() request: any, @Param("notification_id") notiifcation_id: number) {
        const profile = <Profile>request.user;
        return await this.notificationService.readNotification(profile.profile_id, notiifcation_id);
    }
}