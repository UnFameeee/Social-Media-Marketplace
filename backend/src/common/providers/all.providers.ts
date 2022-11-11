import { PROVIDER } from "src/common/providers/provider.constant";
import { PostComment } from "src/social-media/post/model/post-comment.model";
import { PostLike } from "src/social-media/post/model/post-like.model";
import { Post } from "src/social-media/post/model/post.model";
import { Profile } from "src/social-media/profile/model/profile.model";
import { Friendship } from 'src/social-media/profile/model/friendship.model';
import { ProfileAvatarImage } from "src/social-media/image/model/profile_avatar_image.model";
import { ProfileWallpaperImage } from "src/social-media/image/model/profile_wallpaper_image.mode";
import { ProfilePostImage } from "src/social-media/image/model/profile_post_image.model";
import { RoomImage } from "src/social-media/image/model/room_image";
import { Description } from "src/social-media/profile/model/description.model";
import { ChatConnectedProfile } from "src/social-media/message/model/connected.model";
import { ChatJoinedRoom } from "src/social-media/message/model/joined_room.model";
import { ChatMessage } from "src/social-media/message/model/message.model";
import { ChatRoom } from "src/social-media/message/model/room.model";
import { ParentChildComment } from "src/social-media/post/model/parent_child_comment.model";

export const postProviders = [
    {
        provide: PROVIDER.Post,
        useValue: Post
    }
]

export const postLikeProviders = [
    {
        provide: PROVIDER.PostLike,
        useValue: PostLike
    }
]

export const postCommentProviders = [
    {
        provide: PROVIDER.PostComment,
        useValue: PostComment
    }
]

export const parentChildCommentProviders = [
    {
        provide: PROVIDER.ParentChildComment,
        useValue: ParentChildComment
    }
]

export const profileProviders = [
    {
        provide: PROVIDER.Profile,
        useValue: Profile
    }
]

export const friendshipProviders = [
    {
        provide: PROVIDER.Friendship,
        useValue: Friendship
    }
]

export const descriptionProviders = [
    {
        provide: PROVIDER.Description,
        useValue: Description
    }
]

export const profileAvatarImageProviders = [
    {
        provide: PROVIDER.ProfileAvatarImage,
        useValue: ProfileAvatarImage
    }
]

export const profileWallpaperImageProviders = [
    {
        provide: PROVIDER.ProfileWallpaperImage,
        useValue: ProfileWallpaperImage
    }
]

export const profilePostImageProviders = [
    {
        provide: PROVIDER.ProfilePostImage,
        useValue: ProfilePostImage
    }
]

export const chatroomImageProviders = [
    {
        provide: PROVIDER.ChatroomImage,
        useValue: RoomImage
    }
]
//
export const chatConnectedProfileProviders = [
    {
        provide: PROVIDER.ChatConnectedProfile,
        useValue: ChatConnectedProfile
    }
]

export const chatJoinedRoomProviders = [
    {
        provide: PROVIDER.ChatJoinedRoom,
        useValue: ChatJoinedRoom
    }
]

export const chatMessageProviders = [
    {
        provide: PROVIDER.ChatMessage,
        useValue: ChatMessage
    }
]

export const chatRoomProviders = [
    {
        provide: PROVIDER.ChatRoom,
        useValue: ChatRoom
    }
]