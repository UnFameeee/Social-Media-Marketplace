import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PAYMENT_STATUS, SHIPPING_STATUS } from "src/common/constants/order.constant";
import { PAYMENT_METHOD } from "src/common/constants/payment_method.constant";
import { OrderLineEntity } from "src/database/entity/order_line";
import { OrderLine } from "src/database/model/order_line.model";
import { PROVIDER } from "src/database/providers/provider.constant";

@Injectable()
export class OrderLineRepository {
    constructor(
        @Inject(PROVIDER.OrderLine) private readonly orderLineRepository: typeof OrderLine,
    ) { }

    async createOrderLine(order_id: number, order_date: string, payment_method: PAYMENT_METHOD, orderLineArray: OrderLineEntity[]): Promise<Boolean> {
        try {
            for (const element of orderLineArray) {
                element.order_id = order_id;
                element.createdAt = order_date;
                element.payment_status = payment_method == PAYMENT_METHOD.PAYPAL ? PAYMENT_STATUS.PURCHASED : PAYMENT_STATUS.WAITING_FOR_PAYMENT;
                element.shipping_status = SHIPPING_STATUS.WAITING_FOR_SHIPPER
                await this.orderLineRepository.create(element);
            }
            return true;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }


}