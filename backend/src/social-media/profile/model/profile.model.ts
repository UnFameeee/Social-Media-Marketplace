import { AllowNull, AutoIncrement, Column, Default, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Role } from "src/common/constants/role.constant";
@Table({
    tableName: "Profiles",
    timestamps: true,
    paranoid: true,

    scopes: {
        withoutPass: {
            attributes: { exclude: ['password'] },
        }
    },

    defaultScope: {},

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
}