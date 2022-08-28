
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
                query: { raw: true },
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
            sequelize.addModels([Profile, Friendship, Post, PostLike, PostComment]);
            //associations
            Profile.hasMany(Friendship, { foreignKey: "profile_request"});
            Profile.hasMany(Friendship, { foreignKey: "profile_target"});

            Profile.hasMany(Post, { foreignKey: "profile_id"});
            
            Profile.hasMany(PostComment, { foreignKey: "profile_id"});
            Post.hasMany(PostComment, { foreignKey: "post_id"});

            Profile.hasMany(PostLike, { foreignKey: "profile_id"});
            Post.hasMany(PostLike, { foreignKey: "post_id"});

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