import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ORDER_STATUS } from "src/common/constants/order.constant";
import { Product } from "src/database/model/product.model";
import { PROVIDER } from "src/database/providers/provider.constant";

@Injectable()
export class ShopOrderRepository {
    constructor(
        @Inject(PROVIDER.ShopOrder) private readonly shopOrderRepository: typeof ShopOrderRepository
    ) { }

    async createOrder(profile_id: number, listProduct: Product[]) {
        try {
            return listProduct;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async updateOrderStatus(order_id: number, status: ORDER_STATUS) {
        try {
            return null;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async updateOrderLineStatus(order_line_id: number, status: ORDER_STATUS) {
        try {
            return null;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async deleteOrder(profile_id: number, listProduct: Product[]) {
        try {
            return listProduct;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}