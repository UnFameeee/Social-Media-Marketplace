import { Module } from '@nestjs/common';
import { ProductImageService } from '../service/product_image.service';
import { ProductImageController } from '../controller/product_image.controller';
import { productImageProviders } from 'src/database/providers/all.providers';
import { ProductImageRepository } from '../repository/product_image.repository';

@Module({
  imports: [],
  providers: [
    ProductImageService,
    ProductImageRepository,
    ...productImageProviders
  ],
  controllers: [ProductImageController],
  exports: [],
})
export class ProductImageModule {}
