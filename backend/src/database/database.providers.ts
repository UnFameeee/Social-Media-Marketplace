
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { DB_TYPE } from '../common/constants/database.constant';
import * as mysql from "mysql2";
import { Logger } from '@nestjs/common';
import { Profile } from 'src/social-media/profile/model/profile.model';
import { Friendship } from 'src/social-media/profile/model/friendship.model';
import { Post } from 'src/social-media/post/model/post.model';
import { PostComment } from 'src/social-media/post/model/post-comment.model';
import { PostLike } from 'src/social-media/post/model/post-like.model';
import { ProfileAvatarImage } from 'src/social-media/image/model/profile_avatar_image.model';
import { Description } from 'src/social-media/profile/model/description.model';
import { ChatRoom } from '../social-media/message/model/room.model';
import { ChatJoinedRoom } from 'src/social-media/message/model/joined_room.model';
import { ChatMessage } from 'src/social-media/message/model/message.model';
import { ChatConnectedProfile } from './../social-media/message/model/connected.model';
import { ProfileWallpaperImage } from 'src/social-media/image/model/profile_wallpaper_image.mode';
import { ProfilePostImage } from 'src/social-media/image/model/profile_post_image.model';
import { RoomImage } from 'src/social-media/image/model/room_image';

export const databaseProviders = [
    {
        imports: [ConfigModule],

        inject: [ConfigService],
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize({
                dialect: DB_TYPE.MYSQL,
                host: configService.get('MYSQL_HOST'),
                port: configService.get('MYSQL_PORT'),
                username: configService.get('MYSQL_USER'),
                password: configService.get('MYSQL_PASSWORD'),
                database: configService.get('MYSQL_DB'),
                // query: { raw: true },
                pool: {
                    // Never have more than five open connections (max: 5)
                    max: 5,
                    // At a minimum, have zero open connections/maintain no minimum number of connections (min: 0)
                    min: 0,
                    acquire: 30000,
                    // Remove a connection from the pool after the connection has been idle (not been used) for 10 seconds (idle: 10000)
                    idle: 10000
                },
            });

            // sequelize.options
            sequelize.addModels([Profile, Friendship, Post, PostLike, PostComment, ProfileAvatarImage, ProfilePostImage, ProfileWallpaperImage, Description, ChatRoom, ChatConnectedProfile, ChatJoinedRoom, ChatMessage, RoomImage]);
            //associations
            Profile.hasMany(Friendship, { foreignKey: { name: "profile_request", field: "profile_request" } });
            Friendship.belongsTo(Profile, { foreignKey: { name: "profile_request", field: "profile_request" }, as: "profile_request_id" })
            Profile.hasMany(Friendship, { foreignKey: { name: "profile_target", field: "profile_target" }});
            Friendship.belongsTo(Profile, { foreignKey: { name: "profile_target", field: "profile_target" }, as: "profile_target_id" })

            Profile.hasMany(Post, { foreignKey: { name: "profile_id", field: "profile_id" } });
            Post.belongsTo(Profile, { foreignKey: { name: "profile_id", field: "profile_id" } });

            Profile.hasMany(PostComment, { foreignKey: { name: "profile_id", field: "profile_id" } });
            PostComment.belongsTo(Profile, { foreignKey: { name: "profile_id", field: "profile_id" } })
            Post.hasMany(PostComment, { foreignKey: { name: "post_id", field: "post_id" } });
            PostComment.belongsTo(Post, { foreignKey: { name: "post_id", field: "post_id" } })

            Profile.hasMany(PostLike, { foreignKey: { name: "profile_id", field: "profile_id" } });
            PostLike.belongsTo(Profile, { foreignKey: { name: "profile_id", field: "profile_id" } })
            Post.hasMany(PostLike, { foreignKey: { name: "post_id", field: "post_id" } });
            PostLike.belongsTo(Post, { foreignKey: { name: "post_id", field: "post_id" } });


            Profile.hasOne(ProfileWallpaperImage, { foreignKey: { name: "profile_id", field: "profile_id" }, as: "profile_wallpaper" });
            ProfileWallpaperImage.belongsTo(Profile, { foreignKey: { name: "profile_id", field: "profile_id" } });

            Profile.hasOne(ProfileAvatarImage, { foreignKey: { name: "profile_id", field: "profile_id" } , as: "profile_avatar"});
            ProfileAvatarImage.belongsTo(Profile, { foreignKey: { name: "profile_id", field: "profile_id" } });

            Profile.hasOne(Description, { foreignKey: { name: "profile_id", field: "profile_id" }, as: "profile_description" });
            Description.belongsTo(Profile, { foreignKey: { name: "profile_id", field: "profile_id" } });


            Post.hasMany(ProfilePostImage, { foreignKey: { name: "post_id", field: "post_id" } , as: "post_image"});
            ProfilePostImage.belongsTo(Post, { foreignKey: { name: "post_id", field: "post_id" } });

            Profile.hasMany(ChatConnectedProfile, { foreignKey: { name: "profile_id", field: "profile_id" } });
            ChatConnectedProfile.belongsTo(Profile, { foreignKey: { name: "profile_id", field: "profile_id" } });


            ChatConnectedProfile.hasMany(ChatJoinedRoom, { foreignKey: { name: "connected_profile_id", field: "connected_profile_id" } });
            ChatJoinedRoom.belongsTo(ChatConnectedProfile, { foreignKey: { name: "connected_profile_id", field: "connected_profile_id" } });

            ChatRoom.hasMany(ChatJoinedRoom, { foreignKey: { name: "room_id", field: "room_id" } });
            ChatJoinedRoom.belongsTo(ChatRoom, { foreignKey: { name: "room_id", field: "room_id" } });

            ChatConnectedProfile.hasMany(ChatMessage, { foreignKey: { name: "connected_profile_id", field: "connected_profile_id" } });
            ChatMessage.belongsTo(ChatConnectedProfile, { foreignKey: { name: "connected_profile_id", field: "connected_profile_id" } });

            ChatRoom.hasMany(ChatMessage, { foreignKey: { name: "room_id", field: "room_id" } });
            ChatMessage.belongsTo(ChatRoom, { foreignKey: { name: "room_id", field: "room_id" } });

            ChatRoom.hasMany(RoomImage, { foreignKey: { name: "room_id", field: "room_id" } });
            RoomImage.belongsTo(ChatRoom, { foreignKey: { name: "room_id", field: "room_id" } });

            // ChatRoom.hasMany(ChatConnectedProfile, { foreignKey: { name: "room_id", field: "room_id" } });
            // ChatConnectedProfile.belongsToMany(ChatRoom, { through: ChatJoinedRoom });


            //initiate database
            const connection = mysql.createConnection({
                host: configService.get('MYSQL_HOST'),
                user: configService.get('MYSQL_USER'),
                password: configService.get('MYSQL_PASSWORD'),
            });
            connection.query(
                `CREATE DATABASE IF NOT EXISTS \`${configService.get('MYSQL_DB')}\`;`,
                async (err, results) => {
                    results ? console.log(`Connect to Database ${configService.get('MYSQL_DB')} complete!`) : console.log(err);
                    try {
                        await sequelize.sync({ alter: false, force: false })
                        await sequelize.authenticate();
                    } catch (err) {
                        // throw err;
                        Logger.error(
                            `${err.parent.sqlMessage}`, JSON.stringify(err.parent) || null, 'Database Sync Exception Filter',
                        );
                    }
                }
            );
            connection.end();
            return sequelize;
        },
    },
];