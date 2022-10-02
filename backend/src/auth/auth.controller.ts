import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Profile } from 'src/social-media/profile/model/profile.model';
import { AuthService } from './auth.service';
import { RegisterProfileDto } from '../common/models/dtos/register-profile.dto';
import RequestWithProfile from './interface/requestWithProfile.interface';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { };

    @ApiBody({
        type: Profile,
        description: `path: /api/auth/login`,
        examples: {
            ex1: {
                summary: "Empty Data",
                description: `{
                    "profile_name": "TestProfile123",
                    "email": "test123@gmail.com",
                    "password": "Lmao123!!!",
                    "birth": "test birth"
                }`,
                value: {} as Profile
            },
            ex2: {
                summary: "Sample Data",
                description: "Sample input for this API",
                value: {
                    "profile_name": "TestProfile123",
                    "email": "test123@gmail.com",
                    "password": "Lmao123!!!",
                    "birth": "test birth"
                } as Profile
            }
        }
    })
    @HttpCode(201)
    @Post("/register")
    async register(@Body() registerProfileDto: RegisterProfileDto) {
        return this.authService.register(registerProfileDto);
    }

    // @ApiOperation({ summary: 'Operation description' })
    @ApiBody({
        type: Profile,
        description: `
        Login API. This will need {email, password} to use. 
        The reponse will be {access_token, refresh_token}
        path: /api/auth/login`,
        examples: {
            ex1: {
                summary: "Empty Data",
                description: `{ 'email': 'test123@gmail.com', 'hashPassword': 'Lmao123!!!'}`,
                value: {} as Profile
            },
            ex2: {
                summary: "Sample Data",
                description: "Sample input for this API",
                value: { email: "test123@gmail.com", password: "Lmao123!!!" } as Profile
            }
        }
    })
    @UseGuards(AuthGuard('local'))
    @HttpCode(200)
    @Post("/login")
    async logIn(@Request() request: RequestWithProfile) {
        return this.authService.login(request.user);
    }
}
