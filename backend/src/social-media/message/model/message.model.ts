import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
    tableName: "chat_message",
    timestamps: true,
    paranoid: true,
    updatedAt: false,
})
export class ChatMessage extends Model<ChatMessage> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    chat_message_id: number;

    //profile_id
    //room_id
    //chat_room_id
    //chat_connected_user

    @Column   
    text: string; 
}   