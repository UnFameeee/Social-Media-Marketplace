import { Module } from '@nestjs/common';
import { ProductImageService } from '../service/product_image.service';
import { ProductImageController } from '../controller/product_image.controller';

@Module({
  providers: [ProductImageService],
  controllers: [ProductImageController]
})
export class ProductImageModule {}
