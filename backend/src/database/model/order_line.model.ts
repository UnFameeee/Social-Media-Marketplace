import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { PAYMENT_STATUS, SHIPPING_STATUS } from "src/common/constants/order.constant";
@Table({
    tableName: "order_line",
    timestamps: true,
    paranoid: true,
})
export class OrderLine extends Model<OrderLine> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    order_line_id: number
 
    //product_id
    //order_id

    @Column
    quantity: number

    @Column
    price: number 

    @Column
    payment_status: PAYMENT_STATUS
    
    @Column
    shipping_status: SHIPPING_STATUS

    @Column(DataType.DATE(3))
    createdAt: string;
    
    @Column(DataType.DATE(3))
    updatedAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;
}