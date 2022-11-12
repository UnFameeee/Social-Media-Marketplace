import { Body, Controller, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Description } from 'src/database/model/description.model';
import { Profile } from 'src/database/model/profile.model';
import { DescriptionService } from '../service/description.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Profile')
@Controller('/api/profile/description')
export class DescriptionController {
    constructor(private readonly descriptionService: DescriptionService) {}

    @Put("")
    async updateProfileDescription(@Request() request: any, @Body() data: Description){
        const profile = <Profile>request.user;
        return await this.descriptionService.updateProfileDescription(profile.profile_id, data);
    }
}
