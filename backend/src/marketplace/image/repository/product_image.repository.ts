import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ProductImageEntity } from "src/database/entity/product_image";
import { Product } from "src/database/model/product.model";
import { ProductImage } from "src/database/model/product_image.model";
import { PROVIDER } from "src/database/providers/provider.constant";
import { Op } from "sequelize";


@Injectable()
export class ProductImageRepository {
    constructor(
        @Inject(PROVIDER.ProductImage) private readonly productImageRepository: typeof ProductImage
    ) { }

    async createUpdateProductImage(profile_id: number, product_id: number, arrayLink: string[]): Promise<string[]> {
        try {
            var productImage = new ProductImageEntity();
            for (const element of arrayLink) {
                productImage.link = element;
                productImage.profile_id = product_id;
                productImage.product_id = product_id;
                await this.productImageRepository.create(productImage);
            }

            const queryData = await this.productImageRepository.findAll({
                where: {
                    profile_id: profile_id,
                },
                attributes: ["link"],
                include: [
                    {
                        model: Product,
                        where: {
                            product_id: product_id,
                        },
                        attributes: [],
                    }
                ],
                raw: true,
            })

            var resArrayLink: any[] = [];
            for (const element of queryData) {
                resArrayLink.push(element.link);
            }
            return resArrayLink;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async deleteProductImage(product_id: number, linkArray: string[]): Promise<boolean> {
        const queryData = await this.productImageRepository.findAll({
            attributes: ["product_image_id"],
            where: { link: { [Op.in]: linkArray } },
            include: [
                {
                    model: Product,
                    where: {
                        product_id: product_id,
                    },
                    attributes: [],
                },
            ],
            raw: true,
        })

        if (queryData) {
            var idDeleted: number[] = [];
            for (const x of queryData) {
                idDeleted.push(x.product_image_id);
            }
            const rowsDeleted = await this.productImageRepository.destroy({
                where: {
                    product_image_id: { [Op.in]: idDeleted },
                }
            })
            return (rowsDeleted > 0) ? true : false;
        } else return false;
    }
}