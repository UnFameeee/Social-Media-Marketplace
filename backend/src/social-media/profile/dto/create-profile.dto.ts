import { IsEmail, IsNotEmpty, IsString, Matches, Min, Max, MaxLength, MinLength, IsNumber } from "class-validator";

export class CreateProfileDto {
    @IsNotEmpty()
    @IsString()
    profile_name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password is to weak'})
    password: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(10)
    @Max(110)
    age: number;
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    birth: string;

}