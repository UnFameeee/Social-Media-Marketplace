import {AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
@Table({
    tableName: "notification",
    timestamps: true,
    paranoid: true,
})
export class Notification extends Model<Notification> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    notification_id: number

    //profile_sender_id

    //profile_receiver_id

    @Column(DataType.TEXT)
    content: string

    @Column
    notification_type: string 

    @Column
    was_seen: boolean

    @Column
    post_id: number

    @Column
    post_comment_id: number

    @Column(DataType.DATE(3))
    createdAt: string;
    
    @Column(DataType.DATE(3))
    updatedAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;
}