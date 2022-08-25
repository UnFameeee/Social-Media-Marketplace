import {Column, Model, Table } from "sequelize-typescript";
@Table({
    tableName: "Friendships",
    timestamps: true,
    paranoid: true,
})
export class Friendship extends Model<Friendship> {
    @Column
    status: string
}