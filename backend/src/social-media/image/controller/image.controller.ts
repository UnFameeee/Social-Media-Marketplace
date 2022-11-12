import { Body, Controller, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResponseData } from 'src/database/view-model/success-message.model';
import { storagePost } from '../../../common/config/storage.config';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Image Upload')
@Controller('api/image')
export class ImageController {

    @Post('/profile/upload')
    @UseInterceptors(FileInterceptor('file', storagePost))
    uploadProfileImage(@UploadedFile() file: Express.Multer.File) {
        var response = new ResponseData<String>();
        const apiURL = process.env.API_URL || 'http://127.0.0.1';
        const port = process.env.LOCALHOST_PORT || 4321;
        response.results = `${apiURL.endsWith('/') ? apiURL + ":" + port : apiURL + ":" + port + '/'}${(file.destination).startsWith('./') ? file.destination.slice(2, file.destination.length) : file.destination}/${file.filename}`
        return response;
    }

    @Post('/post/upload')
    @UseInterceptors(FilesInterceptor('files', null, storagePost))
    uploadPostImages(@UploadedFiles() files: Array<Express.Multer.File>) {
        var response = new ResponseData<any[]>();
        const apiURL = process.env.API_URL || 'http://127.0.0.1';
        const port = process.env.LOCALHOST_PORT || 4321;
        var arrayData: any[] = [];
        for (const file of files) {
            arrayData.push(`${apiURL.endsWith('/') ? apiURL + ":" + port : apiURL + ":" + port + '/'}${(file.destination).startsWith('./') ? file.destination.slice(2, file.destination.length) : file.destination}/${file.filename}`);
        }
        response.results = arrayData;
        return response;
    }
}