import { Injectable } from '@nestjs/common';
import { FriendshipRepository } from './../repository/friendship.repository';
import { PagingData } from 'src/common/models/view-model/paging.model';
import { Friendship } from 'src/social-media/profile/model/friendship.model';
import { Page } from 'src/common/models/view-model/page-model';
import { ResponseData } from 'src/common/models/view-model/success-message.model';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { Profile } from '../model/profile.model';

@Injectable()
export class FriendshipService {
    constructor(private readonly friendshipRepository: FriendshipRepository) { }

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

    async sendFriendRequest(profile: Profile, profile_target_id: number): Promise<ResponseData<boolean>> {
        try {
            var response = new ResponseData<boolean>();
            response.results = await this.friendshipRepository.sendFriendRequest(profile.profile_id, profile_target_id);
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
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async denyFriendRequest(profile: Profile, profile_request_id: number): Promise<ResponseData<boolean>> {
        try {
            var response = new ResponseData<boolean>();
            response.results = await this.friendshipRepository.denyFriendRequest(profile.profile_id, profile_request_id);
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
}
