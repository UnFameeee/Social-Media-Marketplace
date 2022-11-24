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
    variation_id: number;
    
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

    @Column(DataType.DATE(3))
    createdAt: string;
    
    @Column(DataType.DATE(3))
    updatedAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;
} 