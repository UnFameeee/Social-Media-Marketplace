import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
    tableName: "profile_avatar_image",
    timestamps: true,
    paranoid: true,
    updatedAt: false,
})
export class ProfileAvatarImage extends Model<ProfileAvatarImage> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    profile_avatar_image_id: number;

    //profile_id
 
    @Column(DataType.TEXT)
    link: string;

    @Column(DataType.DATE(3))
    createdAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;
} 