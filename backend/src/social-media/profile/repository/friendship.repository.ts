import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PROVIDER } from 'src/database/providers/provider.constant';
import { paginate } from "src/common/utils/paginate.utils";
import { Sequelize } from "sequelize-typescript";
import { FRIENDREQUEST_STATUS, FRIENDSHIP_STATUS } from "src/common/constants/friendship.constant";
import { Op } from "sequelize";
import { PagingData } from "src/database/view-model/paging.model";
import { Friendship } from "src/database/model/friendship.model";
import { Page } from "src/database/view-model/page-model";
import { Profile } from "src/database/model/profile.model";
import { ProfileAvatarImage } from "src/database/model/profile_avatar_image.model";
import { ProfileWallpaperImage } from "src/database/model/profile_wallpaper_image.mode";
import { FriendshipEntity } from "src/database/entity/friendship";

@Injectable()
export class FriendshipRepository {
    constructor(
        @Inject(PROVIDER.Friendship) private friendshipRepository: typeof Friendship,
    ) { }

    async getAllFriendRequest(profile_id: number, page: Page): Promise<PagingData<Friendship[]>> {
        try {
            var result = new PagingData<Friendship[]>();
            var queryData = await this.friendshipRepository.findAndCountAll({
                where: { status: FRIENDSHIP_STATUS.PENDING },
                attributes: ["id", "status", "createdAt",
                    "profile_request", "profile_target",
                    [Sequelize.col("profile_request_id.profile_name"), "profile_name"],
                    [Sequelize.col("profile_request_id.profile_avatar.link"), "avatar"],
                    [Sequelize.col("profile_request_id.profile_wallpaper.link"), "wallpaper"]
                ],
                include: [
                    {
                        model: Profile,
                        as: "profile_target_id",
                        where: { profile_id: profile_id },
                        attributes: [],
                    },
                    {
                        model: Profile,
                        as: "profile_request_id",
                        attributes: ["profile_id"],
                        include: [
                            {
                                model: ProfileAvatarImage,
                                as: "profile_avatar",
                                attributes: ["link"]
                            },
                            {
                                model: ProfileWallpaperImage,
                                as: "profile_wallpaper",
                                attributes: ["link"]
                            }
                        ]
                    },
                ],
                order: [
                    ['createdAt', 'DESC']
                ],
                raw: true,
                nest: true,
                ...paginate({ page })
            })

            for (const element of queryData.rows) {
                var mutualFriend = await this.getMutualFriend(profile_id, element["profile_request"]);
                // element.setDataValue("mutualFriend", mutualFriend);
                element["mutualFriend"] = mutualFriend;
                element["profile_id"] = element["profile_request"];
                delete element["profile_target"];
                delete element["profile_request"];
                delete element["profile_request_id"];
            }

            result.data = queryData.rows;
            page.totalElement = queryData.count;
            result.page = page;
            return result;
        }
        catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getAllFriend(profile_id: number, page: Page): Promise<PagingData<Friendship[]>> {
        try {
            var result = new PagingData<Friendship[]>();
            var queryData = await this.friendshipRepository.findAndCountAll({
                where: {
                    status: FRIENDSHIP_STATUS.ACCEPTED,
                    [Op.or]: [
                        { "$profile_request_id.profile_id$": profile_id },
                        { "$profile_target_id.profile_id$": profile_id }
                    ],
                },
                attributes: ["id", "status", "createdAt",
                    "profile_target",
                    [Sequelize.col("profile_target_id.profile_name"), "profile_target_name"],
                    [Sequelize.col("profile_target_id.profile_avatar.link"), "profile_target_avatar"],
                    [Sequelize.col("profile_target_id.profile_wallpaper.link"), "profile_target_wallpaper"],
                    "profile_request",
                    [Sequelize.col("profile_request_id.profile_name"), "profile_request_name"],
                    [Sequelize.col("profile_request_id.profile_avatar.link"), "profile_request_avatar"],
                    [Sequelize.col("profile_request_id.profile_wallpaper.link"), "profile_request_wallpaper"],
                ],
                include: [
                    {
                        model: Profile,
                        as: "profile_request_id",
                        required: true,
                        attributes: [
                            "profile_id",
                        ],
                        include: [
                            {
                                model: ProfileAvatarImage,
                                as: "profile_avatar",
                                attributes: ["link"]
                            },
                            {
                                model: ProfileWallpaperImage,
                                as: "profile_wallpaper",
                                attributes: ["link"]
                            }
                        ],
                    },
                    {
                        model: Profile,
                        as: "profile_target_id",
                        required: true,
                        attributes: [
                            "profile_id",
                        ],
                        include: [
                            {
                                model: ProfileAvatarImage,
                                as: "profile_avatar",
                                attributes: ["link"]
                            },
                            {
                                model: ProfileWallpaperImage,
                                as: "profile_wallpaper",
                                attributes: ["link"]
                            }
                        ],
                    }
                ],

                order: [
                    ['createdAt', 'DESC']
                ],
                raw: true,
                nest: true,
                ...paginate({ page })
            })

            for (const element of queryData.rows) {
                if (element["profile_target"] == profile_id) {
                    var mutualFriend = await this.getMutualFriend(profile_id, element["profile_request"]);
                    // element.setDataValue("mutualFriend", mutualFriend);
                    element["mutualFriend"] = mutualFriend;

                    element["profile_id"] = element["profile_request"];
                    element["profile_name"] = element["profile_request_name"];
                    element["avatar"] = element["profile_request_avatar"];
                    element["wallpaper"] = element["profile_request_wallpaper"];
                } else {
                    var mutualFriend = await this.getMutualFriend(profile_id, element["profile_target"]);
                    // element.setDataValue("mutualFriend", mutualFriend);
                    element["mutualFriend"] = mutualFriend;

                    element["profile_id"] = element["profile_target"];
                    element["profile_name"] = element["profile_target_name"];
                    element["avatar"] = element["profile_target_avatar"];
                    element["wallpaper"] = element["profile_target_wallpaper"];
                }

                delete element["profile_target"];
                delete element["profile_target_name"];
                delete element["profile_target_avatar"];
                delete element["profile_target_wallpaper"];
                delete element["profile_target_id"];
                delete element["profile_request"];
                delete element["profile_request_name"];
                delete element["profile_request_avatar"];
                delete element["profile_request_wallpaper"];
                delete element["profile_request_id"];
            }

            result.data = queryData.rows;
            page.totalElement = queryData.count;
            result.page = page;
            return result;
        }
        catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async sendFriendRequest(profile_id: number, profile_target_id: number): Promise<boolean> {
        try {
            var model = new FriendshipEntity();
            model.profile_request = profile_id;
            model.profile_target = profile_target_id;
            var recentModified: Friendship;

            if (profile_id != profile_target_id && !await this.isFriend(profile_id, profile_target_id)) {
                var queryData = await this.friendshipRepository.findOne({
                    where: {
                        status: FRIENDSHIP_STATUS.PENDING,
                        [Op.or]: [
                            {
                                [Op.and]: [{ "$profile_request_id.profile_id$": profile_id }, { "$profile_target_id.profile_id$": profile_target_id }],
                            },
                            {
                                [Op.and]: [{ "$profile_request_id.profile_id$": profile_target_id }, { "$profile_target_id.profile_id$": profile_id }],
                            }
                        ]
                    },
                    attributes: ["id", "status", "createdAt",
                        "profile_target",
                        [Sequelize.col("profile_target_id.profile_name"), "profile_target_name"],
                        "profile_request",
                        [Sequelize.col("profile_request_id.profile_name"), "profile_request_name"],
                    ],
                    include: [
                        {
                            model: Profile,
                            as: "profile_request_id",
                            attributes: []
                        },
                        {
                            model: Profile,
                            as: "profile_target_id",
                            attributes: []
                        }
                    ],
                    raw: true,
                })

                if (!queryData) {
                    model.status = FRIENDSHIP_STATUS.PENDING;
                    var res = await this.friendshipRepository.create(model);
                    recentModified = await this.friendshipRepository.findOne({
                        where: {
                            id: res.id
                        }
                    })
                } else {
                    if (queryData["profile_target"] == profile_target_id) {
                        await this.friendshipRepository.destroy({
                            where: {
                                id: queryData.id
                            },
                            force: true
                        });
                        recentModified = await this.friendshipRepository.findOne({
                            where: {
                                id: queryData.id,
                            }
                        })
                    }
                }
                return recentModified ? true : false;
            } else return false;


        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async unfriend(profile_id: number, profile_target_id: number): Promise<boolean> {
        try {
            var model = new FriendshipEntity();
            model.profile_request = profile_id;
            model.profile_target = profile_target_id;
            var recentModified: Friendship;
            var queryData = await this.friendshipRepository.findOne({
                where: {
                    status: FRIENDSHIP_STATUS.ACCEPTED,
                    [Op.or]: [
                        {
                            [Op.and]: [{ "$profile_request_id.profile_id$": profile_id }, { "$profile_target_id.profile_id$": profile_target_id }],
                        },
                        {
                            [Op.and]: [{ "$profile_request_id.profile_id$": profile_target_id }, { "$profile_target_id.profile_id$": profile_id }],
                        }
                    ]
                },
                attributes: ["id", "status", "createdAt", "profile_target",
                    [Sequelize.col("profile_target_id.profile_name"), "profile_target_name"],
                    "profile_request",
                    [Sequelize.col("profile_request_id.profile_name"), "profile_request_name"],
                ],
                include: [
                    {
                        model: Profile,
                        as: "profile_request_id",
                        attributes: []
                    },
                    {
                        model: Profile,
                        as: "profile_target_id",
                        attributes: []
                    }
                ],
                raw: false,
            })
            if (queryData) {
                queryData.status = FRIENDSHIP_STATUS.REMOVED;
                await queryData.save();
                await this.friendshipRepository.destroy({
                    where: {
                        id: queryData.id
                    },
                });
                recentModified = await this.friendshipRepository.findOne({
                    where: {
                        id: queryData.id,
                    }
                })
            } else return false;
            return recentModified ? false : true;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async isSentFriendRequest(profile_id: number, profile_target_id: number): Promise<string> {
        var queryData = await this.friendshipRepository.findOne({
            where: {
                status: FRIENDSHIP_STATUS.PENDING,
                [Op.or]: [
                    {
                        [Op.and]: [{ "$profile_request_id.profile_id$": profile_id }, { "$profile_target_id.profile_id$": profile_target_id }],
                    },
                    {
                        [Op.and]: [{ "$profile_request_id.profile_id$": profile_target_id }, { "$profile_target_id.profile_id$": profile_id }],
                    }
                ]
            },
            attributes: ["id", "status", "createdAt", "profile_target",
                [Sequelize.col("profile_target_id.profile_name"), "profile_target_name"],
                "profile_request",
                [Sequelize.col("profile_request_id.profile_name"), "profile_request_name"],
            ],
            include: [
                {
                    model: Profile,
                    as: "profile_request_id",
                    attributes: []
                },
                {
                    model: Profile,
                    as: "profile_target_id",
                    attributes: []
                }
            ],
            raw: true,
        })
        if (queryData) {
            if (queryData["profile_request"] == profile_id) {
                return FRIENDREQUEST_STATUS.REQUEST;
            } else {
                return FRIENDREQUEST_STATUS.TARGET;
            }
        }
        else return FRIENDREQUEST_STATUS.NONE;
    }

    //Only get ID
    async getAllProfileIdSentRequest(profile_id: number): Promise<number[]> {
        var queryData = await this.friendshipRepository.findAll({
            where: {
                status: FRIENDSHIP_STATUS.PENDING,
                [Op.or]: [{ "$profile_request_id.profile_id$": profile_id }, { "$profile_target_id.profile_id$": profile_id }],
            },
            attributes: ["id", "status", "createdAt", "profile_target", "profile_request",
            ],
            include: [
                {
                    model: Profile,
                    as: "profile_request_id",
                    attributes: [],
                },
                {
                    model: Profile,
                    as: "profile_target_id",
                    attributes: []
                }
            ],
            raw: true,
        })
        var resultArr: number[] = [];

        if (queryData) {
            for (const element of queryData) {
                if (element["profile_request"] == profile_id) {
                    resultArr.push(element["profile_target"])
                } else {
                    resultArr.push(element["profile_request"])
                }
            }
        }
        return resultArr;
    }

    async getAllProfileSentRequest(profile_id: number, page: Page): Promise<PagingData<Friendship[]>> {
        try {
            var result = new PagingData<Friendship[]>();
            var queryData = await this.friendshipRepository.findAndCountAll({
                where: {
                    status: FRIENDSHIP_STATUS.PENDING,
                    "$profile_request_id.profile_id$": profile_id
                    // [Op.or]: [
                    //     {  }, 
                    //     { "$profile_target_id.profile_id$": profile_id }
                    // ],
                },
                attributes: ["id", "status", "createdAt", "profile_target",
                    // [Sequelize.col("profile_request_id.profile_name"), "profile_request_name"],
                    // [Sequelize.col("profile_request_id.profile_avatar.link"), "profile_request_avatar"],
                    [Sequelize.col("profile_target_id.profile_name"), "profile_target_name"],
                    [Sequelize.col("profile_target_id.profile_avatar.link"), "profile_target_avatar"],
                ],
                include: [
                    {
                        model: Profile,
                        as: "profile_request_id",
                        attributes: [],
                        include: [
                            {
                                model: ProfileAvatarImage,
                                as: "profile_avatar",
                                attributes: ["link"]
                            },
                        ]
                    },
                    {
                        model: Profile,
                        as: "profile_target_id",
                        attributes: [],
                        include: [
                            {
                                model: ProfileAvatarImage,
                                as: "profile_avatar",
                                attributes: ["link"]
                            },
                        ]
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ],
                raw: true,
                nest: true,
                ...paginate({ page })
            })

            if (queryData) {
                for (const element of queryData.rows) {
                    const isFriend = await this.isFriend(profile_id, element["profile_target"]);
                    const isSentFriendRequest = await this.isSentFriendRequest(profile_id, element["profile_target"]);
                    element["isFriend"] = isFriend;
                    element["isSentFriendRequest"] = isSentFriendRequest;

                    element["profile_id"] = element["profile_target"];
                    element["profile_name"] = element["profile_target_name"];
                    element["avatar"] = element["profile_target_avatar"];

                    delete element["profile_target"];
                    delete element["profile_target_name"];
                    delete element["profile_target_avatar"];
                    delete element["profile_request_id"];
                    delete element["profile_target_id"];
                }
            }

            result.data = queryData.rows;
            page.totalElement = queryData.count;
            result.page = page;
            return result;
        }
        catch(err){
            throw new InternalServerErrorException(err.message);
        }
    }


    async acceptFriendRequest(profile_id: number, profile_request_id: number): Promise<boolean> {
        try {
            var queryData = await this.friendshipRepository.findOne({
                where: {
                    status: FRIENDSHIP_STATUS.PENDING
                },
                include: [
                    {
                        model: Profile,
                        as: "profile_request_id",
                        where: { profile_id: profile_request_id },
                        attributes: []
                    },
                    {
                        model: Profile,
                        as: "profile_target_id",
                        where: { profile_id: profile_id },
                        attributes: []
                    }
                ],
            })
            var res: any;
            if (queryData) {
                queryData.status = FRIENDSHIP_STATUS.ACCEPTED;
                res = await queryData.save();
            }
            //If no friend request
            else return false;

            return res ? true : false;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async denyFriendRequest(profile_id: number, profile_request_id: number): Promise<boolean> {
        try {
            var queryData = await this.friendshipRepository.findOne({
                where: {
                    status: FRIENDSHIP_STATUS.PENDING
                },
                include: [
                    {
                        model: Profile,
                        as: "profile_request_id",
                        where: { profile_id: profile_request_id },
                        attributes: []
                    },
                    {
                        model: Profile,
                        as: "profile_target_id",
                        where: { profile_id: profile_id },
                        attributes: []
                    }
                ],
            })
            var res: any;
            if (queryData) {
                queryData.status = FRIENDSHIP_STATUS.REMOVED;
                await queryData.save();
                await queryData.destroy();
                res = this.friendshipRepository.findOne({
                    where: { id: queryData.id }
                })
            }
            //If no friend request
            else return false;

            return res ? false : true;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getMutualFriend(profile_id: number, profile_target_id: number): Promise<number> {
        try {
            var profile_request_friend = await this.friendshipRepository.findAll({
                attributes: [[Sequelize.col("profile_target_id.profile_id"), "profile_target"], [Sequelize.col("profile_request_id.profile_id"), "profile_request"]],
                where: {
                    status: FRIENDSHIP_STATUS.ACCEPTED,
                    [Op.or]: [{ "$profile_request_id.profile_id$": profile_id }, { "$profile_target_id.profile_id$": profile_id }],
                },
                include: [
                    {
                        model: Profile,
                        as: "profile_request_id",
                        attributes: []
                    },
                    {
                        model: Profile,
                        as: "profile_target_id",
                        attributes: []
                    },
                ],
            })


            var profile_target_friend = await this.friendshipRepository.findAll({
                attributes: [[Sequelize.col("profile_target_id.profile_id"), "profile_target"], [Sequelize.col("profile_request_id.profile_id"), "profile_request"]],
                where: {
                    status: FRIENDSHIP_STATUS.ACCEPTED,
                    [Op.or]: [{ "$profile_request_id.profile_id$": profile_target_id }, { "$profile_target_id.profile_id$": profile_target_id }],
                },
                include: [
                    {
                        model: Profile,
                        as: "profile_request_id",
                        attributes: []
                    },
                    {
                        model: Profile,
                        as: "profile_target_id",
                        attributes: []
                    },
                ],
            })

            var profile_request_friend_array: any[] = [];
            var profile_target_friend_array: any[] = [];

            for (const x of profile_request_friend) {
                if (x["profile_target"] == profile_id) {
                    profile_request_friend_array.push(x["profile_request"]);
                } else if (x["profile_request"] == profile_id) {
                    profile_request_friend_array.push(x["profile_target"]);
                }
            }
            for (const x of profile_target_friend) {
                if (x["profile_target"] == profile_target_id) {
                    profile_target_friend_array.push(x["profile_request"]);
                } else if (x["profile_request"] == profile_target_id) {
                    profile_target_friend_array.push(x["profile_target"]);
                }
            }

            var res: number = 0;

            for (const x of profile_target_friend_array) {
                if (profile_request_friend_array.find(element => element == x) != undefined) {
                    res++;
                }
            }

            return res;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }


    async isFriend(profile_id: number, profile_target_id: number): Promise<boolean> {
        try {
            var queryData = await this.friendshipRepository.findOne({
                where: {
                    status: FRIENDSHIP_STATUS.ACCEPTED,
                    [Op.or]: [
                        {
                            [Op.and]: [{ "$profile_request_id.profile_id$": profile_id }, { "$profile_target_id.profile_id$": profile_target_id }],
                        },
                        {
                            [Op.and]: [{ "$profile_request_id.profile_id$": profile_target_id }, { "$profile_target_id.profile_id$": profile_id }],
                        }
                    ]
                },
                include: [
                    {
                        model: Profile,
                        as: "profile_request_id",
                        attributes: []
                    },
                    {
                        model: Profile,
                        as: "profile_target_id",
                        attributes: []
                    }
                ],
            })
            return queryData ? true : false;

        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}