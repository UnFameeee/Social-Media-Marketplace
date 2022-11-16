import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ProductFullDetailDto } from "src/database/dtos/product-full-detail.dto";
import { ProductEntity } from "src/database/entity/product";
import { Product } from "src/database/model/product.model";
import { ProductImage } from "src/database/model/product_image.model";
import { Profile } from "src/database/model/profile.model";
import { ShopAddress } from "src/database/model/shop_address.model";
import { Variation } from "src/database/model/variation.model";
import { PROVIDER } from "src/database/providers/provider.constant";

@Injectable()
export class ProductRepository {
    constructor(
        @Inject(PROVIDER.Product) private readonly productRepository: typeof Product,
    ) { }

    async createProduct(profile_id: number, data: ProductFullDetailDto): Promise<Product> {
        try {
            var productEntity = new ProductFullDetailDto();
            productEntity = { ...data };
            delete productEntity.variation;
            delete productEntity.shop_address;
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

            console.log(profile_id);
            console.log(product_id);
            console.log(queryDataCheck);
            
            if (queryDataCheck) {
                //owner
                var queryData = await this.productRepository.findOne({
                    where: { product_id: product_id },
                    attributes: {
                        exclude: ["deletedAt"],
                    },
                    include: [
                        {
                            model: Profile,
                            attributes: [],
                            where: {
                                profile_id: profile_id,
                            }
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
                            attributes: ["link"],
                        }
                    ]
                })
                return queryData;
            } else {
                //buyer
                var queryData = await this.productRepository.findOne({
                    where: { product_id: product_id },
                    attributes: {
                        exclude: ["quantity_in_stock", "createdAt", "deletedAt", "updatedAt"],
                    },
                    include: [
                        {
                            model: Profile,
                            attributes: [],
                            where: {
                                profile_id: profile_id,
                            }
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
                            attributes: ["link"],
                        }
                    ]
                })
                return queryData;
            }
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}