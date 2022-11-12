import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
@Table({
    tableName: "parent_child_comment",
    timestamps: true,
    paranoid: true,

    indexes:[{unique: true, fields: ['parent_child_comment_id']}]
})
export class ParentChildComment extends Model<ParentChildComment> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    parent_child_comment_id: number;
}