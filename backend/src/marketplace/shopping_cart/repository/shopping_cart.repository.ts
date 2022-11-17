import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ShoppingCartEntity } from "src/database/entity/shopping_cart";
import { Product } from "src/database/model/product.model";
import { ShoppingCart } from "src/database/model/shopping_cart.model";
import { ShoppingCartItem } from "src/database/model/shopping_cart_item.model";
import { PROVIDER } from "src/database/providers/provider.constant";
import { Page } from "src/database/view-model/page-model";
import { PagingData } from "src/database/view-model/paging.model";
import { ResponseData } from "src/database/view-model/success-message.model";

@Injectable()
export class ShoppingCartRepository {
    constructor(
        @Inject(PROVIDER.ShoppingCart) private readonly shoppingCartRepository: typeof ShoppingCart,
        @Inject(PROVIDER.ShoppingCartItem) private readonly shoppingCartItemRepository: typeof ShoppingCartItem,
    ) { }

    async createShoppingCart(profile_id: number): Promise<ShoppingCart> {
        try {
            var shoppingCartEntity = new ShoppingCartEntity();
            shoppingCartEntity.profile_id = profile_id;
            return this.shoppingCartRepository.create(shoppingCartEntity);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }


    async addProductToCart(profile_id: number, product_id: number): Promise<boolean> {
        try {
            return null;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async removeProductFromCart(profile_id: number, product_id: number): Promise<boolean> {
        try {
            return null;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async changeQuantityOfProductInCart(profile_id: number, product_id: number, quantity: number): Promise<boolean> {
        try {
            return null;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getAllProductInCartPaging(profile_id: number, page: Page): Promise<ResponseData<PagingData<Product[]>>> {
        try {
            return null;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getAllProductInCartWithoutPaging(profile_id: number): Promise<ResponseData<Product[]>> {
        try {
            return null;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}