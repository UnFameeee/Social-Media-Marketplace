import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Op } from "sequelize";
import { PAYMENT_STATUS, SHIPPING_STATUS } from "src/common/constants/order.constant";
import { Helper } from "src/common/utils/helper.utils";
import { paginate } from "src/common/utils/paginate.utils";
import { ShopOrderEntity } from "src/database/entity/shop_order";
import { OrderLine } from "src/database/model/order_line.model";
import { Product } from "src/database/model/product.model";
import { ProductImage } from "src/database/model/product_image.model";
import { Profile } from "src/database/model/profile.model";
import { ShopOrder } from "src/database/model/shop_order.model";
import { PROVIDER } from "src/database/providers/provider.constant";
import { Page } from "src/database/view-model/page-model";
import { PagingData } from "src/database/view-model/paging.model";

@Injectable()
export class ShopOrderRepository {
    constructor(
        @Inject(PROVIDER.ShopOrder) private readonly shopOrderRepository: typeof ShopOrder,
        @Inject(PROVIDER.OrderLine) private readonly orderLineRepository: typeof OrderLine,
    ) { }

    async getOrderPurchased(profile_id: number, page: Page): Promise<PagingData<OrderLine[]>> {
        try {
            var result = new PagingData<OrderLine[]>();
            //get all order of that profile
            const queryOrderData = await this.shopOrderRepository.findAll({
                attributes: ["order_id"],
                include: [
                    {
                        model: Profile,
                        where: {
                            profile_id: profile_id,
                        }
                    }
                ]
            })

            var orderArray: number[] = [];
            for (const element of queryOrderData) {
                orderArray.push(element.order_id);
            }

            const queryData = await this.orderLineRepository.findAndCountAll({
                attributes: [
                    "order_line_id", "quantity", "price", "payment_status", "shipping_status", "createdAt",
                ],
                include: [
                    {
                        model: Product,
                        attributes: ["name"],
                        include: [
                            {
                                model: ProductImage,
                                as: "product_image",
                                attributes: ["link"]
                            }
                        ]
                    },
                    {
                        model: ShopOrder,
                        attributes: [],
                        where: {
                            order_id: {
                                [Op.in]: orderArray
                            }
                        }
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ],
                raw: false,
                ...paginate({ page })
            })

            const order_line = await Helper.SQLobjectToObject(queryData.rows);
            for (const element of order_line) {
                element["name"] = element["Product"]["name"];
                element["product_image"] = element["Product"]["product_image"];
                delete element["Product"];
            }

            result.data = order_line;
            page.totalElement = queryData.count;
            result.page = page;
            return result;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }


    async getOrderSold(profile_id: number, page: Page) {
        try {
            var result = new PagingData<OrderLine[]>();

            const queryData = await this.orderLineRepository.findAndCountAll({
                attributes: [
                    "order_line_id", "quantity", "price", "payment_status", "shipping_status", "createdAt",
                ],
                where: {
                    "$Product.Profile.profile_id$": profile_id,
                },
                include: [
                    {
                        model: Product,
                        attributes: ["product_id", "name", "profile_id"],
                        include: [
                            {
                                model: Profile,
                                attributes: [],
                                where: {
                                    profile_id: profile_id
                                }
                            },
                            {
                                model: ProductImage,
                                as: "product_image",
                                attributes: ["link"]
                            },
                        ]
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ],
                raw: false,
                ...paginate({ page })
            })

            const order_line = await Helper.SQLobjectToObject(queryData.rows);
            for (const element of order_line) {
                element["name"] = element["Product"]["name"];
                element["product_image"] = element["Product"]["product_image"];
                delete element["Product"];
            }

            result.data = order_line;
            page.totalElement = queryData.count;
            result.page = page;
            return result;

        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async createOrder(profile_id: number, total_price: number): Promise<ShopOrder> {
        try {
            var order = new ShopOrderEntity();
            order = {
                order_id: null,
                profile_id: profile_id,
                order_date: new Date().toISOString().slice(0, 23).replace('T', ' '),
                total_price: total_price,
            }
            return await this.shopOrderRepository.create(order);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async updateOrderLinePaymentStatus(order_line_id: number) {
        try {
            var queryOrderLineData = await this.orderLineRepository.findOne({
                where: {
                    order_line_id: order_line_id,
                    payment_status: PAYMENT_STATUS.WAITING_FOR_PAYMENT,
                },
            })
            if (queryOrderLineData) {
                queryOrderLineData.payment_status = PAYMENT_STATUS.PURCHASED;
                await queryOrderLineData.save();
                return true;
            } else {
                return false;
            }
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async updateOrderLineShippingStatus(order_line_id: number) {
        try {
            var queryOrderLineData = await this.orderLineRepository.findOne({
                where: {
                    order_line_id: order_line_id,
                },
            })
            if (queryOrderLineData) {
                if (queryOrderLineData.shipping_status == SHIPPING_STATUS.WAITING_FOR_SHIPPER) {
                    queryOrderLineData.shipping_status = SHIPPING_STATUS.SHIPPING;
                } else if (queryOrderLineData.shipping_status == SHIPPING_STATUS.SHIPPING) {
                    queryOrderLineData.shipping_status = SHIPPING_STATUS.DELIVERED;
                }
                await queryOrderLineData.save();
                return true;
            } return false;

        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async deleteOrder(order_line_id: number) {
        try {
            const queryData = await this.orderLineRepository.findOne({
                where: {
                    
                }
            })
            return null;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}