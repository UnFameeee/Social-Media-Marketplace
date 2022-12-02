import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PaymentMethodEntity } from "src/database/entity/payment_method";
import { PaymentMethod } from "src/database/model/payment_method.model";
import { PROVIDER } from "src/database/providers/provider.constant";

@Injectable()
export class PaymentMethodRepository {
    constructor(
        @Inject(PROVIDER.PaymentMethod) private readonly paymentMethodRepository: typeof PaymentMethod,
    ) { }

    async createPaymentMethod(order_id: number, order_date: string, payment_method: PaymentMethodEntity): Promise<PaymentMethod> {
        try {
            var paymentMethodData = new PaymentMethodEntity();
            paymentMethodData = {
                payment_method_id: null,
                order_id: order_id,
                payment_type: payment_method.payment_type,
                createdAt: order_date
            }
            return await this.paymentMethodRepository.create(paymentMethodData);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    
}