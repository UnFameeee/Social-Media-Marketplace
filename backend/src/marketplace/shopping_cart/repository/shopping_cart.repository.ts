import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import { paginate } from "src/common/utils/paginate.utils";
import { ShoppingCartEntity } from "src/database/entity/shopping_cart";
import { ShoppingCartItemEntity } from "src/database/entity/shopping_cart_item";
import { Product } from "src/database/model/product.model";
import { ProductImage } from "src/database/model/product_image.model";
import { Profile } from "src/database/model/profile.model";
import { ShoppingCart } from "src/database/model/shopping_cart.model";
import { ShoppingCartItem } from "src/database/model/shopping_cart_item.model";
import { PROVIDER } from "src/database/providers/provider.constant";
import { Page } from "src/database/view-model/page-model";
import { PagingData } from "src/database/view-model/paging.model";
import { ResponseData } from "src/database/view-model/success-message.model";
import { ProfileAvatarImage } from "src/database/model/profile_avatar_image.model";
import { Helper } from "src/common/utils/helper.utils";
import { Variation } from "src/database/model/variation.model";

@Injectable()
export class ShoppingCartRepository {
    constructor(
        @Inject(PROVIDER.ShoppingCart) private readonly shoppingCartRepository: typeof ShoppingCart,
        @Inject(PROVIDER.ShoppingCartItem) private readonly shoppingCartItemRepository: typeof ShoppingCartItem,
        @Inject(PROVIDER.Product) private readonly productRepository: typeof Product,
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
            console.log("add: ", profile_id);
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
                    where: {
                        "$ShoppingCart.Profile.profile_id$": profile_id,
                    },
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

            if (queryData) {
                queryData.quantity = quantity;
                const querySaveData = await queryData.save();
                return querySaveData ? true : false;
            } else return false;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getAllProductInCartPaging(profile_id: number, page: Page): Promise<PagingData<Product[]>> {
        try {
            var result = new PagingData<Product[]>();

            const queryCartData = await this.shoppingCartRepository.findOne({
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"]
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
            })

            if (queryCartData) {
                var arrayProduct: number[] = [];

                const queryData = await this.shoppingCartItemRepository.findAndCountAll({
                    attributes: [
                        [Sequelize.col("Product.product_id"), "product_id"],
                    ],
                    include: [
                        {
                            model: Product,
                            attributes: [],
                        },
                        {
                            model: ShoppingCart,
                            where: {
                                shopping_cart_id: queryCartData.shopping_cart_id,
                            },
                            attributes: [],
                        }
                    ],
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    raw: true,
                    nest: true,
                    ...paginate({ page })
                });

                for (const element of queryData.rows) {
                    arrayProduct.push(element["product_id"]);
                }

                const queryProductData = await this.productRepository.findAll({
                    // attributes: {
                    //     exclude: ["createdAt", "updatedAt", "deletedAt", "quantity_in_stock"],
                    // },
                    attributes: ["product_id", "name", 'description', "price",
                        [Sequelize.col("ShoppingCartItems.quantity"), "quantity"]
                    ],
                    where: {
                        product_id: {
                            [Op.in]: arrayProduct,
                        }
                    },
                    include: [
                        {
                            model: ShoppingCartItem,
                            attributes: [],
                            include: [
                                {
                                    model: ShoppingCart,
                                    attributes: [],
                                    where: {
                                        shopping_cart_id: queryCartData.shopping_cart_id
                                    }
                                }
                            ]
                        },
                        {
                            model: Variation,
                            attributes: ["brand", "color"],
                        },
                        {
                            model: Profile,
                            attributes: ["profile_id", "profile_name"],
                            include: [
                                {
                                    model: ProfileAvatarImage,
                                    as: "profile_avatar",
                                    attributes: ["link"],
                                }
                            ]
                        },
                        {
                            model: ProductImage,
                            as: "product_image",
                            attributes: ["link"],
                        },
                    ],
                    raw: false,
                })

                const product = await Helper.SQLobjectToObject(queryProductData);
                for (const element of product) {
                    if (element["Profile"]["profile_avatar"] != null) {
                        element["Profile"]["avatar"] = element["Profile"]["profile_avatar"]["link"];
                    }
                    else element["Profile"]["avatar"] = null;

                    delete element["Profile"]["profile_avatar"]
                }

                result.data = product;
                page.totalElement = queryData.count;
                result.page = page;
            }
            return result;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getAllProductInCartWithoutPaging(profile_id: number): Promise<Product[]> {
        try {
            const queryCartData = await this.shoppingCartRepository.findOne({
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"]
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
            })

            if (queryCartData) {
                var arrayProduct: number[] = [];

                const queryData = await this.shoppingCartItemRepository.findAndCountAll({
                    attributes: [
                        [Sequelize.col("Product.product_id"), "product_id"],
                    ],
                    include: [
                        {
                            model: Product,
                            attributes: [],
                        },
                        {
                            model: ShoppingCart,
                            where: {
                                shopping_cart_id: queryCartData.shopping_cart_id,
                            },
                            attributes: [],
                        }
                    ],
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    raw: true,
                    nest: true,
                });

                for (const element of queryData.rows) {
                    arrayProduct.push(element["product_id"]);
                }

                const queryProductData = await this.productRepository.findAll({
                    // attributes: {
                    //     exclude: ["createdAt", "updatedAt", "deletedAt", "quantity_in_stock"],
                    // },
                    attributes: ["product_id", "name", 'description', "price",
                        [Sequelize.col("ShoppingCartItems.quantity"), "quantity"]
                    ],
                    where: {
                        product_id: {
                            [Op.in]: arrayProduct,
                        }
                    },
                    include: [
                        {
                            model: ShoppingCartItem,
                            attributes: [],
                            include: [
                                {
                                    model: ShoppingCart,
                                    attributes: [],
                                    where: {
                                        shopping_cart_id: queryCartData.shopping_cart_id
                                    }
                                }
                            ]
                        },
                        {
                            model: Variation,
                            attributes: ["brand", "color"],
                        },
                        {
                            model: Profile,
                            attributes: ["profile_id", "profile_name"],
                            include: [
                                {
                                    model: ProfileAvatarImage,
                                    as: "profile_avatar",
                                    attributes: ["link"],
                                }
                            ]
                        },
                        {
                            model: ProductImage,
                            as: "product_image",
                            attributes: ["link"],
                        },
                    ],
                    raw: false,
                })

                const product = await Helper.SQLobjectToObject(queryProductData);
                for (const element of product) {
                    if (element["Profile"]["profile_avatar"] != null) {
                        element["Profile"]["avatar"] = element["Profile"]["profile_avatar"]["link"];
                    }
                    else element["Profile"]["avatar"] = null;

                    delete element["Profile"]["profile_avatar"]
                }

                return product;
            }
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async removeAllCart(profile_id: number) {
        try {
            const queryCartData = await this.shoppingCartRepository.findOne({
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"]
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
            })

            if (queryCartData) {
                const queryData = await this.shoppingCartItemRepository.findAndCountAll({
                    include: [
                        {
                            model: ShoppingCart,
                            where: {
                                shopping_cart_id: queryCartData.shopping_cart_id,
                            },
                            attributes: [],
                        }
                    ],
                });

                for (const element of queryData.rows) {
                    await element.destroy();
                }
            }

        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}