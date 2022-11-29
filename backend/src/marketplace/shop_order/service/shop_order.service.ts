import { Injectable } from '@nestjs/common';
import { ORDER_STATUS } from 'src/common/constants/order.constant';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { Product } from 'src/database/model/product.model';
import { ShopOrderRepository } from '../repository/shop_order.repository';

@Injectable()
export class ShopOrderService {
    constructor(
        private readonly shopOrderRepository: ShopOrderRepository,
    ) { }



    async createOrder(profile_id: number, listProduct: Product[]) {
        try {
            return await this.shopOrderRepository.createOrder(profile_id, listProduct);
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async updateOrderStatus(order_id: number, status: ORDER_STATUS) {
        try {
            //WAITING_FOR_PAYMENT -> Purchased
            //Update order line too
            return await this.shopOrderRepository.updateOrderStatus(order_id, status);
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async updateOrderLineStatus(order_line_id: number, status: ORDER_STATUS) {
        try {
            //Purchased -> Shipping -> Delivered
            return await this.shopOrderRepository.updateOrderLineStatus(order_line_id, status);
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async deleteOrder(profile_id: number, listProduct: Product[]) {
        try {
            //check if the order was created > than 7 days, remove it
            return await this.shopOrderRepository.deleteOrder(profile_id, listProduct);
        } catch (err) {
            ExceptionResponse(err);
        }
    }
}