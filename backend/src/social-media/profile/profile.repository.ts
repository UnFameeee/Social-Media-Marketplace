import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Op } from "sequelize";
import { PROVIDER } from "src/common/constants/provider.constant";
import { Profile } from "../profile/model/profile.model";
import { CreateProfileDto } from "../../common/models/dtos/create-profile.dto";
import { UpdateProfileDto } from "src/common/models/dtos/update-profile.dto";
import { SCOPE } from "src/common/constants/sequelize-scope.constant";
@Injectable()
export class ProfileRepository {
    constructor(
        @Inject(PROVIDER.Profile) private profileRepository: typeof Profile
    ) { }

    async getAllProfile(): Promise<Profile[]> {
        try {
            return this.profileRepository.scope(SCOPE.WITHOUT_PASSWORD).findAll();
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async findProfileById(profile_id: number, scope?: string): Promise<Profile> {
        try {
            return this.profileRepository.scope(scope ? scope : SCOPE.WITHOUT_PASSWORD).findOne({ where: { profile_id: profile_id } })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async findProfileByEmail(email: string): Promise<Profile> {
        try {
            return this.profileRepository.findOne({ where: { email: email } })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async findProfileByProfileName(profile_name: string): Promise<Profile> {
        try {
            return this.profileRepository.findOne({ where: { profile_name: profile_name } })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async findProfileByProfileNameExcludeId(profile_id: number, profile_name: string): Promise<Profile> {
        try {
            return this.profileRepository.findOne({
                where:
                {
                    profile_id: { [Op.ne]: profile_id },
                    profile_name: profile_name
                }
            });
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async findProfileByEmailExcludeId(profile_id: number, email: string): Promise<Profile> {
        try {
            return this.profileRepository.findOne({
                where:
                {
                    profile_id: { [Op.ne]: profile_id },
                    email: email
                }
            });
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async createNewProfile(createUserDto: CreateProfileDto): Promise<Profile> {
        try {
            const user = { ...createUserDto };
            const newUser = await this.profileRepository.create(user);
            return await this.profileRepository.findOne({ where: { profile_id: newUser.profile_id } });
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    //Unfinished
    async updateProfileWithId(profile_id: number, updateUserDto: UpdateProfileDto): Promise<Profile> {
        try {
            const user = { ...updateUserDto };
            const newUser = await this.profileRepository.update(user, { where: { profile_id: profile_id } });
            return null;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
    
    async deActivateProfileById(profile_id: number) {
        try {
            await this.profileRepository.destroy({
                where: {
                    profile_id: profile_id
                }
            });
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async activateProfileById(profile_id: number) {
        try {
            await this.profileRepository.restore({
                where: {
                    profile_id: profile_id
                }
            });
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}
