import { Auth } from "src/database/model/claim.model";
import { PROVIDER } from "src/database/providers/provider.constant";
import { ChatConnectedProfile } from "src/social-media/message/model/connected.model";
import { ChatJoinedRoom } from "src/social-media/message/model/joined_room.model";
import { ChatMessage } from "src/social-media/message/model/message.model";
import { ChatRoom } from "src/social-media/message/model/room.model";
import { Description } from "../model/description.model";
import { Friendship } from "../model/friendship.model";
import { ParentChildComment } from "../model/parent_child_comment.model";
import { PostComment } from "../model/post-comment.model";
import { PostLike } from "../model/post-like.model";
import { Post } from "../model/post.model";
import { Profile } from "../model/profile.model";
import { ProfileAvatarImage } from "../model/profile_avatar_image.model";
import { ProfilePostImage } from "../model/profile_post_image.model";
import { ProfileWallpaperImage } from "../model/profile_wallpaper_image.mode";
import { RoomImage } from "../model/room_image";

export const authProviders = [
    {
        provide: PROVIDER.Auth,
        useValue: Auth,
    }
]

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



//Not used yet
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