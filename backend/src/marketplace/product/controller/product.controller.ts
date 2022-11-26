import { Body, Controller, Post, UseGuards, Request, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProductFullDetailDto } from 'src/database/dtos/product-full-detail.dto';
import { Product } from 'src/database/model/product.model';
import { Profile } from 'src/database/model/profile.model';
import { Page } from 'src/database/view-model/page-model';
import { PagingData } from 'src/database/view-model/paging.model';
import { ResponseData } from 'src/database/view-model/success-message.model';
import { ProductService } from '../service/product.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Product')
@Controller('/api/product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post("create")
    async createProduct(@Request() request: any, @Body() data: ProductFullDetailDto): Promise<ResponseData<any>> {
        const profile = <Profile>request.user;
        return this.productService.createProduct(profile.profile_id, data);
    }

    @Get("detail/:product_id")
    async getProductDetail(@Request() request: any, @Param("product_id") product_id: number): Promise<ResponseData<Product>> {
        const profile = <Profile>request.user;
        return this.productService.getProductDetail(profile.profile_id, product_id); 
    }

    @Post("shopping/all")
    async getAllShoppingProduct(@Request() request: any, @Body() page: Page): Promise<ResponseData<PagingData<Product[]>>> {
        const profile = <Profile>request.user;
        return this.productService.getAllShoppingProduct(profile.profile_id, page); 
    }

    @Post("selling/all")
    async getAllSellingProduct(@Request() request: any, @Body() page: Page): Promise<ResponseData<PagingData<Product[]>>> {
        const profile = <Profile>request.user;
        return this.productService.getAllSellingProduct(profile.profile_id, page); 
    }


    @Put("update/:product_id")
    async updateProduct(@Request() request: any, @Param("product_id") product_id: number, @Body() data: ProductFullDetailDto): Promise<ResponseData<any>> {
        const profile = <Profile>request.user;
        return this.productService.updateProduct(profile.profile_id, product_id, data);
    }

    @Delete("delete/:product_id")
    async deleteProduct(@Param("product_id") product_id: number): Promise<ResponseData<boolean>> {
        return this.productService.deleteProduct(product_id);
    }
}
