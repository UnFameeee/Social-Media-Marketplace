import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
@Table({
    tableName: "Shop_Order",
    timestamps: true,
    paranoid: true,
})
export class ShopOrder extends Model<ShopOrder> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    order_id: number
 
    //profile_id
    //shipping_address_id

    @Column
    order_date: string

    @Column
    payment_method: string 

    @Column
    order_status: string
} 