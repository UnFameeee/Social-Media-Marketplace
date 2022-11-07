import { Injectable } from "@nestjs/common";
import { ResponseData } from "src/common/models/view-model/success-message.model";
import { ExceptionResponse } from "src/common/utils/custom-exception.filter";
import { Profile } from "src/social-media/profile/model/profile.model";

@Injectable()
export class RoomImageService {
    constructor() { };

    async createUpdateRoomImage(profile: Profile, link: string): Promise<ResponseData<string>> {
        //resolve save to database
        //check update if exist, create if not exist
        try {
            var response = new ResponseData<string>();
            // response.results = await this.profileRepository.getAllProfile(page);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }
}