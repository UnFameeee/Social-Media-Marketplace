import { Body, Controller, Get, Param, Post, UseGuards, Request } from '@nestjs/common';
import { Delete, Patch, Put, Query } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from 'src/database/dtos/update-profile.dto';
import { Profile } from 'src/database/model/profile.model';
import { Page } from 'src/database/view-model/page-model';
import { PagingData } from 'src/database/view-model/paging.model';
import { ResponseData } from 'src/database/view-model/success-message.model';
import { ProfileService } from '../service/profile.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Profile')
@Controller('/api/profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Get()
    GetProfile(@Body() page: Page): Promise<ResponseData<PagingData<Profile[]>>> {
        return this.profileService.getAllProfile(page);
    }

    // @ApiOperation({ description: 'Get profile by Id' })
    // @Get("/:profile_id")
    // GetProfileById(@Param("profile_id") profile_id: number): Promise<ResponseData<Profile>> {
    //     return this.profileService.getProfileById(profile_id);
    // }

    @ApiBody({
        type: Profile,
        description: `
        Update Profile`,
        examples: {
            ex1: {
                summary: "Empty Data",
                description: `{ "profile_id": 9,
                "profile_name": "TEST QT",
                "email": "test@gmail.com",
                "password": "test edit",
                "birth": null,
                "picture": null }`,
                value: {}
            },
            ex2: {
                summary: "Sample Data",
                description: "Sample input for this API",
                value: {
                    "profile_id": 9,
                    "profile_name": "TEST QT",
                    "email": "test@gmail.com",
                    "password": "test edit",
                    "birth": null,
                    "picture": null
                }
            }
        }
    })
    //Update self profile
    @Put("")
    updateProfile(@Request() request: any, @Body() updateProfileDto: UpdateProfileDto): Promise<ResponseData<string>> {
        const profile = <Profile>request.user;
        return this.profileService.updateProfile(profile, updateProfileDto);
    }

    
    @ApiOperation({ description: 'Deactivate User' })
    @Delete("/:profile_id")
    deActivateProfile(@Param("profile_id") profile_id: number): Promise<ResponseData<boolean>> {
        return this.profileService.deActivateProfile(profile_id);
    }

    @ApiOperation({ description: 'Activate User' })
    @Patch("/:profile_id")
    activateUser(@Param("profile_id") profile_id: number): Promise<ResponseData<boolean>> {
        return this.profileService.activateProfile(profile_id);
    }

    @Post("/friendSuggestion")
    async friendSuggestion(@Request() request: any, @Body() page: Page) {
        const profile = <Profile>request.user;
        return await this.profileService.friendSuggestion(profile, page);
    }

    @Get("/getProfileDetailById/:profile_target_id")
    async getProfileDetailById(@Request() request: any, @Param("profile_target_id") profile_target_id: number) {
        const profile = <Profile>request.user;
        return await this.profileService.getProfileDetailById(profile, profile_target_id);
    }

    @Post("galleryImage/:profile_id")
    async getProfileGalleryImageById(@Param("profile_id") profile_id: number, @Body() page: Page){
        return await this.profileService.getProfileGalleryById(profile_id, page);
    }

    @Post("search")
    async searchProfile(@Request() request: any, @Query("name") profile_name: string, @Body() page: Page) {
        const profile = <Profile>request.user;
        return await this.profileService.searchProfile(profile.profile_id, profile_name, page);
    }
}