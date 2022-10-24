import { FRIENDSHIP_STATUS } from 'src/common/constants/friendship.constant';


export class FriendshipEntity {
    id: number;
    status: FRIENDSHIP_STATUS;
    profile_request: number;
    profile_target: number;
    updateAt: string;
    createAt: string;
    deleteAt: string;
}