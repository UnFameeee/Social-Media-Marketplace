import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
    tableName: "chat_room",
    timestamps: true,
    paranoid: true,
    updatedAt: false,
})
export class ChatRoom extends Model<ChatRoom> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    chat_room_id: number;

    //profile_id
    //joined_user_id
    //room_image_id

    @Column   
    name: string; 

    @Column   
    description: string; 
}   