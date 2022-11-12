import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
@Table({
    tableName: "Posts_Like",
    timestamps: false,
    indexes:[{unique: true, fields: ['post_like_id']}]
})
export class PostLike extends Model<PostLike> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    post_like_id: number;
}