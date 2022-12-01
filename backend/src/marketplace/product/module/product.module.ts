import { Module } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { ProductController } from '../controller/product.controller';
import { productProviders } from 'src/database/providers/all.providers';
import { ProductRepository } from '../repository/product.repository';
import { VariationModule } from 'src/marketplace/variation/module/variation.module';
import { ShopAddressModule } from 'src/marketplace/shop_address/module/shop_address.module';

@Module({
  imports: [
    VariationModule,
    ShopAddressModule,
  ],
  providers: [
    ProductService,
    ProductRepository,
    ...productProviders,
  ],
  controllers: [ProductController],
  exports: [ProductRepository],
})
export class ProductModule {}
