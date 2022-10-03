import { Module } from '@nestjs/common';
import { profileProviders } from 'src/common/providers/all.providers';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository, ...profileProviders],
  exports: [ProfileRepository]
})
export class ProfileModule {}