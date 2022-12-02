import { Injectable } from '@nestjs/common';
import { STRING_RESPONSE } from 'src/common/constants/string-success.constant';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { OrderFullDetailDto } from 'src/database/dtos/order-full-detail.dto';
import { OrderLine } from 'src/database/model/order_line.model';
import { Page } from 'src/database/view-model/page-model';
import { PagingData } from 'src/database/view-model/paging.model';
import { ResponseData } from 'src/database/view-model/success-message.model';
import { ProductRepository } from 'src/marketplace/product/repository/product.repository';
import { ShippingAddressRepository } from 'src/marketplace/shipping_address/repository/shipping_address.repository';
import { ShoppingCartRepository } from 'src/marketplace/shopping_cart/repository/shopping_cart.repository';
import { OrderLineRepository } from '../repository/order_line.repository';
import { PaymentMethodRepository } from '../repository/payment_method.repository';
import { ShopOrderRepository } from '../repository/shop_order.repository';

@Injectable()
export class ShopOrderService {
    constructor(
        private readonly shopOrderRepository: ShopOrderRepository,
        private readonly productRepository: ProductRepository,
        private readonly paymentMethodRepository: PaymentMethodRepository,
        private readonly orderLineRepository: OrderLineRepository,
        private readonly shippingAddressRepository: ShippingAddressRepository,
        private readonly shoppingCartRepository: ShoppingCartRepository,
    ) { }

    async getOrderPurchased(profile_id: number, page: Page): Promise<ResponseData<PagingData<OrderLine[]>>> {
        try {
            //Shopping
            //Order (include Profile) -> Order_item
            var response = new ResponseData<PagingData<OrderLine[]>>();
            response.results = await this.shopOrderRepository.getOrderPurchased(profile_id, page);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async getOrderSold(profile_id: number, page: Page): Promise<ResponseData<PagingData<OrderLine[]>>> {
        try {
            //Selling
            //OrderItem -> Product -> Profile
            var response = new ResponseData<PagingData<OrderLine[]>>();
            response.results = await this.shopOrderRepository.getOrderSold(profile_id, page);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async createOrder(profile_id: number, orderFullDetail: OrderFullDetailDto): Promise<ResponseData<boolean>> {
        try {
            var response = new ResponseData<boolean>();
            //Check if the quantity in stock is > quantity of product
            //AND Change the quantity in product stock
            const checkQuantityFlag = await this.productRepository.checkQuantityAndChangeQuantityStock(orderFullDetail.OrderLine);

            if (checkQuantityFlag == STRING_RESPONSE.SUCCESS) {
                //Create order
                const orderQueryData = await this.shopOrderRepository.createOrder(profile_id, orderFullDetail.total_price);

                var payment_method = orderFullDetail.PaymentMethod;
                await this.paymentMethodRepository.createPaymentMethod(orderQueryData.order_id, orderQueryData.createdAt, payment_method);

                await this.shippingAddressRepository.createShippingAddress(orderQueryData.order_id, orderQueryData.createdAt, orderFullDetail.ShippingAddress);

                var orderLineArray = orderFullDetail.OrderLine;
                await this.orderLineRepository.createOrderLine(orderQueryData.order_id, orderQueryData.createdAt, payment_method.payment_type, orderLineArray);

                //Only for this TLCN logic
                await this.shoppingCartRepository.removeAllCart(profile_id);

                response.results = true;
            }
            else {
                response.message = checkQuantityFlag;
            }
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async updateOrderLinePaymentStatus(order_line_id: number): Promise<ResponseData<boolean>> {
        try {
            var response = new ResponseData<boolean>();
            //WAITING_FOR_PAYMENT -> Purchased
            //Update order line too
            response.results = await this.shopOrderRepository.updateOrderLinePaymentStatus(order_line_id);
            if (!response.results) {
                response.results = null;
                response.message = `This product is already paid!`;
            }
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async updateOrderLineShippingStatus(order_line_id: number) {
        try {
            //Purchased -> Shipping -> Delivered
            var response = new ResponseData<boolean>();
            response.results = await this.shopOrderRepository.updateOrderLineShippingStatus(order_line_id);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async deleteOrder(order_line_id: number): Promise<ResponseData<boolean>> {
        try {
            var response = new ResponseData<boolean>();
            //check if the order was created > than 3 days, remove it
            const res = await this.shopOrderRepository.deleteOrder(order_line_id);
            if(res == STRING_RESPONSE.SUCCESS){
                response.results = true;
            } else {
                response.message = res;
            }
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }
}