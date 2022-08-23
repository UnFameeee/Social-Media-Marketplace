import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ProfileModule } from './social-media/profile/profile.module';


@Module({
  imports: [ProfileModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
