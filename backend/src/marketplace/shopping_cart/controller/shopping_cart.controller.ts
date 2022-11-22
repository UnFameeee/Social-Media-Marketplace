import { Controller, Post, UseGuards, Request, Body, Param, Put, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Product } from 'src/database/model/product.model';
import { Profile } from 'src/database/model/profile.model';
import { ShoppingCartItem } from 'src/database/model/shopping_cart_item.model';
import { Page } from 'src/database/view-model/page-model';
import { PagingData } from 'src/database/view-model/paging.model';
import { ResponseData } from 'src/database/view-model/success-message.model';
import { ShoppingCartService } from '../service/shopping_cart.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Cart')
@Controller('/api/shopping_cart')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService) { }

    @Post("addToCart/:product_id")
    async addProductToCart(@Request() request: any, @Param("product_id") product_id: number): Promise<ResponseData<boolean>> {
        const profile = <Profile>request.user;
        return await this.shoppingCartService.addProductToCart(profile.profile_id, product_id);
    }

    @Post("removeFromCart/:product_id")
    async removeProductFromCart(@Request() request: any, @Param("product_id") product_id: number): Promise<ResponseData<boolean>> {
        const profile = <Profile>request.user;
        return await this.shoppingCartService.removeProductFromCart(profile.profile_id, product_id);
    }

    @Put("changeQuantityProductInCart/:product_id")
    async changeQuantityOfProductInCart(@Request() request: any, @Param("product_id") product_id: number, @Body() body: any): Promise<ResponseData<boolean>> {
        const profile = <Profile>request.user;
        const quantity = body.quantity;
        return await this.shoppingCartService.changeQuantityOfProductInCart(profile.profile_id, product_id, quantity);
    }

    @Post("getCartPaging")
    async getAllProductInCartPaging(@Request() request: any, @Body() page: Page): Promise<ResponseData<PagingData<Product[]>>> {
        const profile = <Profile>request.user;
        return await this.shoppingCartService.getAllProductInCartPaging(profile.profile_id, page);
    }

    @Get("getCartWithoutPaging")
    async getAllProductInCartWithoutPaging(@Request() request: any): Promise<ResponseData<Product[]>> {
        const profile = <Profile>request.user;
        return await this.shoppingCartService.getAllProductInCartWithoutPaging(profile.profile_id);
    }
}
