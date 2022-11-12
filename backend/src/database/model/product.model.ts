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
 
    //category_id: number; 
    //sub_category_id: number; 
    //product_image_id: number; 

    @Column
    name: string

    @Column
    description: string

    @Column
    price: number

    @Column
    quantity_in_stock: number
} 