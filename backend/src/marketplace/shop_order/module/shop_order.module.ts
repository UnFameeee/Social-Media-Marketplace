import { Module } from '@nestjs/common';
import { ShopOrderService } from '../service/shop_order.service';
import { ShopOrderController } from '../controller/shop_order.controller';
import { ShopOrderRepository } from '../repository/shop_order.repository';
import { orderLineProviders, paymentMethodProviders, productProviders, shopOrderProviders } from 'src/database/providers/all.providers';
import { ProductModule } from 'src/marketplace/product/module/product.module';
import { PaymentMethodRepository } from '../repository/payment_method.repository';
import { OrderLineRepository } from '../repository/order_line.repository';
import { ShippingAddressModule } from 'src/marketplace/shipping_address/module/shipping_address.module';
import { ShoppingCartModule } from 'src/marketplace/shopping_cart/module/shopping_cart.module';

@Module({
  imports: [
    ProductModule,
    ShippingAddressModule,
    ShoppingCartModule
  ],
  providers: [
    ShopOrderService, 
    ShopOrderRepository,
    PaymentMethodRepository,
    OrderLineRepository,
    ...productProviders,
    ...shopOrderProviders,
    ...orderLineProviders,
    ...paymentMethodProviders,
  ],
  controllers: [ShopOrderController],
  exports: [],
})
export class ShopOrderModule {}
