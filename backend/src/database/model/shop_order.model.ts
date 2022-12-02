import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
@Table({
    tableName: "shop_order",
    timestamps: true,
    paranoid: true,
})
export class ShopOrder extends Model<ShopOrder> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    order_id: number;
 
    //profile_id
    //shipping_address_id

    //10.000.000.000.000.000
    @Column
    total_price: number;

    // @Column
    // order_date: string;

    // @Column
    // payment_method: string;

    // @Column
    // order_status: string;

    @Column(DataType.DATE(3))
    createdAt: string;
    
    @Column(DataType.DATE(3))
    updatedAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;
} 