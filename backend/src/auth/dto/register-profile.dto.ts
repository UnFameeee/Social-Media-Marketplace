import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterProfileDto {
    @IsString()
    @IsNotEmpty()
    profile_name: string;

    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(/((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password is to weak'})
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    birth: string;
}