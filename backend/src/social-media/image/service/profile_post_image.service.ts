import { Injectable } from "@nestjs/common";
import { ExceptionResponse } from "src/common/utils/custom-exception.filter";
import { ResponseData } from "src/database/view-model/success-message.model";
import { ProfilePostImageRepository } from "../repository/profile_post_image.repository";

@Injectable()
export class ProfilePostImageService {
    constructor(private readonly profilePostImageRepository: ProfilePostImageRepository) { };

    async createUpdateProfilePostImage(profile_id: number, post_id: number, arrayLink: string[]): Promise<ResponseData<string[]>> {
        try {
            var response = new ResponseData<string[]>();
            response.results = await this.profilePostImageRepository.createUpdateProfilePostImage(profile_id, post_id, arrayLink);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async deleteProfilePostImage(post_id: number, linkArray: string[]): Promise<ResponseData<boolean>> {
        try {
            var response = new ResponseData<boolean>();
            response.results = await this.profilePostImageRepository.deleteProfilePostImage(post_id, linkArray);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }
}