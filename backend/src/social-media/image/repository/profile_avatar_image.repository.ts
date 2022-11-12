import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ProfileAvatarImageEntity } from "src/database/entity/profile_avatar";
import { Profile } from "src/database/model/profile.model";
import { ProfileAvatarImage } from "src/database/model/profile_avatar_image.model";
import { PROVIDER } from "src/database/providers/provider.constant";

@Injectable()
export class ProfileAvatarImageRepository {
    constructor(
        @Inject(PROVIDER.ProfileAvatarImage) private profileAvatarImageRepository: typeof ProfileAvatarImage
    ) { };

    async createUpdateProfileAvatarImage(profile_id: number, link: string): Promise<string> {
        try {
            const queryDataCheck = await this.profileAvatarImageRepository.findOne({
                include: [
                    {
                        model: Profile,
                        where: { profile_id: profile_id },
                        attributes: [],
                    }
                ]
            });

            var profileAvatarImage = new ProfileAvatarImageEntity();
            profileAvatarImage.profile_id = profile_id;
            profileAvatarImage.link = link;

            if (queryDataCheck) {
                queryDataCheck.link = link;
                await queryDataCheck.save();
                const querydata = await this.profileAvatarImageRepository.findOne({
                    where: { profile_avatar_image_id: queryDataCheck.profile_avatar_image_id },
                    raw: true,
                })
                return querydata.link;
            } else {
                const queryCreate = await this.profileAvatarImageRepository.create(profileAvatarImage);
                const querydata = await this.profileAvatarImageRepository.findOne({
                    where: { profile_avatar_image_id: queryCreate.profile_avatar_image_id },
                    raw: true,
                })
                return querydata.link;
            }
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async deleteProfileAvatarImage(profile_id: number): Promise<boolean> {
        try {
            const queryDeleteData = await this.profileAvatarImageRepository.findOne({
                include: [
                    {
                        model: Profile,
                        where: { profile_id: profile_id }
                    }
                ]
            })
            if (queryDeleteData) {
                await queryDeleteData.destroy();
                const queryData = await this.profileAvatarImageRepository.findOne({
                    where: { profile_avatar_image_id: queryDeleteData.profile_avatar_image_id }
                })

                return queryData ? false : true;
            } return false;


        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}