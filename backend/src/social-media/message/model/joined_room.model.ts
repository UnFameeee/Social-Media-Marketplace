import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
    tableName: "chat_joined_room",
    timestamps: true,
    paranoid: true,
    updatedAt: false,
})
export class ChatJoinedRoom extends Model<ChatJoinedRoom> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    chat_joined_room_id: number;

    //profile_id

    @Column   
    socket_id: string;
}  