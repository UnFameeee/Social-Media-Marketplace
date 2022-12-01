import { Module } from '@nestjs/common';
import { ShippingAddressService } from '../service/shipping_address.service';
import { ShippingAddressController } from '../controller/shipping_address.controller';
import { shippingAddressProviders } from 'src/database/providers/all.providers';
import { ShippingAddressRepository } from '../repository/shipping_address.repository';

@Module({
  imports: [],
  providers: [
    ShippingAddressService,
    ShippingAddressRepository,
    ...shippingAddressProviders,
  ],
  controllers: [ShippingAddressController],
  exports: [ShippingAddressRepository],
})  
export class ShippingAddressModule {}
