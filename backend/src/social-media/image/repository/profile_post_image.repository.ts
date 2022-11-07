import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PROVIDER } from "src/common/constants/provider.constant";
import { ProfilePostImageEntity } from "src/common/models/entity/profile_post_image";
import { Post } from "src/social-media/post/model/post.model";
import { ProfilePostImage } from "../model/profile_post_image.model";

@Injectable()
export class ProfilePostImageRepository {
    constructor(
        @Inject(PROVIDER.ProfilePostImage) private profilePostImageRepository: typeof ProfilePostImage,
        @Inject(PROVIDER.Post) private postRepository: typeof Post,
    ) { };

    async createUpdateProfilePostImage(profile_id: number, post_id: number, arrayLink: string[]): Promise<string[]> {
        try {
            const queryDataCheck = await this.profilePostImageRepository.findAll({
                include: [
                    {
                        model: Post,
                        where: {
                            post_id: post_id,
                        },
                        attributes: [],
                    }
                ],
                raw: true,
            });

            var profilePostImage = new ProfilePostImageEntity();

            if (queryDataCheck) {
                const arrayQueryDataCheck: number[] = [];
                for (const element of queryDataCheck) {
                    arrayQueryDataCheck.push(element["profile_post_image_id"])
                }
                await this.profilePostImageRepository.destroy({
                    where: {
                        profile_post_image_id: arrayQueryDataCheck,
                    }
                })

            }
            for (const element of arrayLink) {
                profilePostImage.link = element;
                profilePostImage.profile_id = profile_id;
                profilePostImage.post_id = post_id;
                await this.profilePostImageRepository.create(profilePostImage);
            }

            const queryData = await this.profilePostImageRepository.findAll({
                where: {
                    profile_id: profile_id,
                },
                attributes: ["link"],
                include: [
                    {
                        model: Post,
                        where: {
                            post_id: post_id
                        },
                        attributes: []
                    }
                ],
                raw: true,
            })
            var resArrayLink: any[] = [];
            for (const element of queryData) {
                resArrayLink.push(element.link)
            }
            //save to database
            // const queryPostData = await this.postRepository.findOne({
            //     where: {
            //         post_id: post_id
            //     }
            // })

            // queryPostData.media_location = JSON.stringify(resArrayLink);
            // await queryPostData.save();

            return resArrayLink;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}