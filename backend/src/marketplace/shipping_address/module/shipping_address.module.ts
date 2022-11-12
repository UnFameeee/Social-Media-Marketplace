import { Module } from '@nestjs/common';
import { ShippingAddressService } from '../service/shipping_address.service';
import { ShippingAddressController } from '../controller/shipping_address.controller';

@Module({
  providers: [ShippingAddressService],
  controllers: [ShippingAddressController]
})
export class ShippingAddressModule {}
