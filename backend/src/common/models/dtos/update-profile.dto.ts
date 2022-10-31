import { IsEmail, IsEmpty, IsString, Matches, Min, Max, MaxLength, MinLength, IsNumber, IsOptional } from "class-validator";

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    profile_name: string;
    
    @IsOptional()
    @IsString()
    old_password: string;

    @IsOptional()
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password is to weak'})
    new_password: string;

    @IsOptional()
    @IsNumber()
    @Min(10)
    @Max(110)
    birth: string; 
    
    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;
}