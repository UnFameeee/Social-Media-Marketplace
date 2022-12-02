import {  PAYMENT_STATUS, SHIPPING_STATUS } from "src/common/constants/order.constant";

export class OrderLineEntity {
    order_line_id: number;
    product_id: number;
    order_id: number;
    quantity: number;
    price: number;
    payment_status: PAYMENT_STATUS;
    shipping_status: SHIPPING_STATUS;
    createdAt: string;
}