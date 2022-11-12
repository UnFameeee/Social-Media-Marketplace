import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
    tableName: "category",
    timestamps: true,
    paranoid: true,
})
export class Category extends Model<Category> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    category_id: number;
    
    @Column
    category_name: string;
} 