import { Body, Controller, Get, Param, Post, Request, RequestMethod, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Profile } from 'src/database/model/profile.model';
import { Page } from 'src/database/view-model/page-model';
import { FriendshipService } from '../service/friendship.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Friendship')
@Controller('/api/friendship')
export class FriendshipController {
    constructor(private readonly friendshipService: FriendshipService) { }

    //Get all friend request - paging
    @Post('/request/all')
    async getAllFriendRequest(@Request() request: any, @Body() page: Page) {
        const profile = <Profile>request.user;
        return await this.friendshipService.getAllFriendRequest(profile, page);
    }

    //Get all friend
    @Post("/all/:profile_id")
    async getAllFriend(@Param("profile_id") profile_id: number, @Body() page: Page) {
        return await this.friendshipService.getAllFriend(profile_id, page);
    }


    //Add / Un-add friend
    @Post("/sendFriendRequest/:profile_target_id")
    async sendFriendRequest(@Request() request: any, @Param("profile_target_id") profile_target_id: number) {
        const profile = <Profile>request.user;
        return await this.friendshipService.sendFriendRequest(profile, profile_target_id);
    }

    @Post("/unfriend/:profile_target_id")
    async unfriend(@Request() request: any, @Param("profile_target_id") profile_target_id: number) {
        const profile = <Profile>request.user;
        return await this.friendshipService.unfriend(profile, profile_target_id);
    }

    //Check status if user send friend request or not
    @Post("/isSentFriendRequest/:profile_target_id")
    async isSentFriendRequest(@Request() request: any, @Param("profile_target_id") profile_target_id: number) {
        const profile = <Profile>request.user;
        return await this.friendshipService.isSentFriendRequest(profile, profile_target_id);
    }

    //Accept friend request
    @Post("/acceptFriendRequest/:profile_request_id")
    async acceptFriendRequest(@Request() request: any, @Param("profile_request_id") profile_request_id: number) {
        const profile = <Profile>request.user;
        return await this.friendshipService.acceptFriendRequest(profile, profile_request_id);
    }

    //Deny friend request
    @Post("/denyFriendRequest/:profile_request_id")
    async denyFriendRequest(@Request() request: any, @Param("profile_request_id") profile_request_id: number) {
        const profile = <Profile>request.user;
        return await this.friendshipService.denyFriendRequest(profile, profile_request_id);
    }

    //Mutual friend
    @Get("/getMutualFriend/:profile_target_id")
    async getMutualFriend(@Request() request: any, @Param("profile_target_id") profile_target_id: number) {
        const profile = <Profile>request.user;
        return await this.friendshipService.getMutualFriend(profile, profile_target_id);
    }

    //Is friend ?
    @Get("/isFriend/:profile_target_id")
    async isFriend(@Request() request: any, @Param("profile_target_id") profile_target_id: number) {
        const profile = <Profile>request.user;
        return await this.friendshipService.isFriend(profile, profile_target_id);
    }

    //Is friend ?
    @Post("/getAllSentFriendRequest")
    async getAllProfileSentRequest(@Request() request: any, @Body() page: Page) {
        const profile = <Profile>request.user;
        return await this.friendshipService.getAllProfileSentRequest(profile.profile_id, page);
    }
}