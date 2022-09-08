import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Delete, Patch, Put } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './model/profile.model';
import { ProfileService } from './profile.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Profile')
@Controller('/api/profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}
    
    @Get()
    GetProfile(): Promise<Profile[]> {
        return this.profileService.getAllProfile();
    }

    @Get("/:profile_id")
    GetProfileById(@Param("profile_id") profile_id: number): Promise<Profile>{
        return this.profileService.getProfileById(profile_id);
    }

    @Put("/:profile_id")
    updateProfile(@Param("profile_id") profile_id: number, @Body() updateProfileDto: UpdateProfileDto): Promise<Profile>{
        return this.profileService.updateProfile(profile_id, updateProfileDto);
    }

    @Delete("/:profile_id")
    deActivateProfile(@Param("profile_id") profile_id: number): Promise<void> {
        return this.profileService.deActivateProfile(profile_id);
    }

    @Patch("/:profile_id")
    activateUser(@Param("profile_id") profile_id: number): Promise<void> {
        return this.profileService.activateProfile(profile_id);
    }
}
