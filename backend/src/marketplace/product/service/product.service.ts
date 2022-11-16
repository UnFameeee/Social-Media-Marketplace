import { Injectable } from '@nestjs/common';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { ProductFullDetailDto } from 'src/database/dtos/product-full-detail.dto';
import { Product } from 'src/database/model/product.model';
import { ResponseData } from 'src/database/view-model/success-message.model';
import { ShopAddressRepository } from 'src/marketplace/shop_address/repository/shop_address.repository';
import { VariationRepository } from 'src/marketplace/variation/repository/variation.repository';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly variationRepository: VariationRepository,
        private readonly shopAddressRepository: ShopAddressRepository,
    ) { }

    async createProduct(profile_id: number, data: ProductFullDetailDto): Promise<ResponseData<any>> {
        try {
            var response = new ResponseData<any>();
            var productCreated = await this.productRepository.createProduct(profile_id, data);
            await this.variationRepository.createVariation(productCreated.product_id, data.variation);
            await this.shopAddressRepository.createShopAddress(productCreated.product_id, data.shop_address);
            response.results = await this.productRepository.getProductDetail(profile_id, productCreated.product_id);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async getProductDetail(profile_id: number, product_id: number): Promise<ResponseData<Product>> {
        try {
            var response = new ResponseData<Product>();
            response.results = await this.productRepository.getProductDetail(profile_id, product_id);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }
}
