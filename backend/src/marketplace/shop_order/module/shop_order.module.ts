import { Module } from '@nestjs/common';
import { ShopOrderService } from '../service/shop_order.service';
import { ShopOrderController } from '../controller/shop_order.controller';
import { ShopOrderRepository } from '../repository/shop_order.repository';
import { shopOrderProviders } from 'src/database/providers/all.providers';

@Module({
  imports: [],
  providers: [
    ShopOrderService, 
    ShopOrderRepository,
    ...shopOrderProviders
  ],
  controllers: [ShopOrderController],
  exports: [],
})
export class ShopOrderModule {}
