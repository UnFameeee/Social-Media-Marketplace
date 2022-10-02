import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
@Table({
    tableName: 'Posts',
    timestamps: true,
    paranoid: true,

    // indexes:[{unique: true, fields: ['post_id']}]
})
export class Post extends Model<Post> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    post_id: number;
    
    @Column
    written_text: string;

    @Column
    media_type: string;

    @Column
    media_location: string;
}