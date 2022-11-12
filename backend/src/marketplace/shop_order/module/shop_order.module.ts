import { Module } from '@nestjs/common';
import { ShopOrderService } from '../service/shop_order.service';
import { ShopOrderController } from '../controller/shop_order.controller';

@Module({
  providers: [ShopOrderService],
  controllers: [ShopOrderController]
})
export class ShopOrderModule {}
