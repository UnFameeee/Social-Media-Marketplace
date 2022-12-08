import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Op } from "sequelize";
import { PROVIDER } from "src/database/providers/provider.constant";
import { CreateProfileDto } from "../../../database/dtos/create-profile.dto";
import { UpdateProfileDto } from "src/database/dtos/update-profile.dto";
import { SCOPE } from "src/common/constants/sequelize-scope.constant";
import { paginate } from "src/common/utils/paginate.utils";
import { FriendshipRepository } from "./friendship.repository";
import { FRIENDSHIP_LIMIT } from "src/common/constants/friendship.constant";
import { Sequelize } from 'sequelize-typescript';
import { encode } from "src/common/utils/bcrypt-singleton.utils";
import { DescriptionRepository } from "./description.repository";
import { Profile } from "src/database/model/profile.model";
import { Page } from "src/database/view-model/page-model";
import { PagingData } from "src/database/view-model/paging.model";
import { ProfilePostImage } from "src/database/model/profile_post_image.model";
import { ProfileAvatarImage } from "src/database/model/profile_avatar_image.model";
import { ProfileWallpaperImage } from "src/database/model/profile_wallpaper_image.mode";
import { Description } from "src/database/model/description.model";
import { ShoppingCartRepository } from "src/marketplace/shopping_cart/repository/shopping_cart.repository";

@Injectable()
export class ProfileRepository {
    constructor(
        @Inject(PROVIDER.Profile) private profileRepository: typeof Profile,
        // @Inject(PROVIDER.Friendship) private friendshipModelRepository: typeof Friendship,
        @Inject(FriendshipRepository) private friendshipRepository: FriendshipRepository,
        @Inject(DescriptionRepository) private descriptionRepository: DescriptionRepository,
        @Inject(ShoppingCartRepository) private shoppingCartRepository: ShoppingCartRepository,
        // @Inject(PROVIDER.ProfileAvatarImage) private profileAvatarImageModelRepository: typeof ProfileAvatarImage,
        @Inject(PROVIDER.ProfilePostImage) private profilePostImageModelRepository: typeof ProfilePostImage,
        // @Inject(PROVIDER.ProfileWallpaperImage) private profileWallpaperImageModelRepository: typeof ProfileWallpaperImage,
    ) { }

    async getAllProfile(page: Page): Promise<PagingData<Profile[]>> {
        try {
            var result = new PagingData<Profile[]>();

            var queryData = await this.profileRepository.scope(SCOPE.WITHOUT_PASSWORD).findAndCountAll({
                attributes: ["profile_id", "profile_name", "email", "birth",
                    [Sequelize.col("profile_avatar.link"), "avatar"],
                    [Sequelize.col("profile_wallpaper.link"), "wallpaper"],
                    "isActivate", "createdAt", "updatedAt"
                ],
                include: [
                    {
                        model: ProfileAvatarImage,
                        as: "profile_avatar",
                        attributes: []
                    },
                    {
                        model: ProfileWallpaperImage,
                        as: "profile_wallpaper",
                        attributes: []
                    }
                ],
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
            return await this.profileRepository.scope(scope ? scope : SCOPE.WITHOUT_PASSWORD).findOne({
                attributes: ["profile_id", "profile_name", "email", "birth", [Sequelize.col("profile_avatar.link"), "avatar"], [Sequelize.col("profile_wallpaper.link"), "wallpaper"], "isActivate", "createdAt", "updatedAt"],
                include: [
                    {
                        model: ProfileAvatarImage,
                        as: "profile_avatar",
                        attributes: []
                    },
                    {
                        model: ProfileWallpaperImage,
                        as: "profile_wallpaper",
                        attributes: []
                    }
                ],
                where: { profile_id: profile_id }
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async findProfileRefreshById(profile_id: number): Promise<Profile> {
        try {
            return await this.profileRepository.scope().findOne({
                attributes: ["profile_id", "refreshToken"],
                where: { profile_id: profile_id }
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async findProfileByEmail(email: string, scope?: string): Promise<Profile> {
        try {
            return await this.profileRepository.scope(scope ? scope : SCOPE.WITHOUT_PASSWORD).findOne({
                attributes: ["profile_id", "profile_name", "password", "email", "birth",
                    [Sequelize.col("profile_avatar.link"), "avatar"],
                    [Sequelize.col("profile_wallpaper.link"), "wallpaper"],
                    "isActivate", "createdAt", "updatedAt"
                ],
                include: [
                    {
                        model: ProfileAvatarImage,
                        as: "profile_avatar",
                        attributes: []
                    },
                    {
                        model: ProfileWallpaperImage,
                        as: "profile_wallpaper",
                        attributes: []
                    }
                ],
                where: { email: email }
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async findProfileByProfileName(profile_name: string, scope?: string): Promise<Profile> {
        try {
            return await this.profileRepository.scope(scope ? scope : SCOPE.WITHOUT_PASSWORD).findOne({ where: { profile_name: profile_name } })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async findProfileByProfileNameExcludeId(profile_id: number, profile_name: string, scope?: string): Promise<Profile> {
        try {
            return await this.profileRepository.scope(scope ? scope : SCOPE.WITHOUT_PASSWORD).findOne({
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
            return await this.profileRepository.scope(scope ? scope : SCOPE.WITHOUT_PASSWORD).findOne({
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

            await this.descriptionRepository.createProfileDescription(newUser.profile_id);
            await this.shoppingCartRepository.createShoppingCart(newUser.profile_id);

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
            queryData.setDataValue("profile_name", updateUserDto.profile_name ? updateUserDto.profile_name : queryData["profile_name"]);
            queryData.setDataValue("password", updateUserDto.new_password ? await encode(updateUserDto.new_password) : queryData["password"]);
            queryData.setDataValue("email", updateUserDto.email ? updateUserDto.email : queryData["email"]);
            queryData.setDataValue("birth", updateUserDto.birth ? updateUserDto.birth : queryData["birth"]);

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
                pageSize: FRIENDSHIP_LIMIT.MAX_FRIEND
            }
            const friendList = await this.friendshipRepository.getAllFriend(profile_id, fullPage);

            var tempArr: number[] = [];
            for (const element of friendList.data) {
                tempArr.push(element["profile_id"]);
            }

            fullPage.pageSize = FRIENDSHIP_LIMIT.MAX_FRIEND_REQUEST;

            const friendRequestList = await this.friendshipRepository.getAllProfileIdSentRequest(profile_id);
            // tempArr.
            tempArr = [...tempArr, ...friendRequestList];
            // for (const element of friendRequestList) {
            //     tempArr.push(element["profile_id"]);
            // }

            tempArr.push(profile_id);

            var result = new PagingData<Profile[]>();

            var queryData = await this.profileRepository.scope(SCOPE.WITHOUT_PASSWORD).findAndCountAll({
                attributes: ["profile_id", "profile_name", "email", "birth",
                    [Sequelize.col("profile_avatar.link"), "avatar"],
                    [Sequelize.col("profile_wallpaper.link"), "wallpaper"],
                    "isActivate", "createdAt", "updatedAt"
                ],
                include: [
                    {
                        model: ProfileAvatarImage,
                        as: "profile_avatar",
                        attributes: []
                    },
                    {
                        model: ProfileWallpaperImage,
                        as: "profile_wallpaper",
                        attributes: []
                    }
                ],
                where: { profile_id: { [Op.notIn]: tempArr } },
                order: [
                    Sequelize.literal('rand()'),
                    // ['createdAt', 'DESC']
                ],
                raw: true,
                ...paginate({ page })
            });

            for (const element of queryData.rows) {
                const isSentFriendRequest = await this.friendshipRepository.isSentFriendRequest(profile_id, element.profile_id);
                element["isSentFriendRequest"] = isSentFriendRequest;
            }

            result.data = queryData.rows;
            page.totalElement = queryData.count;
            result.page = page;
            return result;

        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getProfileDetailById(profile_id: number, profile_target_id: number): Promise<Profile> {
        try {
            var queryData = await this.profileRepository.findOne({
                attributes: ["profile_id", "profile_name", "email", "birth",
                    [Sequelize.col("profile_avatar.link"), "avatar"],
                    [Sequelize.col("profile_wallpaper.link"), "wallpaper"],
                    "isActivate", "createdAt", "updatedAt"
                ],
                include: [
                    {
                        model: ProfileAvatarImage,
                        as: "profile_avatar",
                        attributes: []
                    },
                    {
                        model: ProfileWallpaperImage,
                        as: "profile_wallpaper",
                        attributes: []
                    },
                    {
                        model: Description,
                        as: "profile_description",
                        where: { profile_id: profile_target_id },
                        attributes: ["description", "school", "location", "career"],
                        required: false,
                    }
                ],
                where: { profile_id: profile_target_id },
                raw: false
            })


            if (queryData && profile_id != profile_target_id) {
                const isFriend = await this.friendshipRepository.isFriend(profile_id, profile_target_id);
                queryData.setDataValue("isFriend", isFriend);
                const isSentFriendRequest = await this.friendshipRepository.isSentFriendRequest(profile_id, profile_target_id);
                queryData.setDataValue("isSentFriendRequest", isSentFriendRequest);
                return queryData;
            } else if (queryData) {
                return queryData;
            }
            return null;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getPassword(profile_id: number): Promise<string> {
        try {
            var queryData = await this.profileRepository.scope(SCOPE.WITH_PASSWORD).findOne({
                attributes: ["password"],
                where: { profile_id: profile_id },
            })
            return queryData.password;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async updateRefreshToken(profile_id: number, hashedRefreshToken: string): Promise<any> {
        try {
            var queryData = await this.profileRepository.scope(SCOPE.WITH_PASSWORD).findOne({
                attributes: ["profile_id", "password", "refreshToken"],
                where: { profile_id: profile_id },
            })
            queryData.refreshToken = hashedRefreshToken;
            await queryData.save();
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async deleteRefreshToken(profile_id: number): Promise<boolean> {
        try {
            var queryData = await this.profileRepository.scope(SCOPE.WITH_PASSWORD).findOne({
                attributes: ["profile_id", "password", "refreshToken"],
                where: { profile_id: profile_id },
            })
            queryData.refreshToken = null;
            const profile = await queryData.save();
            return profile.refreshToken ? false : true;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getProfileGalleryById(profile_id: number, page: Page): Promise<PagingData<ProfilePostImage[]>> {
        try {
            var result = new PagingData<ProfilePostImage[]>();
            const queryData = await this.profilePostImageModelRepository.findAndCountAll({
                attributes: ["link"],
                where: {
                    profile_id: profile_id,
                    link: { [Op.not]: null }
                },
                order: [
                    ['createdAt', 'DESC']
                ],
                raw: false,
                ...paginate({ page })
            })
            result.data = queryData.rows;
            page.totalElement = queryData.count;
            result.page = page;
            return result;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async searchProfile(profile_id: number, profile_name: string, page: Page): Promise<PagingData<Profile[]>> {
        try {
            var result = new PagingData<Profile[]>();

            var queryData = await this.profileRepository.scope(SCOPE.WITHOUT_PASSWORD).findAndCountAll({
                where: {
                    profile_name: {
                        [Op.substring]: profile_name,
                    },
                    profile_id: {
                        [Op.ne]: profile_id
                    },
                },
                attributes: ["profile_id", "profile_name", "email", "birth",
                    [Sequelize.col("profile_avatar.link"), "avatar"],
                    [Sequelize.col("profile_wallpaper.link"), "wallpaper"],
                    "isActivate", "createdAt", "updatedAt"
                ],
                include: [
                    {
                        model: ProfileAvatarImage,
                        as: "profile_avatar",
                        attributes: []
                    },
                    {
                        model: ProfileWallpaperImage,
                        as: "profile_wallpaper",
                        attributes: []
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ],
                raw: false,
                ...paginate({ page })
            });



            if (queryData) {
                for (const element of queryData.rows) {
                    const isFriend = await this.friendshipRepository.isFriend(profile_id, element["profile_id"]);
                    element.setDataValue("isFriend", isFriend);
                    const isSentFriendRequest = await this.friendshipRepository.isSentFriendRequest(profile_id, element["profile_id"]);
                    element.setDataValue("isSentFriendRequest", isSentFriendRequest);
                }
                result.data = queryData.rows;
                page.totalElement = queryData.count;
                result.page = page;
                return result;
            }
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}
