import { Injectable } from '@nestjs/common';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { ResponseData } from 'src/database/view-model/success-message.model';
import { ProductImageRepository } from '../repository/product_image.repository';

@Injectable()
export class ProductImageService {
    constructor(private readonly productImageRepository: ProductImageRepository) { }

    async createUpdateProductImage(profile_id: number, product_id: number, arrayLink: string[]): Promise<ResponseData<string[]>> {
        try {
            var response = new ResponseData<string[]>();
            response.results = await this.productImageRepository.createUpdateProductImage(profile_id, product_id, arrayLink);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async deleteProductImage(product_id: number, linkArray: string[]): Promise<ResponseData<boolean>> {
        try {
            var response = new ResponseData<boolean>();
            response.results = await this.productImageRepository.deleteProductImage(product_id, linkArray);
            return response;
        } catch (err) {
            ExceptionResponse(err);
        }
    }
}
