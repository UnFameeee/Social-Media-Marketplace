import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
@Table({
    tableName: "shopping_cart_item",
    timestamps: true,
    paranoid: true,
})
export class ShoppingCartItem extends Model<ShoppingCartItem> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    shopping_cart_item_id: number
 
    //shopping_cart_id: number;
    //profile_id: number;

    @Column
    quantity: number

    @Column(DataType.DATE(3))
    createdAt: string;
    
    @Column(DataType.DATE(3))
    updatedAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;
} 