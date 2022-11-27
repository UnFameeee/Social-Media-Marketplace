import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
    tableName: "profile_post_image",
    timestamps: true,
    paranoid: true,
    updatedAt: false,
})
export class ProfilePostImage extends Model<ProfilePostImage> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    profile_post_image_id: number;

    //This column does not map
    @Column
    profile_id: number;

    @Column(DataType.TEXT)
    link: string;

    @Column(DataType.DATE(3))
    createdAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;
}