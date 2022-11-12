import {Column, DataType, Model, Table } from "sequelize-typescript";
@Table({
    tableName: "Friendships",
    timestamps: true,
    paranoid: true,
})
export class Friendship extends Model<Friendship> {
    @Column
    status: string

    @Column(DataType.VIRTUAL(DataType.NUMBER))
    get mutualFriend(): number {
        return this.getDataValue("mutualFriend");
    }

    set mutualFriend(value: number){
        this.setDataValue("mutualFriend", value);
    }
}