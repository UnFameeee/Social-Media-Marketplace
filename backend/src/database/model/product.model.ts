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

    @Column(DataType.TEXT)
    @Column
    name: string

    @Column(DataType.TEXT)
    description: string

    @Column(DataType.INTEGER)
    price: number

    @Column(DataType.INTEGER)
    quantity_in_stock: number
    
    @Column(DataType.DATE(3))
    createdAt: string;
    
    @Column(DataType.DATE(3))
    updatedAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;
} 