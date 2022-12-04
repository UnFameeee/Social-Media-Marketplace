import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Op } from "sequelize";
import { PAYMENT_STATUS, SHIPPING_STATUS } from "src/common/constants/order.constant";
import { STRING_RESPONSE } from "src/common/constants/string-success.constant";
import { Helper } from "src/common/utils/helper.utils";
import { paginate } from "src/common/utils/paginate.utils";
import { ShopOrderEntity } from "src/database/entity/shop_order";
import { OrderLine } from "src/database/model/order_line.model";
import { Product } from "src/database/model/product.model";
import { ProductImage } from "src/database/model/product_image.model";
import { Profile } from "src/database/model/profile.model";
import { ShippingAddress } from "src/database/model/shipping_address.model";
import { ShopOrder } from "src/database/model/shop_order.model";
import { PROVIDER } from "src/database/providers/provider.constant";
import { Page } from "src/database/view-model/page-model";
import { PagingData } from "src/database/view-model/paging.model";

@Injectable()
export class ShopOrderRepository {
    constructor(
        @Inject(PROVIDER.ShopOrder) private readonly shopOrderRepository: typeof ShopOrder,
        @Inject(PROVIDER.OrderLine) private readonly orderLineRepository: typeof OrderLine,
        @Inject(PROVIDER.Product) private readonly productRepository: typeof Product
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
                        attributes: ["order_id"],
                        where: {
                            order_id: {
                                [Op.in]: orderArray
                            }
                        },
                        include: [
                            {
                                model: ShippingAddress,
                                // attributes: {
                                //     exclude: ["shipping_address_id", "order_id", "createdAt", "updatedAt", "deletedAt"]
                                // },
                                attributes: ["city", "district", "ward", "detail_address"],
                            }
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

                element["ShippingAddress"] = element["ShopOrder"]["ShippingAddress"];
                delete element["ShopOrder"];
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

            console.log(profile_id);

            const queryData = await this.orderLineRepository.findAndCountAll({
                attributes: [
                    "order_line_id", "quantity", "price", "payment_status", "shipping_status", "createdAt",
                ],
                where: {
                    "$Product.Profile.profile_id$": profile_id,
                },
                include: [
                    {
                        model: ShopOrder,
                        attributes: ["order_id"],
                        include: [
                            {
                                model: ShippingAddress,
                                attributes: ["city", "district", "ward", "detail_address"],
                            }
                        ],
                        required: false,
                    },
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
                    },

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

                element["ShippingAddress"] = element["ShopOrder"]["ShippingAddress"];
                delete element["ShopOrder"];
            }

            result.data = order_line;
            // result.data = queryData.rows;
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

    async deleteOrder(order_line_id: number): Promise<string> {
        try {
            const queryData = await this.orderLineRepository.findOne({
                // attributes: ["order_line_id", "createdAt", "quantity", "product_id"],
                where: {
                    order_line_id: order_line_id,
                },
            })

            if (queryData.shipping_status != SHIPPING_STATUS.SHIPPING) {
                return `You only can delete the order when shipper return the product`;
            }

            const time = new Date(queryData.createdAt);
            // console.log(new Date(queryData.createdAt).toLocaleString());
            // console.log(new Date(new Date(queryData.createdAt).getTime() + (7 * 24 * 60 * 60 * 1000)).toLocaleString());

            if (new Date(time.getTime() + (3 * 24 * 60 * 60 * 1000)) < new Date()) {
                //return the quantity in stock to that product
                var queryProductData = await this.productRepository.findOne({
                    where: {
                        product_id: queryData["product_id"]
                    }
                })
                queryProductData.quantity_in_stock += queryData.quantity;
                await queryProductData.save();
                //remove order item
                queryData.payment_status = PAYMENT_STATUS.CANCEL;
                await queryData.save();
                await queryData.destroy();
                return STRING_RESPONSE.SUCCESS;
            } else return `You only can delete the order product was hold after 3 days`;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}