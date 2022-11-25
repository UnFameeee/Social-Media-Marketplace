import { AllowNull, AutoIncrement, Column, PrimaryKey, Table, Model, DataType } from "sequelize-typescript";

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

    @Column(DataType.DATE(3))
    createdAt: string;
    
    @Column(DataType.DATE(3))
    updatedAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;
} 