import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
