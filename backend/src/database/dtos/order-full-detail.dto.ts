import { OrderLineEntity } from "../entity/order_line";
import { PaymentMethodEntity } from "../entity/payment_method";
import { ShippingAddressEntity } from "../entity/shipping_address";

export class  OrderFullDetailDto {
    order_id: number;
    profile_id: number;
    order_date: string;
    total_price: number;
    PaymentMethod: PaymentMethodEntity;
    OrderLine: OrderLineEntity[];
    ShippingAddress: ShippingAddressEntity;
}