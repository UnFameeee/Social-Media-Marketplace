import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({ usernameField: 'email', password: 'hashPassword' });
    }
    async validate(email: string, hashPassword: string): Promise<any> {
        const profile = await this.authService.validateProfile(email, hashPassword);
        if(!profile){
            throw new UnauthorizedException();
        }
        return profile;
    }
}