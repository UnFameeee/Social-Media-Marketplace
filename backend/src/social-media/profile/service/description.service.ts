import { Injectable } from '@nestjs/common';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { Description } from 'src/database/model/description.model';
import { ResponseData } from 'src/database/view-model/success-message.model';
import { DescriptionRepository } from '../repository/description.repository';

@Injectable()
export class DescriptionService {
    constructor(private readonly descriptionRepository: DescriptionRepository) { }

    // async createProfileDescription(profile_id: number): Promise<ResponseData<Description>> {
    //     try {
    //         var response = new ResponseData<Description>;
    //         response.results = await this.descriptionRepository.createProfileDescription(profile_id);
    //         return response;
    //     } catch (err) {
    //         ExceptionResponse(err);
    //     }
    // }

    async updateProfileDescription(profile_id: number, data: Description): Promise<ResponseData<Description>> {
        try {
            var response = new ResponseData<Description>;
            response.results = await this.descriptionRepository.updateProfileDescription(profile_id, data);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }
}
