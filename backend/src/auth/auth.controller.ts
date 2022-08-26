import { Body, Controller, HttpCode, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterProfileDto } from './dto/register-profile.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {};

    @HttpCode(201)
    @Post("/register")
    async register(@Body() registerProfileDto: RegisterProfileDto){
        return this.authService.register(registerProfileDto);
    }

    @HttpCode(200)
    @Post("/login")
    async logIn(@Request() request: RequestWithProfile){
        return this,this.authService.login(request.profile);
    }
}
