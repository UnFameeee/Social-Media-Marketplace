import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ShopAddressEntity } from "src/database/entity/shop_address";
import { Product } from "src/database/model/product.model";
import { ShopAddress } from "src/database/model/shop_address.model";
import { PROVIDER } from "src/database/providers/provider.constant";

@Injectable()
export class ShopAddressRepository {
    constructor(
        @Inject(PROVIDER.ShopAddress) private readonly shopAddressRepository: typeof ShopAddress
    ) { }

    async createShopAddress(product_id: number, data: ShopAddressEntity): Promise<ShopAddress> {
        try {
            data.product_id = product_id;
            return await this.shopAddressRepository.create(data);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async updateShopAddress(product_id: number, data: ShopAddressEntity): Promise<ShopAddress> {
        var queryData = await this.shopAddressRepository.findOne({
            include: [
                {
                    model: Product,
                    where: { product_id: product_id },
                    attributes: [],
                }
            ]
        })
        var shopAddressEntity = { ...data };
        for (const key in shopAddressEntity) {
            if (shopAddressEntity[key] == null) {
                delete shopAddressEntity[key];
            }
        }
        const res = await this.shopAddressRepository.update(shopAddressEntity, {
            where: { shop_address_id: queryData.shop_address_id },
        })
        return await this.shopAddressRepository.findOne({
            where: { shop_address_id: queryData.shop_address_id }
        });
    }

    async deleteShopAddress(product_id: number): Promise<boolean> {
        try {
            var queryData = await this.shopAddressRepository.findOne({
                include: [
                    {
                        model: Product,
                        where: { product_id: product_id },
                        attributes: []
                    }
                ]
            })
            if (queryData) {
                const res = await this.shopAddressRepository.destroy({
                    where: {
                        shop_address_id: queryData.shop_address_id,
                    }
                });
                return res ? true : false;
            } else return false;

        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}