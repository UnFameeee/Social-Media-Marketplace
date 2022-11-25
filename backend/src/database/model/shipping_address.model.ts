import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
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
    city: string

    @Column
    district: string

    @Column
    ward: string

    @Column
    detail_address: string

    @Column(DataType.DATE(3))
    createdAt: string;
    
    @Column(DataType.DATE(3))
    updatedAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;
}