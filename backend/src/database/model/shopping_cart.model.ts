import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
@Table({
    tableName: "shopping_cart",
    timestamps: true,
    paranoid: true,
})
export class ShoppingCart extends Model<ShoppingCart> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    shopping_cart_id: number

    //profile_id 
} 