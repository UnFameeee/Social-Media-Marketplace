import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProfileModule } from './social-media/profile/profile.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ProfileModule, DatabaseModule, AuthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
