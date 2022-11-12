import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
    tableName: "description",
    timestamps: true,
    paranoid: true,
})
export class Description extends Model<Description> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    description_id: number;

    //profile_id

    @Column(DataType.TEXT)
    description: string;

    @Column 
    school: string;

    @Column
    location: string;

    @Column
    career: string;
}