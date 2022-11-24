import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
    tableName: "profile_wallpaper_image",
    timestamps: true,
    paranoid: true,
    updatedAt: false,
})
export class ProfileWallpaperImage extends Model<ProfileWallpaperImage> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    profile_wallpaper_image_id: number;

    //profile_id

    @Column(DataType.TEXT)
    link: string;

    @Column(DataType.DATE(3))
    createdAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;
}