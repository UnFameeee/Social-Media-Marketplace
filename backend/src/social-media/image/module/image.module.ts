import { Module } from '@nestjs/common';
import { chatroomImageProviders, postProviders, profileAvatarImageProviders, profilePostImageProviders, profileWallpaperImageProviders } from 'src/database/providers/all.providers';
import { ImageController } from '../controller/image.controller';
import { ProfileAvatarImageController } from '../controller/profile_avatar_image.controller';
import { ProfilePostImageController } from '../controller/profile_post_image.controller';
import { ProfileWallpaperImageController } from '../controller/profile_wallpaper_image.controller';
import { RoomImageController } from '../controller/room_image.controller';
import { ProfileAvatarImageRepository } from '../repository/profile_avatar_image.repository';
import { ProfilePostImageRepository } from '../repository/profile_post_image.repository';
import { ProfileWallpaperImageRepository } from '../repository/profile_wallpaper_image.repository';
import { RoomImageRepository } from '../repository/room_image.repository';
import { ProfileAvatarImageService } from '../service/profile_avatar_image.service';
import { ProfilePostImageService } from '../service/profile_post_image.service';
import { ProfileWallpaperImageService } from '../service/profile_wallpaper_image.service';
import { RoomImageService } from '../service/room_image.srvice';

@Module({
    imports: [],
    controllers: [
        ImageController,
        ProfileAvatarImageController,
        ProfileWallpaperImageController,
        ProfilePostImageController,
        RoomImageController
    ],
    providers: [ImageController,
        ProfileAvatarImageRepository,
        ProfilePostImageRepository,
        ProfileWallpaperImageRepository,
        RoomImageRepository,
        ProfileAvatarImageService,
        ProfileWallpaperImageService,
        ProfilePostImageService,
        RoomImageService,
        ...profileAvatarImageProviders,
        ...profileWallpaperImageProviders,
        ...profilePostImageProviders,
        ...chatroomImageProviders,
        ...postProviders
    ],
    exports: [
        ProfileAvatarImageRepository,
        ProfilePostImageRepository,
        ProfileWallpaperImageRepository,
        RoomImageRepository
    ],
})
export class ImageModule { }
