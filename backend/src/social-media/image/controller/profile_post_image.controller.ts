import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors, Request, Param, Body, Delete } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Profile } from 'src/database/model/profile.model';
import { storagePost } from '../../../common/config/storage.config';
import { ProfilePostImageService } from '../service/profile_post_image.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Image Upload')
@Controller('api/image')
export class ProfilePostImageController {

    constructor(private readonly profilePostImageService: ProfilePostImageService) { }

    @Post('/profile_post/:post_id/upload')
    @UseInterceptors(FilesInterceptor('files', null, storagePost))
    async uploadPostImages(@Request() request: any, @Param("post_id") post_id: number, @UploadedFiles() files: Array<Express.Multer.File>) {
        const profile = <Profile>request.user;
        const apiURL = process.env.API_URL || 'http://127.0.0.1';
        const port = process.env.LOCALHOST_PORT || 4321;
        var arrayLink: string[] = [];

        for (const file of files) {
            arrayLink.push(`${apiURL.endsWith('/') ? apiURL + ":" + port : apiURL + ":" + port + '/'}${(file.destination).startsWith('./') ? file.destination.slice(2, file.destination.length) : file.destination}/${file.filename}`);
        }

        const response = await this.profilePostImageService.createUpdateProfilePostImage(profile.profile_id, post_id, arrayLink);

        return response;
    }

    
    // @Post('/profile_post/:post_id/update')
    // @UseInterceptors(FilesInterceptor('files', null, storagePost))
    // async updatePostImages(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: any) {

    //     const apiURL = process.env.API_URL || 'http://127.0.0.1';
    //     const port = process.env.LOCALHOST_PORT || 4321;
    //     var arrayLink: string[] = [];

    //     for (const file of files) {
    //         arrayLink.push(`${apiURL.endsWith('/') ? apiURL + ":" + port : apiURL + ":" + port + '/'}${(file.destination).startsWith('./') ? file.destination.slice(2, file.destination.length) : file.destination}/${file.filename}`);
    //     }
    //     console.log(files);
    //     console.log(body.url);

    //     const response = await this.profilePostImageService.createUpdateProfilePostImage(profile.profile_id, post_id, arrayLink);

    //     return response;
    // }

    
    @Post('/profile_post/:post_id/delete')
    async deleteImageOfPost(@Param("post_id") post_id: number, @Body() body: string[]) {
        return await this.profilePostImageService.deleteProfilePostImage(post_id, body);
    }
}