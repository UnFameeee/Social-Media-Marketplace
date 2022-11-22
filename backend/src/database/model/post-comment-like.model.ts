import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
@Table({
    tableName: "post_comment_like",
    timestamps: false,
    indexes:[{unique: true, fields: ['post_comment_like_id']}]
})
export class PostCommentLike extends Model<PostCommentLike> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    post_comment_like_id: number;
}