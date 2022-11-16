import { Module } from '@nestjs/common';
import { variationProviders } from 'src/database/providers/all.providers';
import { VariationController } from '../controller/variation.controller';
import { VariationRepository } from '../repository/variation.repository';
import { VariationService } from '../service/variation.service';


@Module({
  imports: [],
  providers: [
    VariationService,
    VariationRepository,
    ...variationProviders
  ],
  controllers: [VariationController],
  exports: [VariationRepository]
})
export class VariationModule {}
