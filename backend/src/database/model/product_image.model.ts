import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
    tableName: "product_image",
    timestamps: true,
    paranoid: true,
})
export class ProductImage extends Model<ProductImage> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    product_image_id: number;

    @Column
    profile_id: number;
 
    @Column(DataType.TEXT)
    link: string;

    @Column(DataType.DATE(3))
    createdAt: string;
    
    @Column(DataType.DATE(3))
    updatedAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;
} 