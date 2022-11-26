import { Injectable } from '@nestjs/common';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { ProductFullDetailDto } from 'src/database/dtos/product-full-detail.dto';
import { Product } from 'src/database/model/product.model';
import { Page } from 'src/database/view-model/page-model';
import { PagingData } from 'src/database/view-model/paging.model';
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

    async createProduct(profile_id: number, data: ProductFullDetailDto): Promise<ResponseData<Product>> {
        try {
            var response = new ResponseData<Product>();
            var productCreated = await this.productRepository.createProduct(profile_id, data);
            await this.variationRepository.createVariation(productCreated.product_id, data.Variation);
            await this.shopAddressRepository.createShopAddress(productCreated.product_id, data.ShopAddress);
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

    async getAllShoppingProduct(profile_id: number, page: Page): Promise<ResponseData<PagingData<Product[]>>> {
        try {
            var response = new ResponseData<PagingData<Product[]>>();
            response.results = await this.productRepository.getAllShoppingProduct(profile_id, page);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async getAllSellingProduct(profile_id: number, page: Page): Promise<ResponseData<PagingData<Product[]>>> {
        try {
            var response = new ResponseData<PagingData<Product[]>>();
            response.results = await this.productRepository.getAllSellingProduct(profile_id, page);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }


    async updateProduct(profile_id: number, product_id: number, data: ProductFullDetailDto): Promise<ResponseData<any>> {
        try {
            var response = new ResponseData<Product>();
            await this.productRepository.updateProduct(product_id, data);
            await this.variationRepository.updateVariation(product_id, data.Variation);
            await this.shopAddressRepository.updateShopAddress(product_id, data.ShopAddress);
            response.results = await this.productRepository.getProductDetail(profile_id, product_id);

            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async deleteProduct(product_id: number): Promise<ResponseData<boolean>> {
        try {
            var response = new ResponseData<boolean>();
            const isVariationDeleted = await this.variationRepository.deleteVariation(product_id);
            const isShopAddressDeleted = await this.shopAddressRepository.deleteShopAddress(product_id);
            const isProductDeleted = await this.productRepository.deleteProduct(product_id);

            if (isVariationDeleted == true && isShopAddressDeleted == true && isProductDeleted == true) {
                response.results = true;
            } else {
                response.results = false;
            }
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }
}
