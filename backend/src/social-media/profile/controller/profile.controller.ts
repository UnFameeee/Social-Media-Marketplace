import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Delete, Patch, Put } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from 'src/common/models/dtos/update-profile.dto';
import { Page } from 'src/common/models/view-model/page-model';
import { PagingData } from 'src/common/models/view-model/paging.model';
import { ResponseData } from 'src/common/models/view-model/success-message.model';
import { Profile } from '../model/profile.model';
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

    @ApiOperation({ description: 'Get profile by Id' })
    @Get("/:profile_id")
    GetProfileById(@Param("profile_id") profile_id: number): Promise<ResponseData<Profile>> {
        return this.profileService.getProfileById(profile_id);
    }

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
    @Put("/:profile_id")
    updateProfile(@Param("profile_id") profile_id: number, @Body() updateProfileDto: UpdateProfileDto): Promise<ResponseData<boolean>> {
        return this.profileService.updateProfile(profile_id, updateProfileDto);
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
}
