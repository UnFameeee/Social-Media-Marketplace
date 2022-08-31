import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfileController } from './profile.controller';
import { profileProviders } from './profile.provider';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository, ...profileProviders],
  exports: [ProfileRepository]
})
export class ProfileModule {}
