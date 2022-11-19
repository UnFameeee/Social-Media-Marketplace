import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ShoppingCartEntity } from "src/database/entity/shopping_cart";
import { ShoppingCartItemEntity } from "src/database/entity/shopping_cart_item";
import { Product } from "src/database/model/product.model";
import { Profile } from "src/database/model/profile.model";
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
            return await this.shoppingCartRepository.create(shoppingCartEntity);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }


    async addProductToCart(profile_id: number, product_id: number): Promise<boolean> {
        try {
            var queryCartData = await this.shoppingCartRepository.findOne({
                include: [
                    {
                        model: Profile,
                        attributes: [],
                        where: {
                            profile_id: profile_id,
                        }
                    }
                ],
                raw: true,
            })

            if (queryCartData) {
                var queryCartItemData = await this.shoppingCartItemRepository.findOne({
                    include: [
                        {
                            model: ShoppingCart,
                            attributes: ["profile_id"],
                            include: [
                                {
                                    model: Profile,
                                    attributes: [],
                                    where: {
                                        profile_id: profile_id,
                                    }
                                }
                            ]
                        },
                        {
                            model: Product,
                            attributes: [],
                            where: {
                                product_id: product_id,
                            }
                        }
                    ],
                });
                if (queryCartItemData) {
                    queryCartItemData.quantity += 1;
                    const queryUpdateData = await queryCartItemData.save();
                    return queryUpdateData ? true : false;
                } else {
                    var shoppingCartItemEntity = new ShoppingCartItemEntity();
                    shoppingCartItemEntity.product_id = product_id;
                    shoppingCartItemEntity.shopping_cart_id = queryCartData.shopping_cart_id;
                    shoppingCartItemEntity.quantity = 1;
                    const queryCreateData = await this.shoppingCartItemRepository.create(shoppingCartItemEntity);
                    return queryCreateData ? true : false;
                }
            } else return false;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async removeProductFromCart(profile_id: number, product_id: number): Promise<boolean> {
        try {
            const queryData = await this.shoppingCartItemRepository.findOne({
                include: [
                    {
                        model: ShoppingCart,
                        attributes: ["profile_id"],
                        include: [
                            {
                                model: Profile,
                                attributes: [],
                                where: {
                                    profile_id: profile_id,
                                }
                            }
                        ]
                    },
                    {
                        model: Product,
                        attributes: [],
                        where: {
                            product_id: product_id,
                        }
                    }
                ],
                raw: true,
            });

            console.log(queryData);

            if (queryData) {
                var rowsDeleted = await this.shoppingCartItemRepository.destroy({
                    where: {
                        shopping_cart_item_id: queryData.shopping_cart_item_id,
                    }
                });
                return rowsDeleted ? true : false;
            } else return false;

        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async changeQuantityOfProductInCart(profile_id: number, product_id: number, quantity: number): Promise<boolean> {
        try {
            const queryData = await this.shoppingCartItemRepository.findOne({
                include: [
                    {
                        model: ShoppingCart,
                        attributes: ["profile_id"],
                        include: [
                            {
                                model: Profile,
                                attributes: [],
                                where: {
                                    profile_id: profile_id,
                                }
                            }
                        ]
                    },
                    {
                        model: Product,
                        attributes: [],
                        where: {
                            product_id: product_id,
                        }
                    }
                ],
            });

            console.log(queryData);

            if (queryData) {
                queryData.quantity = quantity;
                const querySaveData = await queryData.save();
                return querySaveData ? true : false;
            } else return false;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getAllProductInCartPaging(profile_id: number, page: Page): Promise<ResponseData<PagingData<Product[]>>> {
        try {
            var queryCartData = await this.shoppingCartRepository.findOne({
                include: [

                ],
                raw: true,
            })

            if (queryCartData) {
                const queryData = await this.shoppingCartItemRepository.findOne({
                    include: [
                        {
                            model: ShoppingCart,
                            attributes: ["profile_id"],
                            where: {
                                shopping_cart_id: queryCartData.shopping_cart_id,
                            },
                            include: [
                                {
                                    model: Profile,
                                    attributes: [],
                                    where: {
                                        profile_id: profile_id,
                                    }
                                }
                            ]
                        },
                    ],

                });

                if (queryData) {
                    // return querySaveData ? null : null;
                } else return null;

            } else return null;
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