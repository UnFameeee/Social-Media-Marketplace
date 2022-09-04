import { PROVIDER } from "src/common/constants/provider.constant";
import { Post } from "./model/post.model";

export const postProviders = [
    {
        provide: PROVIDER.Post,
        useValue: Post
    }
]