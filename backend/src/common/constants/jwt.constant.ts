import { ConfigService } from '@nestjs/config';

let configService: ConfigService;
export const jwtConstants = {
    access_secret: configService.get("JWT_ACCESS_SECRET_KEY"),
    access_expires: configService.get("JWT_ACCESS_EXPIRES_TIME"),
    refresh_secret: configService.get("JWT_REFRESH_SECRET_KEY"),
    refresh_expires: configService.get("JWT_REFRESH_EXPIRES_TIME"),
}