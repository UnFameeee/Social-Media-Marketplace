import { Module } from '@nestjs/common';
import { ShoppingCartService } from '../service/shopping_cart.service';
import { ShoppingCartController } from '../controller/shopping_cart.controller';
import { ShoppingCartRepository } from '../repository/shopping_cart.repository';
import { productProviders, shoppingCartItemProviders, shoppingCartProviders } from 'src/database/providers/all.providers';

@Module({
  imports: [],
  providers: [
    ShoppingCartService,
    ShoppingCartRepository,
    ...shoppingCartProviders,
    ...shoppingCartItemProviders,
    ...productProviders
  ],
  controllers: [ShoppingCartController],
  exports: [ShoppingCartRepository],
})
export class ShoppingCartModule { }
