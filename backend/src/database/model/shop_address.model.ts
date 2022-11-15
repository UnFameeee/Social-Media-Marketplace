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
    address_line: number

    @Column
    city: number

    @Column
    region: number

    @Column
    country: number

    // @Column
    // postal_code: number
}