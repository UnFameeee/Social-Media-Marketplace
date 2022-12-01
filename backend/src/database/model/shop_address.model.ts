import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
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
    city: string

    @Column
    district: string

    @Column
    ward: string

    @Column(DataType.TEXT)
    detail_address: string

    @Column(DataType.DATE(3))
    createdAt: string;
    
    @Column(DataType.DATE(3))
    updatedAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;
}