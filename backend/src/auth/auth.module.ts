import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/common/constants/jwt.constant';
import { ProfileModule } from 'src/social-media/profile/module/profile.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/auth.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Module({
    imports: [ProfileModule, PassportModule, ConfigModule,
        JwtModule.register({
            secret: jwtConstants.access_secret,
            signOptions: {
                expiresIn: jwtConstants.access_expires,
            }
        })],
    providers: [
        AuthService, LocalStrategy, JwtStrategy, RefreshTokenStrategy
    ],
    controllers: [AuthController],
})
export class AuthModule { }
