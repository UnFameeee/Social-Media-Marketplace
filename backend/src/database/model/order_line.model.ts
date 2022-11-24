import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
@Table({
    tableName: "order_line",
    timestamps: true,
    paranoid: true,
})
export class OrderLine extends Model<OrderLine> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    order_id: number
 
    //product_id
    //order_id

    @Column
    quantity: number

    @Column
    price: number 

    @Column(DataType.DATE(3))
    createdAt: string;
    
    @Column(DataType.DATE(3))
    updatedAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;
}