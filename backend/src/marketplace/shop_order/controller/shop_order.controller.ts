import { Body, Controller, Delete, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OrderFullDetailDto } from 'src/database/dtos/order-full-detail.dto';
import { Product } from 'src/database/model/product.model';
import { Profile } from 'src/database/model/profile.model';
import { Page } from 'src/database/view-model/page-model';
import { ShopOrderService } from '../service/shop_order.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Order')
@Controller('/api/order')
export class ShopOrderController {
    constructor(
        private readonly shopOrderService: ShopOrderService
    ) { }


    @Post("/purchased")
    async getOrderPurchased(@Request() request: any, @Body() page: Page) {
        const profile = <Profile>request.user;
        return await this.shopOrderService.getOrderPurchased(profile.profile_id, page);
    }

    @Post("/sold")
    async getOrderSold(@Request() request: any, @Body() page: Page) {
        const profile = <Profile>request.user;
        return await this.shopOrderService.getOrderSold(profile.profile_id, page);
    }

    @Post("")
    async createOrder(@Request() request: any, @Body() body: OrderFullDetailDto) {
        const profile = <Profile>request.user;
        const orderFullDetailDto = body;
        return await this.shopOrderService.createOrder(profile.profile_id, orderFullDetailDto);
    }

    @Put("/item/payment/status/:order_line_id")
    async updateOrderLinePaymentStatus(@Request() request: any, @Param("order_line_id") order_line_id: number) {
        // const profile = <Profile>request.user;
        return await this.shopOrderService.updateOrderLinePaymentStatus(order_line_id);
    }

    @Put("/item/shipping/status/:order_line_id")
    async updateOrderLineShippingStatus(@Request() request: any, @Param("order_line_id") order_line_id: number) {
        // const profile = <Profile>request.user;
        return await this.shopOrderService.updateOrderLineShippingStatus(order_line_id);
    }

    @Delete("/item/:order_line_id")
    async deleteOrder(@Request() request: any, @Param("order_line_id")order_line_id: number) {
        const profile = <Profile>request.user;
        return await this.shopOrderService.deleteOrder(order_line_id);
    }
}