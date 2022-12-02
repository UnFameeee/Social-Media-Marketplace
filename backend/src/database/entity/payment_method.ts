import { PAYMENT_METHOD } from "src/common/constants/payment_method.constant";

export class PaymentMethodEntity {
    payment_method_id: number;
    order_id: number;
    payment_type: PAYMENT_METHOD;
    createdAt: string;
}