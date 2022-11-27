import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
@Table({
    tableName: "product",
    timestamps: true,
    paranoid: true,
})
export class Product extends Model<Product> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    product_id: number

    @Column
    name: string

    @Column
    description: string

    @Column(DataType.BIGINT)
    price: number

    @Column(DataType.BIGINT)
    quantity_in_stock: number
    
    @Column(DataType.DATE(3))
    createdAt: string;
    
    @Column(DataType.DATE(3))
    updatedAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;
} 