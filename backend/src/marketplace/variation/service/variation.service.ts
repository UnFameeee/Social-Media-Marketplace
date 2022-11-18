import { Injectable } from '@nestjs/common';
import { VariationRepository } from '../repository/variation.repository';

@Injectable()
export class VariationService {
    constructor(private readonly variationRepository: VariationRepository) { }
}
