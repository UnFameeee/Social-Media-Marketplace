import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PROVIDER } from "src/common/providers/provider.constant";
import { ProfileWallpaperImageEntity } from "src/common/models/entity/profile_wallpaper";
import { Profile } from "src/social-media/profile/model/profile.model";
import { ProfileWallpaperImage } from "../model/profile_wallpaper_image.mode";

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
                        where: { profile_id: profile_id, link: link },
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
}