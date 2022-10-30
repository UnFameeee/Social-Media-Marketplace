import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Op } from "sequelize";
import { PROVIDER } from "src/common/constants/provider.constant";
import { Profile } from "../model/profile.model";
import { CreateProfileDto } from "../../../common/models/dtos/create-profile.dto";
import { UpdateProfileDto } from "src/common/models/dtos/update-profile.dto";
import { SCOPE } from "src/common/constants/sequelize-scope.constant";
import { PagingData } from "src/common/models/view-model/paging.model";
import { Page } from "src/common/models/view-model/page-model";
import { paginate } from "src/common/utils/paginate.utils";
import { FriendshipRepository } from "./friendship.repository";
import { Friendship } from "../model/friendship.model";
import { FRIENDSHIP_LIMIT } from "src/common/constants/friendship.constant";
import { Sequelize } from 'sequelize-typescript';
@Injectable()
export class ProfileRepository {
    constructor(
        @Inject(PROVIDER.Profile) private profileRepository: typeof Profile,
        @Inject(PROVIDER.Friendship) private friendshipModelRepository: typeof Friendship,
        @Inject(FriendshipRepository) private friendshipRepository: FriendshipRepository
    ) { }

    async getAllProfile(page: Page): Promise<PagingData<Profile[]>> {
        try {
            var result = new PagingData<Profile[]>();

            var queryData = await this.profileRepository.scope(SCOPE.WITHOUT_PASSWORD).findAndCountAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                raw: false,
                ...paginate({ page })
            });

            result.data = queryData.rows;
            page.totalElement = queryData.count;
            result.page = page;
            return result;
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

    async findProfileByEmail(email: string, scope?: string): Promise<Profile> {
        try {
            return this.profileRepository.scope(scope ? scope : SCOPE.WITHOUT_PASSWORD).findOne({ where: { email: email } })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async findProfileByProfileName(profile_name: string, scope?: string): Promise<Profile> {
        try {
            return this.profileRepository.scope(scope ? scope : SCOPE.WITHOUT_PASSWORD).findOne({ where: { profile_name: profile_name } })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async findProfileByProfileNameExcludeId(profile_id: number, profile_name: string, scope?: string): Promise<Profile> {
        try {
            return this.profileRepository.scope(scope ? scope : SCOPE.WITHOUT_PASSWORD).findOne({
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

    async findProfileByEmailExcludeId(profile_id: number, email: string, scope?: string): Promise<Profile> {
        try {
            return this.profileRepository.scope(scope ? scope : SCOPE.WITHOUT_PASSWORD).findOne({
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

    async updateProfileWithId(profile_id: number, updateUserDto: UpdateProfileDto): Promise<boolean> {
        try {
            var queryData = await this.profileRepository.findOne({
                where: {
                    profile_id: profile_id
                }
            });
            queryData.setDataValue("profile_name", updateUserDto.profile_name);
            queryData.setDataValue("password", updateUserDto.new_password);
            queryData.setDataValue("email", updateUserDto.email);
            queryData.setDataValue("birth", updateUserDto.birth);

            const res = await queryData.save();
            return res ? true : false;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async deActivateProfileById(profile_id: number): Promise<boolean> {
        try {
            await this.profileRepository.destroy({
                where: {
                    profile_id: profile_id
                }
            });
            const checkData = await this.profileRepository.findOne({
                where: { profile_id: profile_id }
            });
            return checkData ? false : true;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async activateProfileById(profile_id: number): Promise<boolean> {
        try {
            await this.profileRepository.restore({
                where: {
                    profile_id: profile_id
                }
            });
            const checkData = await this.profileRepository.findOne({
                where: { profile_id: profile_id }
            });
            return checkData ? true : false;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async friendSuggestion(profile_id: number, page: Page): Promise<PagingData<Profile[]>> {
        try {
            const fullPage: Page = {
                page: 0,
                pageSize: FRIENDSHIP_LIMIT.MAX
            }
            const friendList = await this.friendshipRepository.getAllFriend(profile_id, fullPage);

            var tempArr: number[] = [];
            for (const element of friendList.data) {
                tempArr.push(element["profile_id"]);
            }

            var result = new PagingData<Profile[]>();

            var queryData = await this.profileRepository.scope(SCOPE.WITHOUT_PASSWORD).findAndCountAll({
                where: { profile_id: { [Op.notIn]: tempArr } },
                order: [
                    Sequelize.literal('rand()'),
                    // ['createdAt', 'DESC']
                ],
                raw: true,
                ...paginate({ page })
            });

            result.data = queryData.rows;
            page.totalElement = queryData.count;
            result.page = page;
            return result;

        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}
