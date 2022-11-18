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

    //product_id

    @Column
    profile_id: number;
 
    @Column(DataType.TEXT)
    link: string;
} 