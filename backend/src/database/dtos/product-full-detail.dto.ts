import { ShopAddressEntity } from "../entity/shop_address";
import { VariationEntity } from "../entity/variation";

export class ProductFullDetailDto {
    product_id: number;
    name: string;
    description: string;
    price: number;
    quatity_in_stock: number;
    
    profile_id: number;

    // category_id: number; 
    Variation: VariationEntity;
    ShopAddress: ShopAddressEntity;
}