import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateProfileDto } from 'src/common/models/dtos/update-profile.dto';
import { Page } from 'src/common/models/view-model/page-model';
import { PagingData } from 'src/common/models/view-model/paging.model';
import { ResponseData } from 'src/common/models/view-model/success-message.model';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';

import { Profile } from '../model/profile.model';
import { ProfileRepository } from '../repository/profile.repository';

@Injectable()
export class ProfileService {

    constructor(private readonly profileRepository: ProfileRepository) { }

    async getAllProfile(page: Page): Promise<ResponseData<PagingData<Profile[]>>> {
        try {
            var response = new ResponseData<PagingData<Profile[]>>();
            response.results = await this.profileRepository.getAllProfile(page);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async getProfileById(id: number): Promise<ResponseData<Profile>> {
        try {
            var response = new ResponseData<Profile>();
            response.results = await this.profileRepository.findProfileById(id);
            return response;
        } catch (err) {
            ExceptionResponse(err)
        }
    }

    // async createNewProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    //     try {
    //         if (await this.profileRepository.findProfileByEmail(createProfileDto.email)) {
    //             throw new ConflictException("Email existed!!!");
    //         }else if(await this.profileRepository.findProfileByProfileName(createProfileDto.profile_name)){
    //             throw new ConflictException("Username existed!!!");
    //         }
    //         const user = await this.profileRepository.createNewProfile(createProfileDto);
    //         return user;
    //     } catch (err) {
    //         ExceptionResponse(err);
    //     }
    // }

    async updateProfile(id: number, updateProfileDto: UpdateProfileDto): Promise<ResponseData<boolean>> {
        try {
            var response = new ResponseData<boolean>();
            if (await this.profileRepository.findProfileByEmailExcludeId(id, updateProfileDto.email)) {
                throw new ConflictException("Email existed!!!");
            }
            const res = await this.profileRepository.updateProfileWithId(id, updateProfileDto);
            response.results = res ? true : false;
            return response;
        } catch (err) {
            ExceptionResponse(err)
        }
    }

    async deActivateProfile(profile_id: number): Promise<ResponseData<boolean>> {
        try {
            var response = new ResponseData<boolean>();
            const res = await this.profileRepository.deActivateProfileById(profile_id);
            response.results = res;
            return response;
        } catch (err) {
            ExceptionResponse(err)
        }
    }

    async activateProfile(profile_id: number): Promise<ResponseData<boolean>> {
        try {
            var response = new ResponseData<boolean>();
            const res = await this.profileRepository.activateProfileById(profile_id);
            response.results = res;
            return response;
        } catch (err) {
            ExceptionResponse(err)
        }
    }

    async friendSuggestion(profile: Profile, page: Page): Promise<ResponseData<PagingData<Profile[]>>> {
        var response = new ResponseData<PagingData<Profile[]>>();
        const res = await this.profileRepository.friendSuggestion(profile.profile_id, page);
        response.results = res;
        return response;
    }
}
