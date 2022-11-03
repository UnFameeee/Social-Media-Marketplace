import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
    tableName: "chat_connected_profile",
    timestamps: true,
    paranoid: true,
    updatedAt: false,
})
export class ChatConnectedProfile extends Model<ChatConnectedProfile> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    connected_profile_id: number;

    //profile_id

    @Column
    socket_id: string;
}  