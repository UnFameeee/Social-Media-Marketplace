import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants/jwt.constant';
import { ResponseData } from 'src/common/models/view-model/success-message.model';
import { compare, encode } from 'src/common/utils/bcrypt-singleton.utils';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { ProfileRepository } from 'src/social-media/profile/profile.repository';
import { RegisterProfileDto } from '../common/models/dtos/register-profile.dto';
import { TokenPayload } from './interface/tokenPayload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly profileRepository: ProfileRepository,
        private readonly jwtService: JwtService,
    ) { }

    async validateProfile(email: string, password: string): Promise<any> {
        const profile = await this.profileRepository.findProfileByEmail(email);
        if (profile && compare(password, profile.password)) {
            return profile;
        }
        return null;
    }

    async register(registerProfileDto: RegisterProfileDto): Promise<ResponseData<string>> {
        const responseData = new ResponseData<string>();
        try {

            if (await this.profileRepository.findProfileByEmail(registerProfileDto.email)) {
                throw new ConflictException("Email existed!!!");
            } else if (await this.profileRepository.findProfileByProfileName(registerProfileDto.profile_name)) {
                throw new ConflictException("Username existed!!!");
            }

            //Hashed password
            registerProfileDto.password = await encode(registerProfileDto.password)

            const user = await this.profileRepository.createNewProfile(registerProfileDto);
            if(user){
                responseData.results = "Register successfully"
            }
            return responseData;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async getAccessTokenThroughCookie(profile_id: number) {
        try {
            const profile = await this.profileRepository.findProfileById(profile_id);
            const payload: TokenPayload = { profile };
            const token = this.jwtService.sign(payload);
            // return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${jwtConstants.access_expires}`
            return token;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async getRefreshTokenThroughCookie(profile_id: number) {
        try {
            const profile = await this.profileRepository.findProfileById(profile_id);
            const payload: TokenPayload = { profile };
            const token = this.jwtService.sign(payload, {
                secret: jwtConstants.refresh_secret,
                expiresIn: jwtConstants.refresh_expires,
            });
            const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${jwtConstants.refresh_expires}`;
            return {
                cookie: cookie,
                token: token,
            };
        } catch (err) {
            ExceptionResponse(err);
        }
    }


    async login(profile: any) {
        try {
            const checkProfile = await this.profileRepository.findProfileByEmail(profile.email);
            if (!checkProfile) {
                throw new NotFoundException("Wrong Email of Password, please try again!");
            } else if (!checkProfile.isActivate) {
                throw new UnauthorizedException("This account has been disabled. Please contact the administrator for more information.");
            }

            const access = await this.getAccessTokenThroughCookie(checkProfile.profile_id);
            const refresh = await this.getRefreshTokenThroughCookie(checkProfile.profile_id)
            // const result = { access, refresh };
            const result = {access};
            return result;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async ModifiedCookieForLogout() {
        return [
            'Authentication=; HttpOnly; Path=/; Max-Age=0',
            'Refresh=; HttpOnly; Path=/; Max-Age=0'
        ];
    }
}
