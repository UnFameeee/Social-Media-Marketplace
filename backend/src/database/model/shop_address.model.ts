import {AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
@Table({
    tableName: "shop_address",
    timestamps: true,
    paranoid: true,
})
export class ShopAddress extends Model<ShopAddress> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    shop_address_id: number
 
    @Column
    address_line: string

    @Column
    city: string

    @Column
    region: string

    @Column
    country: string

    @Column
    detail_address: string

    // @Column
    // postal_code: number
}