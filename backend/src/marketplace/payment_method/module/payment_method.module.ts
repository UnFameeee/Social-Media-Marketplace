import { Module } from '@nestjs/common';
import { PaymentMethodService } from '../service/payment_method.service';
import { PaymentMethodController } from '../controller/payment_method.controller';

@Module({
  providers: [PaymentMethodService],
  controllers: [PaymentMethodController]
})
export class PaymentMethodModule {}
