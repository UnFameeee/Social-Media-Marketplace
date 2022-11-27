import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
    tableName: "sub_category",
    timestamps: true,
    paranoid: true,
})
export class SubCategory extends Model<SubCategory> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    sub_category_id: number;

    //category_id
 
    @Column
    sub_category_name: string;

    @Column(DataType.DATE(3))
    createdAt: string;  
    
    @Column(DataType.DATE(3))
    updatedAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;
} 