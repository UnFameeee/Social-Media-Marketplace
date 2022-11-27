import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import { Helper } from "src/common/utils/helper.utils";
import { paginate } from "src/common/utils/paginate.utils";
import { ProductFullDetailDto } from "src/database/dtos/product-full-detail.dto";
import { ProductEntity } from "src/database/entity/product";
import { Product } from "src/database/model/product.model";
import { ProductImage } from "src/database/model/product_image.model";
import { Profile } from "src/database/model/profile.model";
import { ProfileAvatarImage } from "src/database/model/profile_avatar_image.model";
import { ShopAddress } from "src/database/model/shop_address.model";
import { Variation } from "src/database/model/variation.model";
import { PROVIDER } from "src/database/providers/provider.constant";
import { Page } from "src/database/view-model/page-model";
import { PagingData } from "src/database/view-model/paging.model";

@Injectable()
export class ProductRepository {
    constructor(
        @Inject(PROVIDER.Product) private readonly productRepository: typeof Product,
    ) { }

    async createProduct(profile_id: number, data: ProductFullDetailDto): Promise<Product> {
        try {
            var productFullDetailEntity = new ProductFullDetailDto();
            productFullDetailEntity = { ...data };
            delete productFullDetailEntity.Variation;
            delete productFullDetailEntity.ShopAddress;

            var productEntity = new ProductEntity();
            productEntity = { ...productFullDetailEntity };
            productEntity.profile_id = profile_id;

            return await this.productRepository.create(productEntity);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getProductDetail(profile_id: number, product_id: number): Promise<Product> {
        try {
            var queryDataCheck = await this.productRepository.findOne({
                where: { product_id: product_id },
                attributes: [],
                include: [
                    {
                        model: Profile,
                        attributes: ["profile_id"],
                        where: {
                            profile_id: profile_id,
                        }
                    }
                ]
            })

            // var queryData: any;

            if (queryDataCheck) {
                //owner
                var queryData = await this.productRepository.findOne({
                    where: { product_id: product_id },
                    attributes: {
                        exclude: ["deletedAt", "profile_id"],
                    },
                    include: [
                        {
                            model: Profile,
                            attributes: ["profile_id", "profile_name"],
                            where: {
                                profile_id: profile_id,
                            },
                            include: [
                                {
                                    model: ProfileAvatarImage,
                                    as: "profile_avatar",
                                    attributes: ["link"],
                                }
                            ]
                        },
                        {
                            model: Variation,
                            attributes: {
                                exclude: ["createdAt", "deletedAt", "updatedAt"]
                            }
                        },
                        {
                            model: ShopAddress,
                            attributes: {
                                exclude: ["createdAt", "deletedAt", "updatedAt"]
                            }
                        },
                        {
                            model: ProductImage,
                            as: "product_image",
                            attributes: ["link"],
                        }
                    ]
                })
            } else {
                //buyer
                var queryData = await this.productRepository.findOne({
                    where: { product_id: product_id },
                    attributes: {
                        exclude: ["quantity_in_stock", "createdAt", "deletedAt", "updatedAt", "profile_id"],
                    },
                    include: [
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
                            model: Variation,
                            attributes: {
                                exclude: ["createdAt", "deletedAt", "updatedAt"]
                            }
                        },
                        {
                            model: ShopAddress,
                            attributes: {
                                exclude: ["createdAt", "deletedAt", "updatedAt"]
                            }
                        },
                        {
                            model: ProductImage,
                            as: "product_image",
                            attributes: ["link"],
                        }
                    ]
                })
            }

            const product = await Helper.SQLobjectToObject(queryData);
            if (product["Profile"]["profile_avatar"] != null) {
                product["Profile"]["avatar"] = product["Profile"]["profile_avatar"]["link"];
            }
            else product["Profile"]["avatar"] = null;

            delete product["Profile"]["profile_avatar"]
            return product;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async updateProduct(product_id: number, data: ProductFullDetailDto): Promise<Product> {
        try {
            var productFullDetailEntity = new ProductFullDetailDto();
            productFullDetailEntity = { ...data };
            delete productFullDetailEntity.Variation;
            delete productFullDetailEntity.ShopAddress;

            var productEntity = new ProductEntity();
            productEntity = { ...productFullDetailEntity };

            for (const key in productEntity) {
                if (productEntity[key] == null) {
                    delete productEntity[key];
                }
            }

            const res = await this.productRepository.update(productEntity, {
                where: {
                    product_id: product_id,
                }
            });
            return await this.productRepository.findOne({
                where: { product_id: product_id }
            })
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async deleteProduct(product_id: number): Promise<boolean> {
        try {
            const res = await this.productRepository.destroy({
                where: {
                    product_id: product_id,
                }
            });
            return res ? true : false;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getAllShoppingProduct(profile_id: number, page: Page): Promise<PagingData<Product[]>> {
        try {
            var result = new PagingData<Product[]>();
            var queryData = await this.productRepository.findAndCountAll({
                attributes: {
                    exclude: ["quantity_in_stock", "createdAt", "deletedAt", "updatedAt", "profile_id"],
                },
                include: [
                    {
                        model: Profile,
                        attributes: ["profile_id", "profile_name"],
                        where: {
                            profile_id: {
                                [Op.ne]: profile_id
                            }
                        },
                        include: [
                            {
                                model: ProfileAvatarImage,
                                as: "profile_avatar",
                                attributes: ["link"],
                            }
                        ]
                    },
                    {
                        model: Variation,
                        attributes: {
                            exclude: ["createdAt", "deletedAt", "updatedAt", "product_id"]
                        }
                    },
                    {
                        model: ShopAddress,
                        attributes: {
                            exclude: ["createdAt", "deletedAt", "updatedAt", "product_id"]
                        }
                    },
                    {
                        model: ProductImage,
                        as: "product_image",
                        attributes: ["link"],
                    }
                ],
                order: [
                    // ['createdAt', 'DESC'],
                    Sequelize.literal('rand()'),
                ],
                raw: false,
                ...paginate({ page })
            })

            const productObject = await Helper.SQLobjectToObject(queryData.rows);
            for (const element of productObject) {
                if (element["Profile"]["profile_avatar"] != null) {
                    element["Profile"]["avatar"] = element["Profile"]["profile_avatar"]["link"];
                }
                else element["Profile"]["avatar"] = null;
                delete element["Profile"]["profile_avatar"]
            }

            result.data = productObject;
            page.totalElement = queryData.count;
            result.page = page;
            return result;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getAllSellingProduct(profile_id: number, page: Page): Promise<PagingData<Product[]>> {
        try {
            var result = new PagingData<Product[]>();
            var queryData = await this.productRepository.findAndCountAll({
                attributes: {
                    exclude: ["deletedAt", "profile_id"],
                },
                include: [
                    {
                        model: Profile,
                        attributes: ["profile_id", "profile_name"],
                        where: { profile_id: profile_id },
                        include: [
                            {
                                model: ProfileAvatarImage,
                                as: "profile_avatar",
                                attributes: ["link"],
                            }
                        ]
                    },
                    {
                        model: Variation,
                        attributes: {
                            exclude: ["createdAt", "deletedAt", "updatedAt", "product_id"]
                        }
                    },
                    {
                        model: ShopAddress,
                        attributes: {
                            exclude: ["createdAt", "deletedAt", "updatedAt", "product_id"]
                        }
                    },
                    {
                        model: ProductImage,
                        as: "product_image",
                        attributes: ["link"],
                    }
                ],
                order: [
                    ['createdAt', 'DESC'],
                    // Sequelize.literal('rand()'),
                ],
                raw: false,
                ...paginate({ page })
            })

            const productObject = await Helper.SQLobjectToObject(queryData.rows);
            for (const element of productObject) {
                if (element["Profile"]["profile_avatar"] != null) {
                    element["Profile"]["avatar"] = element["Profile"]["profile_avatar"]["link"];
                }
                else element["Profile"]["avatar"] = null;
                delete element["Profile"]["profile_avatar"]
            }

            result.data = productObject;
            page.totalElement = queryData.count;
            result.page = page;
            return result;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}