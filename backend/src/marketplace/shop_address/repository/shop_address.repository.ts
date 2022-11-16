import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ShopAddressEntity } from "src/database/entity/shop_address";
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
}