import { Module } from '@nestjs/common';
import { ShoppingCartService } from '../service/shopping_cart.service';
import { ShoppingCartController } from '../controller/shopping_cart.controller';

@Module({
  providers: [ShoppingCartService],
  controllers: [ShoppingCartController]
})
export class ShoppingCartModule {}
