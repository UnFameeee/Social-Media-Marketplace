import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
@Table({
    tableName: 'Posts',
    timestamps: true,
    paranoid: true,

    defaultScope: {attributes: { exclude: ['deletedAt'] },},

    // indexes:[{unique: true, fields: ['post_id']}]
})
export class Post extends Model<Post> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    post_id: number;
    
    @Column(DataType.TEXT)
    written_text: string;

    @Column(DataType.DATE(3))
    createdAt: string;
    
    @Column(DataType.DATE(3))
    updatedAt: string;

    @Column(DataType.DATE(3))
    deletedAt: string;

    // @Column
    // media_type: string;

    // @Column(DataType.TEXT)
    // media_location: string;

    @Column(DataType.VIRTUAL(DataType.NUMBER))
    get totalLike(): number{
        return this.getDataValue("totalLike");
    }

    set totalLike(value: number){
        this.setDataValue("totalLike", value);
    }

    @Column(DataType.VIRTUAL(DataType.BOOLEAN))
    get isLiked(): boolean{
        return this.getDataValue("isLiked");
    }

    set isLiked(value: boolean){
        this.setDataValue("isLiked", value);
    }
}