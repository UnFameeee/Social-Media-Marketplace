import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
@Table({
    tableName: "payment_method",
    timestamps: true,
    paranoid: true,
})
export class PaymentMethod extends Model<PaymentMethod> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    payment_method_id: number
 
    //profile_id 

    @Column
    payment_type: string

    // @Column
    // provider: string 

    // @Column
    // account_number: string 

    // @Column
    // expiry_date: string 

    @Column(DataType.DATE(3))
    createdAt: string;
    
    @Column(DataType.DATE(3))
    updatedAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;
} 