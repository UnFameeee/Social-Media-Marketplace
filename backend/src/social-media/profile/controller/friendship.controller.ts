import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FriendshipService } from '../service/friendship.service';
import { Page } from 'src/common/models/view-model/page-model';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Friendship')
@Controller('/api/friendship')
export class FriendshipController {
    constructor(private readonly friendshipService: FriendshipService) { }

    //Get all friend - paging
    @Post('/all')
    async getAllFriendRequest(@Body() page: Page){
        return await this.friendshipService.getAllFriendRequest(page);
    }

    //Get all friend request

    //Add / Un-add friend


}