import { Exclude } from "class-transformer";
import { AllowNull, AutoIncrement, Column, DataType, Default, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Role } from "src/common/constants/role.constant";

@Table({
    tableName: 'User_Test_Data',
    timestamps: true,
    paranoid: true,

    scopes: {
        withPassword: {
            attributes: [],
        }
    },

    defaultScope: {
        attributes: { exclude: ['password'] },
    },

    indexes:[{unique: true, fields: ['id']}]
})
export class Profile extends Model<Profile> {
    @AutoIncrement
    @PrimaryKey
    @Unique({ name: 'cdkey_unique', msg: "cdkey_should_be_unique"}) 
    @AllowNull(false)
    @Column
    id: number;
    
    @Column
    username: string;

    @Column
    password: string;

    @Column
    name: string;

    @Default(18)
    @Column
    age: number;
    
    @Unique
    @Column
    email: string;

    @AllowNull
    @Column
    currentHashedRefreshToken: string;
    
    @Default(true)
    @Column
    isActivate: boolean;

    @Default(Role.User)
    @Column
    role: Role;

    @Column
    permission?: string;
}