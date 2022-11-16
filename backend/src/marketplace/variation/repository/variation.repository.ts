import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { VariationEntity } from "src/database/entity/variation";
import { Variation } from "src/database/model/variation.model";
import { PROVIDER } from "src/database/providers/provider.constant";

@Injectable()
export class VariationRepository {
    constructor(
        @Inject(PROVIDER.Variation) private variationRepository: typeof Variation
    ) { }

    async createVariation(product_id: number, data: VariationEntity): Promise<Variation> {
        try {
            console.log("FRIST: ", data);
            data.product_id = product_id;
            console.log(data);
            return await this.variationRepository.create(data);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}