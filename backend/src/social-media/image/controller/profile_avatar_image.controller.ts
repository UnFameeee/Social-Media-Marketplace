import { Controller, Delete, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Profile } from 'src/database/model/profile.model';
import { ResponseData } from 'src/database/view-model/success-message.model';
import { storageAvatar } from '../../../common/config/storage.config';
import { ProfileAvatarImageService } from '../service/profile_avatar_image.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Image Upload')
@Controller('api/image')
export class ProfileAvatarImageController {

    constructor(private readonly profileAvatarImageService: ProfileAvatarImageService) { }

    @Post('/profile_avatar/upload')
    @UseInterceptors(FileInterceptor('file', storageAvatar))
    async uploadProfileImage(@Request() request: any, @UploadedFile() file: Express.Multer.File): Promise<ResponseData<string>> {
        const profile = <Profile>request.user;

        const apiURL = process.env.API_URL || 'http://127.0.0.1';
        const port = process.env.LOCALHOST_PORT || 4321;


        const link = `${apiURL.endsWith('/') ? apiURL + ":" + port : apiURL + ":" + port + '/'}${(file.destination).startsWith('./') ? file.destination.slice(2, file.destination.length) : file.destination}/${file.filename}`;

        const response = await this.profileAvatarImageService.createUpdateProfileAvatarImage(profile.profile_id, link);


        return response;
    }

    @Delete("/profile_avatar/delete")
    async deleteProfileAvatarImage(@Request() request: any) {
        const profile = <Profile>request.user;
        return await this.profileAvatarImageService.deleteProfileAvatarImage(profile.profile_id);
    }

}