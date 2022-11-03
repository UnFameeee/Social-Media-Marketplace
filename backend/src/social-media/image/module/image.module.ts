import { Module } from '@nestjs/common';
import { ImageController } from '../controller/image.controller';

@Module({
    imports:[],
    controllers:[ImageController],
    exports:[],
})
export class ImageModule {}
