import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors, Request, Param, Body } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { storageProduct } from 'src/common/config/storage.config';
import { Profile } from 'src/database/model/profile.model';
import { ProductImageService } from '../service/product_image.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Image Upload')
@Controller('api/image')
export class ProductImageController {
    constructor(private readonly productImageService: ProductImageService) { }

    @Post('/product_image/:product_id/upload')
    @UseInterceptors(FilesInterceptor('files', null, storageProduct))
    async uploadPostImages(@Request() request: any, @Param("product_id") product_id: number, @UploadedFiles() files: Array<Express.Multer.File>) {
        const profile = <Profile>request.user;
        const apiURL = process.env.API_URL || 'http://127.0.0.1';
        const port = process.env.LOCALHOST_PORT || 4321;
        var arrayLink: string[] = [];

        for (const file of files) {
            arrayLink.push(`${apiURL.endsWith('/') ? apiURL + ":" + port : apiURL + ":" + port + '/'}${(file.destination).startsWith('./') ? file.destination.slice(2, file.destination.length) : file.destination}/${file.filename}`);
        }

        const response = await this.productImageService.createUpdateProductImage(profile.profile_id, product_id, arrayLink);

        return response;
    }

    @Post('/product_image/:product_id/delete')
    async deleteImageOfPost(@Param("product_id") product_id: number, @Body() body: string[]) {
        return await this.productImageService.deleteProductImage(product_id, body);
    }
}
