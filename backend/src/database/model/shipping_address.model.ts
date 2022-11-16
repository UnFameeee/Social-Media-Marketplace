import {AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
@Table({
    tableName: "shipping_address",
    timestamps: true,
    paranoid: true,
})
export class ShippingAddress extends Model<ShippingAddress> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    shipping_address_id: number
 
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