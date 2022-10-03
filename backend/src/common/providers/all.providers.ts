import { PROVIDER } from "src/common/constants/provider.constant";
import { PostComment } from "src/social-media/post/model/post-comment.model";
import { PostLike } from "src/social-media/post/model/post-like.model";
import { Post } from "src/social-media/post/model/post.model";
import { Profile } from "src/social-media/profile/model/profile.model";

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

export const profileProviders = [
    {
        provide: PROVIDER.Profile,
        useValue: Profile
    }
]