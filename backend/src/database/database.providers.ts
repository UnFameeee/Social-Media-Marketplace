
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { DB_TYPE } from '../common/constants/database.constant';
import * as mysql from "mysql2";
import { Logger } from '@nestjs/common';
import { ChatRoom } from '../social-media/message/model/room.model';
import { ChatJoinedRoom } from 'src/social-media/message/model/joined_room.model';
import { ChatMessage } from 'src/social-media/message/model/message.model';
import { ChatConnectedProfile } from './../social-media/message/model/connected.model';
import { RoomImage } from './model/room_image';
import { Profile } from './model/profile.model';
import { Friendship } from './model/friendship.model';
import { Post } from './model/post.model';
import { PostLike } from './model/post-like.model';
import { PostComment } from './model/post-comment.model';
import { ParentChildComment } from './model/parent_child_comment.model';
import { ProfileAvatarImage } from './model/profile_avatar_image.model';
import { ProfilePostImage } from './model/profile_post_image.model';
import { ProfileWallpaperImage } from './model/profile_wallpaper_image.mode';
import { Description } from './model/description.model';
import { ShippingAddress } from './model/shipping_address.model';
import { ShopOrder } from './model/shop_order.model';
import { ShoppingCart } from './model/shopping_cart.model';
import { ShoppingCartItem } from './model/shopping_cart_item.model';
import { PaymentMethod } from './model/payment_method.model';
import { OrderLine } from './model/order_line.model';
import { Product } from './model/product.model';
import { ProductImage } from './model/product_image.model';
import { Category } from './model/category.model';
import { SubCategory } from './model/sub_category.model';
import { ShopAddress } from './model/shop_address.model';
import { Variation } from './model/variation.model';
import { PostCommentLike } from './model/post-comment-like.model';
import { Notification } from './model/notification.model';

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
            sequelize.addModels([
                Profile, Friendship, Post, PostLike, PostComment, ParentChildComment, ProfileAvatarImage, ProfilePostImage, ProfileWallpaperImage, Description, PostCommentLike,

                Notification,

                ShippingAddress, ShopOrder, ShoppingCart, ShoppingCartItem, PaymentMethod, OrderLine, Product, ProductImage, ShopAddress, Variation,
                // SubCategory, Category

                // ChatRoom, ChatConnectedProfile, ChatJoinedRoom, ChatMessage, RoomImage
            ]);
            //associations
            Profile.hasMany(Friendship, { foreignKey: { name: "profile_request", field: "profile_request" } });
            Friendship.belongsTo(Profile, { foreignKey: { name: "profile_request", field: "profile_request" }, as: "profile_request_id" })
            Profile.hasMany(Friendship, { foreignKey: { name: "profile_target", field: "profile_target" } });
            Friendship.belongsTo(Profile, { foreignKey: { name: "profile_target", field: "profile_target" }, as: "profile_target_id" })

            Profile.hasMany(Post, { foreignKey: { name: "profile_id", field: "profile_id" } });
            Post.belongsTo(Profile, { foreignKey: { name: "profile_id", field: "profile_id" }, as: "post_profile" });

            Profile.hasMany(PostComment, { foreignKey: { name: "profile_id", field: "profile_id" } });
            PostComment.belongsTo(Profile, { foreignKey: { name: "profile_id", field: "profile_id" }, as: "comment_profile" });

            // PostComment.hasOne(Profile, { foreignKey: { name: "profile_id", field: "profile_id" } });
            // Profile.belongsTo(PostComment, { foreignKey: { name: "profile_id", field: "profile_id" }});

            Post.hasMany(PostComment, { foreignKey: { name: "post_id", field: "post_id" }, as: "post_comment" });
            PostComment.belongsTo(Post, { foreignKey: { name: "post_id", field: "post_id" } })

            Profile.hasMany(PostLike, { foreignKey: { name: "profile_id", field: "profile_id" } });
            PostLike.belongsTo(Profile, { foreignKey: { name: "profile_id", field: "profile_id" } })
            Post.hasMany(PostLike, { foreignKey: { name: "post_id", field: "post_id" } });
            PostLike.belongsTo(Post, { foreignKey: { name: "post_id", field: "post_id" } });

            PostComment.hasMany(ParentChildComment, { foreignKey: { name: "parent_comment_id", field: "parent_comment_id" }, as: "all_child_comment" });
            ParentChildComment.belongsTo(PostComment, { foreignKey: { name: "parent_comment_id", field: "parent_comment_id" }, as: "parent_comment" })
            PostComment.hasMany(ParentChildComment, { foreignKey: { name: "child_comment_id", field: "child_comment_id" }, as: "all_parent_comment" });
            ParentChildComment.belongsTo(PostComment, { foreignKey: { name: "child_comment_id", field: "child_comment_id" }, as: "child_comment" })

            Profile.hasMany(PostCommentLike, { foreignKey: { name: "profile_id", field: "profile_id" } });
            PostCommentLike.belongsTo(Profile, { foreignKey: { name: "profile_id", field: "profile_id" } })
            PostComment.hasMany(PostCommentLike, { foreignKey: { name: "post_comment_id", field: "post_comment_id" } });
            PostCommentLike.belongsTo(PostComment, { foreignKey: { name: "post_comment_id", field: "post_comment_id" } });

            Profile.hasOne(ProfileWallpaperImage, { foreignKey: { name: "profile_id", field: "profile_id" }, as: "profile_wallpaper" });
            ProfileWallpaperImage.belongsTo(Profile, { foreignKey: { name: "profile_id", field: "profile_id" } });

            Profile.hasOne(ProfileAvatarImage, { foreignKey: { name: "profile_id", field: "profile_id" }, as: "profile_avatar" });
            ProfileAvatarImage.belongsTo(Profile, { foreignKey: { name: "profile_id", field: "profile_id" } });

            Profile.hasOne(Description, { foreignKey: { name: "profile_id", field: "profile_id" }, as: "profile_description" });
            Description.belongsTo(Profile, { foreignKey: { name: "profile_id", field: "profile_id" } });


            Post.hasMany(ProfilePostImage, { foreignKey: { name: "post_id", field: "post_id" }, as: "post_image" });
            ProfilePostImage.belongsTo(Post, { foreignKey: { name: "post_id", field: "post_id" } });

            // Profile.hasMany(ChatConnectedProfile, { foreignKey: { name: "profile_id", field: "profile_id" } });
            // ChatConnectedProfile.belongsTo(Profile, { foreignKey: { name: "profile_id", field: "profile_id" } });

            // ChatConnectedProfile.hasMany(ChatJoinedRoom, { foreignKey: { name: "connected_profile_id", field: "connected_profile_id" } });
            // ChatJoinedRoom.belongsTo(ChatConnectedProfile, { foreignKey: { name: "connected_profile_id", field: "connected_profile_id" } });

            // ChatRoom.hasMany(ChatJoinedRoom, { foreignKey: { name: "room_id", field: "room_id" } });
            // ChatJoinedRoom.belongsTo(ChatRoom, { foreignKey: { name: "room_id", field: "room_id" } });

            // ChatConnectedProfile.hasMany(ChatMessage, { foreignKey: { name: "connected_profile_id", field: "connected_profile_id" } });
            // ChatMessage.belongsTo(ChatConnectedProfile, { foreignKey: { name: "connected_profile_id", field: "connected_profile_id" } });

            // ChatRoom.hasMany(ChatMessage, { foreignKey: { name: "room_id", field: "room_id" } });
            // ChatMessage.belongsTo(ChatRoom, { foreignKey: { name: "room_id", field: "room_id" } });

            // ChatRoom.hasMany(RoomImage, { foreignKey: { name: "room_id", field: "room_id" } });
            // RoomImage.belongsTo(ChatRoom, { foreignKey: { name: "room_id", field: "room_id" } });

            //?
            // ChatRoom.hasMany(ChatConnectedProfile, { foreignKey: { name: "room_id", field: "room_id" } });
            // ChatConnectedProfile.belongsToMany(ChatRoom, { through: ChatJoinedRoom });

            Product.hasOne(ShopAddress, { foreignKey: { name: "product_id", field: "product_id" } });
            ShopAddress.belongsTo(Product, { foreignKey: { name: "product_id", field: "product_id" } });

            ShopOrder.hasOne(ShippingAddress, { foreignKey: { name: "order_id", field: "order_id" } });
            ShippingAddress.belongsTo(ShopOrder, { foreignKey: { name: "order_id", field: "order_id" } });

            Profile.hasOne(ShoppingCart, { foreignKey: { name: "profile_id", field: "profile_id" } });
            ShoppingCart.belongsTo(Profile, { foreignKey: { name: "profile_id", field: "profile_id" } });

            Product.hasMany(ShoppingCartItem, { foreignKey: { name: "product_id", field: "product_id" } });
            ShoppingCartItem.belongsTo(Product, { foreignKey: { name: "product_id", field: "product_id" } });

            ShoppingCart.hasMany(ShoppingCartItem, { foreignKey: { name: "shopping_cart_id", field: "shopping_cart_id" } });
            ShoppingCartItem.belongsTo(ShoppingCart, { foreignKey: { name: "shopping_cart_id", field: "shopping_cart_id" } });

            // Profile.hasMany(PaymentMethod, { foreignKey: { name: "profile_id", field: "profile_id" } });
            // PaymentMethod.belongsTo(Profile, { foreignKey: { name: "profile_id", field: "profile_id" } });

            ShopOrder.hasMany(PaymentMethod, { foreignKey: { name: "order_id", field: "order_id" } });
            PaymentMethod.belongsTo(ShopOrder, { foreignKey: { name: "order_id", field: "order_id" } });

            ShopOrder.hasMany(OrderLine, { foreignKey: { name: "order_id", field: "order_id" } });
            OrderLine.belongsTo(ShopOrder, { foreignKey: { name: "order_id", field: "order_id" } });

            Profile.hasMany(ShopOrder, { foreignKey: { name: "profile_id", field: "profile_id" } });
            ShopOrder.belongsTo(Profile, { foreignKey: { name: "profile_id", field: "profile_id" }});

            Profile.hasMany(Product, { foreignKey: { name: "profile_id", field: "profile_id" } });
            Product.belongsTo(Profile, { foreignKey: { name: "profile_id", field: "profile_id" } });

            Product.hasMany(OrderLine, { foreignKey: { name: "product_id", field: "product_id" } });
            OrderLine.belongsTo(Product, { foreignKey: { name: "product_id", field: "product_id" } });

            Product.hasOne(Variation, { foreignKey: { name: "product_id", field: "product_id" } });
            Variation.belongsTo(Product, { foreignKey: { name: "product_id", field: "product_id" } });

            Product.hasMany(ProductImage, { foreignKey: { name: "product_id", field: "product_id" }, as: "product_image"});
            ProductImage.belongsTo(Product, { foreignKey: { name: "product_id", field: "product_id" } });

            // Category.hasMany(SubCategory, { foreignKey: { name: "category_id", field: "category_id" } });
            // SubCategory.belongsTo(Category, { foreignKey: { name: "category_id", field: "category_id" } });

            // Category.hasMany(Product, { foreignKey: { name: "category_id", field: "category_id" } });
            // Product.belongsTo(Category, { foreignKey: { name: "category_id", field: "category_id" } });

            Profile.hasMany(Notification, { foreignKey: { name: "profile_sender_id", field: "profile_sender_id" } });
            Notification.belongsTo(Profile, { foreignKey: { name: "profile_sender_id", field: "profile_sender_id" }, as: "profile_sender" });

            Profile.hasMany(Notification, { foreignKey: { name: "profile_receiver_id", field: "profile_receiver_id" } });
            Notification.belongsTo(Profile, { foreignKey: { name: "profile_receiver_id", field: "profile_receiver_id" }, as: "profile_receiver" });

            Post.hasMany(Notification, { foreignKey: { name: "post_id", field: "post_id" } });
            Notification.belongsTo(Post, { foreignKey: { name: "post_id", field: "post_id" } });

            PostComment.hasMany(Notification, { foreignKey: { name: "post_comment_id", field: "post_comment_id" } });
            Notification.belongsTo(PostComment, { foreignKey: { name: "post_comment_id", field: "post_comment_id" } });


            //initiate database  
            try {
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
            }
            catch (err) {
                Logger.error(
                    `${err.parent.sqlMessage}`, JSON.stringify(err.parent) || null, 'mysql2 - connection error',
                );
            }
            return sequelize;
        },
    },
];