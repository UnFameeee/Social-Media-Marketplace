import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
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

    @Column(DataType.TEXT)
    comment_text: string;

    @Column(DataType.DATE(3))
    createdAt: string;
    
    @Column(DataType.DATE(3))
    updatedAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;
}