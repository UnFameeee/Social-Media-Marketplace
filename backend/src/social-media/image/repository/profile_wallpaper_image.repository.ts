import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ProfileWallpaperImageEntity } from "src/database/entity/profile_wallpaper";
import { Profile } from "src/database/model/profile.model";
import { ProfileWallpaperImage } from "src/database/model/profile_wallpaper_image.mode";
import { PROVIDER } from "src/database/providers/provider.constant";

@Injectable()
export class ProfileWallpaperImageRepository {
    constructor(
        @Inject(PROVIDER.ProfileWallpaperImage) private profileWallpaperImageRepository: typeof ProfileWallpaperImage
    ) { };

    async createUpdateProfileWallpaperImage(profile_id: number, link: string): Promise<string> {
        try {
            const queryDataCheck = await this.profileWallpaperImageRepository.findOne({
                include: [
                    {
                        model: Profile,
                        where: { profile_id: profile_id },
                        attributes: [],
                    }
                ]
            });

            var profileWallpaperImage = new ProfileWallpaperImageEntity();
            profileWallpaperImage.profile_id = profile_id;
            profileWallpaperImage.link = link;

            if (queryDataCheck) {
                queryDataCheck.link = link;
                await queryDataCheck.save();
                const querydata = await this.profileWallpaperImageRepository.findOne({
                    where: { profile_wallpaper_image_id: queryDataCheck.profile_wallpaper_image_id },
                    raw: true,
                })
                return querydata.link;
            } else {
                const queryCreate = await this.profileWallpaperImageRepository.create(profileWallpaperImage);
                const querydata = await this.profileWallpaperImageRepository.findOne({
                    where: { profile_wallpaper_image_id: queryCreate.profile_wallpaper_image_id },
                    raw: true,
                })
                return querydata.link;
            }
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async deleteProfileWallpaperImage(profile_id: number): Promise<boolean> {
        try {
            const queryDeleteData = await this.profileWallpaperImageRepository.findOne({
                include: [
                    {
                        model: Profile,
                        where: { profile_id: profile_id }
                    }
                ]
            })
            if (queryDeleteData) {
                await queryDeleteData.destroy();

                const queryData = await this.profileWallpaperImageRepository.findOne({
                    where: { profile_wallpaper_image_id: queryDeleteData.profile_wallpaper_image_id }
                })

                return queryData ? false : true;
            } return false;

        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}