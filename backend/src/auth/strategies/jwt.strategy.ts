import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { jwtConstants } from "src/common/constants/jwt.constant";
import { TokenPayload } from "../interface/tokenPayload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.access_secret,
        })
    }
    async validate(payload: TokenPayload) {
        return {
            profile_id: payload.profile.profile_id,
            profile_name: payload.profile.profile_name,
        }
    }
}