import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
@Table({
    tableName: "Posts_Comment",
    timestamps: true,
    paranoid: true,

    indexes:[{unique: true, fields: ['post_comment_id']}]
})
export class PostComment extends Model<PostComment> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    post_comment_id: number;

    @Column
    comment_text: string;
}