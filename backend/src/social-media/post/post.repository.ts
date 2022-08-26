import { Inject, Injectable } from "@nestjs/common";
import { PROVIDER } from "src/common/constants/provider.constant";
import { Post } from "./model/post.model";

@Injectable()
export class PostRepository {
    constructor(@Inject(PROVIDER.Post) private profileRepository: typeof Post) {}

    
}