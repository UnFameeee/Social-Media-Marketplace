import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Profile } from 'src/database/model/profile.model';
import { ResponseData } from 'src/database/view-model/success-message.model';
import { VariationService } from '../service/variation.service';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Address')
@Controller('/api/variation')
export class VariationController {
    constructor(private readonly variationService: VariationService) { }
    

}
