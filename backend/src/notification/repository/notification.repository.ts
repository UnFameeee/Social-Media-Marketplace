import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PostComment } from "src/database/model/post-comment.model";
import { Post } from "src/database/model/post.model";
import { Profile } from "src/database/model/profile.model";
import { PROVIDER } from "src/database/providers/provider.constant";

@Injectable()
export class NotificationRepository {
    constructor(
        @Inject(PROVIDER.Post) private postRepository: typeof Post,
        @Inject(PROVIDER.PostComment) private postCommentRepository: typeof PostComment,
    ) { };

    async getProfileReceiverByPostId(post_id: number): Promise<Post> {
        try {
            const queryData = await this.postRepository.findOne({
                attributes: ["profile_id"],
                where: {
                    post_id: post_id,
                },
                include: [
                    {
                        model: Profile,
                        as: "post_profile",
                        attributes: [],
                    }
                ]
            })
            
            return queryData;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}