import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'Claims',
})

export class Auth extends Model<Auth> {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: string;

    @Column
    claims: string;
}