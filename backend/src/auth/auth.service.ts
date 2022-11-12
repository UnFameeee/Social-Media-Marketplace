import { ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants/jwt.constant';
import { SCOPE } from 'src/common/constants/sequelize-scope.constant';
import { argon2_encode, argon2_verify } from 'src/common/utils/argon2-singleton.utils';
import { compare, encode } from 'src/common/utils/bcrypt-singleton.utils';
import { ExceptionResponse } from 'src/common/utils/custom-exception.filter';
import { ResponseData } from 'src/database/view-model/success-message.model';
import { ProfileRepository } from 'src/social-media/profile/repository/profile.repository';
import { RegisterProfileDto } from '../database/dtos/register-profile.dto';
import { TokenPayload } from './interface/tokenPayload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly profileRepository: ProfileRepository,
        private readonly jwtService: JwtService,
    ) { }

    async validateProfile(email: string, password: string): Promise<any> {
        const profile = await this.profileRepository.findProfileByEmail(email, SCOPE.WITH_PASSWORD);
        
        if (profile && await compare(password, profile.password)) {
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
            if (user) {
                responseData.results = "Register successfully"
            }
            return responseData;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async getAccessTokenThroughCookie(profile_id: number) {
        try {
            const profile = await this.profileRepository.findProfileById(profile_id, SCOPE.WITHOUT_PASSWORD);
            const payload: TokenPayload = { profile };
            const token = this.jwtService.sign(payload, {
                secret: jwtConstants.access_secret,
                expiresIn: jwtConstants.access_expires,
            });
            // return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${jwtConstants.access_expires}`
            return token;
        } catch (err) {
            ExceptionResponse(err);
        }
    }

    async getRefreshTokenThroughCookie(profile_id: number) {
        try {
            const profile = await this.profileRepository.findProfileById(profile_id, SCOPE.WITHOUT_PASSWORD);
            const payload: TokenPayload = { profile };

            const token = this.jwtService.sign({ profile_id }, {
                secret: jwtConstants.refresh_secret,
                expiresIn: jwtConstants.refresh_expires,
            });
            // const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${jwtConstants.refresh_expires}`;
            // return {
            //     cookie: cookie,
            //     token: token,
            // };
            return token;
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

            await this.updateRefreshToken(checkProfile.profile_id, refresh);

            const result = { access, refresh };
            return result;
        } catch (err) {
            ExceptionResponse(err);
        }
    }


    async getTokens(profile_id: number): Promise<any> {
        const Profile = await this.profileRepository.findProfileById(profile_id);
        const access = await this.getAccessTokenThroughCookie(Profile.profile_id);
        const refresh = await this.getRefreshTokenThroughCookie(Profile.profile_id)
        const result = { access, refresh };
        return result;
    }

    async ModifiedCookieForLogout() {
        return [
            'Authentication=; HttpOnly; Path=/; Max-Age=0',
            'Refresh=; HttpOnly; Path=/; Max-Age=0'
        ];
    }

    async updateRefreshToken(profile_id: number, refreshToken: string) {
        const hashedRefreshToken = await argon2_encode(refreshToken);
        await this.profileRepository.updateRefreshToken(profile_id, hashedRefreshToken)
    }

    async logout(profile: any): Promise<ResponseData<boolean>> {
        const response = new ResponseData<boolean>();
        response.results = await this.profileRepository.deleteRefreshToken(profile.profile_id);
        return response;
    }

    async refreshTokens(profile_id: number, refreshToken: string) {
        try {
            //If the token expired, it will catch by the guard.
            const profile = await this.profileRepository.findProfileRefreshById(profile_id);
            if (!profile || !profile.refreshToken)
                throw new ForbiddenException('Access Denied');

            const refreshTokenMatches = await argon2_verify(profile.refreshToken, refreshToken);

            if (!refreshTokenMatches) throw new ForbiddenException('RefreshToken Invalid');

            const token = await this.getTokens(profile_id);
            await this.updateRefreshToken(profile_id, token.refresh);
            return token;
        } catch (err) {
            ExceptionResponse(err);
        }
    }
}
