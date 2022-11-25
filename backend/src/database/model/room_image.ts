import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
    tableName: "room_image",
    timestamps: true,
    paranoid: true,
    updatedAt: false,
})
export class RoomImage extends Model<RoomImage> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    room_image_id: number;

    //profile_id

    @Column(DataType.TEXT)
    link: string;

    @Column(DataType.DATE(3))
    createdAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;
}