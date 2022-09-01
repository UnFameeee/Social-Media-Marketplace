import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { Profile } from 'src/social-media/profile/model/profile.model';
import { AuthService } from './auth.service';
import { RegisterProfileDto } from './dto/register-profile.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import RequestWithProfile from './interface/requestWithProfile.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {};

    @HttpCode(201)
    @Post("/register")
    async register(@Body() registerProfileDto: RegisterProfileDto){
        return this.authService.register(registerProfileDto);
    }

    // @ApiParam({
    //     name: "test",
    //     description: "This Decorator specifies the documentation for a specific Parameter, in this case the <b>name</b> Param.",
    //     allowEmptyValue: false,
    //     examples: {
    //         a: {
    //             summary: "Name is Pete",
    //             description: "Pete can be provided as a name. See how it becomes a selectable option in the dropdown",
    //             value: "Pete"
    //         },
    //         b: {
    //             summary: "Name is Joe",
    //             value: "Joe"
    //         }
    //     }
    // })
    @ApiBody({
        type: Profile,
        description: "Login API. This will need {email, hashPassword} to use. The reponse will be access_token, refresh_token",
        examples: {
            ex1: {
                summary: "Empty Data",
                description: "{ 'email': 'test12@gmail.com', 'hashPassword': 'Lmao123!!!'}",
                value: {} as Profile
            },
            ex2: {
                summary: "Sample Data",
                description: "Sample input for this API",
                value: {email: "test12@gmail.com", hashPassword: "Lmao123!!!"} as Profile
            }
        }
    
    })
    @UseGuards(AuthGuard('local'))
    @HttpCode(200)
    @Post("/login")
    async logIn(@Request() request: RequestWithProfile){
        return this.authService.login(request.user);
    }
}
