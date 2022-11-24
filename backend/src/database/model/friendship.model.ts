import {Column, DataType, Model, Table } from "sequelize-typescript";
@Table({
    tableName: "Friendships",
    timestamps: true,
    paranoid: true,
})
export class Friendship extends Model<Friendship> {
    @Column
    status: string

    @Column(DataType.DATE(3))
    createdAt: string;
    
    @Column(DataType.DATE(3))
    updatedAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;

    @Column(DataType.VIRTUAL(DataType.NUMBER))
    get mutualFriend(): number {
        return this.getDataValue("mutualFriend");
    }

    set mutualFriend(value: number){
        this.setDataValue("mutualFriend", value);
    }
}