import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "src/common/constants/jwt.constant";
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.refresh_secret,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any){
        const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
        return {...payload, refreshToken};
    }
}