import { Injectable } from '@nestjs/common';
import { ShopAddressRepository } from '../repository/shop_address.repository';

@Injectable()
export class ShopAddressService {
    constructor(private readonly shopAddressRepository: ShopAddressRepository) { }

    // async getAllProfile(page: Page): Promise<ResponseData<PagingData<Profile[]>>> {
    //     try {
    //         var response = new ResponseData<PagingData<Profile[]>>();
    //         response.results = await this.profileRepository.getAllProfile(page);
    //         return response;
    //     } catch (err) {
    //         ExceptionResponse(err);
    //     }
    // }
}
