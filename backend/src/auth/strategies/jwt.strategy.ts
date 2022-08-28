import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { jwtConstants } from "src/common/constants/jwt.constant";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.access_secret,
        })
    }
    async validate(payload: any) {
        return {
            profile_id: payload.profile_id,
            profile_name: payload.profile_name,
            role: payload.role,
        }
    }
}