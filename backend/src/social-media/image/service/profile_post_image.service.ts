import { Injectable } from "@nestjs/common";
import { ResponseData } from "src/common/models/view-model/success-message.model";
import { ExceptionResponse } from "src/common/utils/custom-exception.filter";
import { Profile } from "src/social-media/profile/model/profile.model";
import { ProfilePostImageRepository } from "../repository/profile_post_image.repository";

@Injectable()
export class ProfilePostImageService {
    constructor(private readonly profilePostImageRepository: ProfilePostImageRepository) { };

    async createUpdateProfilePostImage(profile_id: number, post_id: number, arrayLink: string[]): Promise< ResponseData<string[]>> {
        //resolve save to database
        //check update if exist, create if not exist
        try {
            var response = new ResponseData<string[]>();
            // response.results = await this.profileRepository.getAllProfile(page);
            response.results = await this.profilePostImageRepository.createUpdateProfilePostImage(profile_id, post_id ,arrayLink);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }
}