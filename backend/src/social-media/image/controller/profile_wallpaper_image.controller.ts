import { Controller, Request, Post, UploadedFile, UseGuards, UseInterceptors, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Profile } from 'src/database/model/profile.model';
import { storageWallpaper } from '../../../common/config/storage.config';
import { ProfileWallpaperImageService } from '../service/profile_wallpaper_image.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Image Upload')
@Controller('api/image')
export class ProfileWallpaperImageController {

    constructor(private readonly profileWallpaperImageService: ProfileWallpaperImageService){}

    @Post('/profile_wallpaper/upload')
    @UseInterceptors(FileInterceptor('file', storageWallpaper))
    async uploadProfileImage(@Request() request: any, @UploadedFile() file: Express.Multer.File) {
        const profile = <Profile>request.user;

        const apiURL = process.env.API_URL || 'http://127.0.0.1';
        const port = process.env.LOCALHOST_PORT || 4321;

        const link = `${apiURL.endsWith('/') ? apiURL+":"+port : apiURL+":"+port+'/'}${(file.destination).startsWith('./') ? file.destination.slice(2, file.destination.length) : file.destination}/${file.filename}`

        const response = await this.profileWallpaperImageService.createUpdateProfileWallpaperImage(profile.profile_id, link);

        return response;
    }

    @Delete("/profile_wallpaper/delete")
    async deleteProfileWallpaperImage(@Request() request: any) {
        const profile = <Profile>request.user;
        return await this.profileWallpaperImageService.deleteProfileWallpaperImage(profile.profile_id);
    }
}