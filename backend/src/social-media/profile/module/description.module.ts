import { Module } from '@nestjs/common';
import { descriptionProviders } from 'src/database/providers/all.providers';
import { DescriptionController } from '../controller/description.controller';
import { DescriptionRepository } from '../repository/description.repository';
import { DescriptionService } from '../service/description.service';

@Module({
  imports: [],
  controllers: [DescriptionController],
  providers: [DescriptionService, DescriptionRepository, ...descriptionProviders],
  exports: [DescriptionRepository]
})
export class DescriptionModule {}
