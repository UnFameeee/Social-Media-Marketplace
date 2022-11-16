import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Profile } from 'src/database/model/profile.model';
import { ResponseData } from 'src/database/view-model/success-message.model';
import { ShopAddressService } from '../service/shop_address.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Address')
@Controller('/api/address')
export class ShopAddressController {
    constructor(private readonly shopAddressService: ShopAddressService) {}

    // @Post("create")
    // createProduct(@Request() request: any, @Body() body: any): Promise<ResponseData<any>> {
    //     const profile = <Profile>request.user;
    //     // return this.shopAddressService.createProduct(profile.profile_id, body);
    //     return null;
    // }
}
