import { Injectable } from "@nestjs/common";
import { ExceptionResponse } from "src/common/utils/custom-exception.filter";
import { ResponseData } from "src/database/view-model/success-message.model";
import { ProfileWallpaperImageRepository } from "../repository/profile_wallpaper_image.repository";

@Injectable()
export class ProfileWallpaperImageService {
    constructor(private readonly profileWallpaperImageRepository: ProfileWallpaperImageRepository) { };

    async createUpdateProfileWallpaperImage(profile_id: number, link: string): Promise<ResponseData<string>> {
        //resolve save to database
        //check update if exist, create if not exist
        try {
            var response = new ResponseData<string>();
            response.results = await this.profileWallpaperImageRepository.createUpdateProfileWallpaperImage(profile_id, link);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async deleteProfileWallpaperImage(profile_id: number): Promise<ResponseData<boolean>> {
        try {
            var response = new ResponseData<boolean>();
            response.results = await this.profileWallpaperImageRepository.deleteProfileWallpaperImage(profile_id);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }
}