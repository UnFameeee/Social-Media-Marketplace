import { Body, Controller, Delete, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Product } from 'src/database/model/product.model';
import { Profile } from 'src/database/model/profile.model';
import { ShopOrderService } from '../service/shop_order.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Order')
@Controller('/api/order')
export class ShopOrderController {
    constructor(
        private readonly shopOrderService: ShopOrderService
    ) { }

    @Post("")
    async createOrder(@Request() request: any, @Body() body: Product[]) {
        const profile = <Profile>request.user;
        const listProduct = body["data"];
        return await this.shopOrderService.createOrder(profile.profile_id, listProduct);
    }

    @Put("/status")
    async updateOrderStatus(@Request() request: any, @Body() body: Product[]) {
        const profile = <Profile>request.user;
        const listProduct = body["data"];
        return await this.shopOrderService.createOrder(profile.profile_id, listProduct);
    }

    @Delete()
    async deleteOrder(@Request() request: any, @Body() body: Product[]) {
        const profile = <Profile>request.user;
        const listProduct = body["data"];
        return await this.shopOrderService.createOrder(profile.profile_id, listProduct);
    }
}