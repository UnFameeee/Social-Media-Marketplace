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