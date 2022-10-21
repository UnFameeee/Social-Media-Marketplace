import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PROVIDER } from 'src/common/constants/provider.constant';
import { Friendship } from './../model/friendship.model';
import { PagingData } from 'src/common/models/view-model/paging.model';
import { ProfileRepository } from 'src/social-media/profile/repository/profile.repository';
import { paginate } from "src/common/utils/paginate.utils";
import { Page } from "src/common/models/view-model/page-model";
import { Profile } from 'src/social-media/profile/model/profile.model';

@Injectable()
export class FriendshipRepository {
    constructor(
        @Inject(PROVIDER.Friendship) private friendshipRepository: typeof Friendship,
        // @Inject(ProfileRepository) private ProfileRepository: ProfileRepository 
    ) { }

    async getAllFriendRequest(page: Page): Promise<PagingData<Friendship[]>> {
        try {
            var result = new PagingData<Friendship[]>();
            var queryData = await this.friendshipRepository.findAndCountAll({
                include: [
                    {
                        model: Profile,
                        foreignKey: "profile_request",
                        attributes: ["profile_name"],
                    },
                    // {
                    //     model: Profile,
                    //     attributes: ["profile_name"],
                    // }
                ],
                order: [
                    ['createdAt', 'DESC']
                ],
                raw: false,
                ...paginate({ page })
            })
            result.data = queryData.rows;
            page.totalElement = queryData.count;
            result.page = page;
            return result;
        }
        catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}