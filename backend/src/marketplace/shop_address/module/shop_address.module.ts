import { Module } from '@nestjs/common';
import { shopAddressProviders } from 'src/database/providers/all.providers';
import { ShopAddressController } from '../controller/shop_address.controller';
import { ShopAddressRepository } from '../repository/shop_address.repository';
import { ShopAddressService } from '../service/shop_address.service';

@Module({
  imports: [],
  providers: [
    ShopAddressService,
    ShopAddressRepository,
    ...shopAddressProviders
  ],
  controllers: [ShopAddressController],
  exports: [ShopAddressRepository],
})
export class ShopAddressModule {}
