import { Injectable } from '@nestjs/common';
import { FriendshipRepository } from './../repository/friendship.repository';
import { PagingData } from 'src/common/models/view-model/paging.model';
import { Friendship } from 'src/social-media/profile/model/friendship.model';
import { Page } from 'src/common/models/view-model/page-model';
import { ResponseData } from 'src/common/models/view-model/success-message.model';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';

@Injectable()
export class FriendshipService {
    constructor(private readonly friendshipRepository: FriendshipRepository) { }

    async getAllFriendRequest(page: Page): Promise<ResponseData<PagingData<Friendship[]>>> {
        try{
            var response = new ResponseData<PagingData<Friendship[]>>();
            response.results = await this.friendshipRepository.getAllFriendRequest(page);
            return response;
        }catch(err){
            ExceptionResponse(err);
        }
    }

}
