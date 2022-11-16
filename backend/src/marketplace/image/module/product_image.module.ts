import { Module } from '@nestjs/common';
import { ProductImageService } from '../service/product_image.service';
import { ProductImageController } from '../controller/product_image.controller';
import { productImageProviders } from 'src/database/providers/all.providers';

@Module({
  imports: [],
  providers: [
    ProductImageService,
    ...productImageProviders
  ],
  controllers: [ProductImageController],
  exports: [],
})
export class ProductImageModule {}
