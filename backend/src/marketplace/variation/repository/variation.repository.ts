import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { VariationEntity } from "src/database/entity/variation";
import { Product } from "src/database/model/product.model";
import { Variation } from "src/database/model/variation.model";
import { PROVIDER } from "src/database/providers/provider.constant";

@Injectable()
export class VariationRepository {
    constructor(
        @Inject(PROVIDER.Variation) private variationRepository: typeof Variation
    ) { }

    async createVariation(product_id: number, data: VariationEntity): Promise<Variation> {
        try {
            data.product_id = product_id;
            return await this.variationRepository.create(data);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async updateVariation(product_id: number, data: VariationEntity): Promise<Variation> {
        try {
            var queryData = await this.variationRepository.findOne({
                include: [
                    {
                        model: Product,
                        where: { product_id: product_id },
                        attributes: [],
                    }
                ]
            })
            var variationEntity = { ...data };
            for (const key in variationEntity) {
                if (variationEntity[key] == null) {
                    delete variationEntity[key];
                }
            }
            const res = await this.variationRepository.update(variationEntity, {
                where: { variation_id: queryData.variation_id },
            })
            return await this.variationRepository.findOne({
                where: { variation_id: queryData.variation_id }
            });
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async deleteVariation(product_id: number): Promise<boolean> {
        try {
            var queryData = await this.variationRepository.findOne({
                include: [
                    {
                        model: Product,
                        where: { product_id: product_id },
                        attributes: []
                    }
                ]
            })
            if (queryData) {
                const res = await this.variationRepository.destroy({
                    where: {
                        variation_id: queryData.variation_id,
                    }
                });
                return res ? true : false;
            } else return false;

        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}