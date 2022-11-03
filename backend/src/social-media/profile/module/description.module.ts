import { Module } from '@nestjs/common';
import { DescriptionController } from '../controller/description.controller';
import { DescriptionService } from '../service/description.service';

@Module({
  controllers: [DescriptionController],
  providers: [DescriptionService]
})
export class DescriptionModule {}
