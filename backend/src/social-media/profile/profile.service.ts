import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateProfileDto } from 'src/common/models/dtos/update-profile.dto';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';

import { Profile } from './model/profile.model';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {

    constructor(private readonly profileRepository: ProfileRepository) { }

    //Need to improve, paging for example.
    async getAllProfile(): Promise<Profile[]> {
        try {
            return await this.profileRepository.getAllProfile();
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async getProfileById(id: number): Promise<Profile> {
        try {
            // const { role } = { ...userRoleDto };
            const user = await this.profileRepository.findProfileById(id);
            return user;
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

    async updateProfile(id: number, updateProfileDto: UpdateProfileDto): Promise<Profile> {
        try {
            if(await this.profileRepository.findProfileByEmailExcludeId(id, updateProfileDto.email)){
                throw new ConflictException("Email existed!!!");
            } else if(await this.profileRepository.findProfileByProfileNameExcludeId(id, updateProfileDto.username)){
                throw new ConflictException("Username existed!!!");
            }
            await this.profileRepository.updateProfileWithId(id, updateProfileDto);
            return await this.profileRepository.findProfileById(id);
        } catch (err) {
            ExceptionResponse(err)
        }
    }

    async deActivateProfile(profile_id: number): Promise<void> {
        try {
            await this.profileRepository.deActivateProfileById(profile_id);
        } catch (err) {
            ExceptionResponse(err)
        }
    }

    async activateProfile(profile_id: number): Promise<void> {
        try {
            await this.profileRepository.activateProfileById(profile_id);
        } catch (err) {
            ExceptionResponse(err)
        }
    }
}
