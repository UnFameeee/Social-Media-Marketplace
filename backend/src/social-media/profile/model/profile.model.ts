import { AllowNull, AutoIncrement, Column, DataType, Default, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Role } from "src/common/constants/role.constant";
@Table({
    tableName: "Profiles",
    timestamps: true,
    paranoid: true,

    defaultScope: {
        attributes: { exclude: ['password'] }
    },

    scopes: {
        WITH_PASSWORD: {
            attributes: { include: ['password'] }
        },
        
        WITHOUT_PASSWORD: {
            attributes: { exclude: ['password'] }
        }
    },

    indexes:[{unique: true, fields: ['profile_id']}]
})
export class Profile extends Model<Profile> {
    @AutoIncrement
    @PrimaryKey
    @AllowNull(false)
    @Column
    profile_id: number;
    
    @Column
    profile_name: string;

    @Unique
    @Column
    email: string;

    @Column
    password: string;

    @Column
    birth: string;

    @AllowNull
    @Column
    picture: string;
    
    @Default(true)
    @Column
    isActivate: boolean;

    @Default(Role.User)
    @Column
    role: Role;

    @AllowNull
    @Column
    permission: string;

    @Column(DataType.VIRTUAL(DataType.BOOLEAN))
    get isFriend(): boolean {
        return this.getDataValue("isFriend");
    }

    set isFriend(value: boolean){
        this.setDataValue("isFriend", value);
    }
}