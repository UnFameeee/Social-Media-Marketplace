import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
    tableName: "variation",
    timestamps: true,
    paranoid: true,
})
export class Variation extends Model<Variation> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    category_id: number;
    
    @Column
    brand: string;

    @Column
    color: string;

    @Column
    condition: string;

    @Column
    type: string;

    @Column
    guarantee: string;
} 