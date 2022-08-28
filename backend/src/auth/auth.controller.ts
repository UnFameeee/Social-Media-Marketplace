import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

    @UseGuards(AuthGuard('local'))
    @HttpCode(200)
    @Post("/login")
    async logIn(@Request() request: RequestWithProfile){
        return this.authService.login(request.user);
    }
}
