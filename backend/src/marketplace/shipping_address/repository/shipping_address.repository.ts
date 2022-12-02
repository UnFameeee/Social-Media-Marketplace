import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PaymentMethodEntity } from "src/database/entity/payment_method";
import { ShippingAddressEntity } from "src/database/entity/shipping_address";
import { PaymentMethod } from "src/database/model/payment_method.model";
import { ShippingAddress } from "src/database/model/shipping_address.model";
import { PROVIDER } from "src/database/providers/provider.constant";

@Injectable()
export class ShippingAddressRepository {
    constructor(
        @Inject(PROVIDER.ShippingAddress) private readonly shippingAddressRepository: typeof ShippingAddress,
    ) { }

    async createShippingAddress(order_id: number, order_date: string, data: ShippingAddressEntity): Promise<Boolean> {
        try {
            data.order_id = order_id;
            data.createdAt = order_date;
            const queryCreateData = await this.shippingAddressRepository.create(data);
            return queryCreateData ? true : false;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}