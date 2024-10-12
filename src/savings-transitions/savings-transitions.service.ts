import { Injectable } from '@nestjs/common';
import { createSavingTransition } from './helpers/create.saving.transition';
import { createSavingTransition_dto } from './dto/create.saving.transition.dto';
import { printInvestments } from './helpers/get.total.per.currency.by.months';

@Injectable()
export class SavingsTransitionsService {

  async createSavingTransition(dto: createSavingTransition_dto, userId: string) {
    const result = await createSavingTransition(dto, userId);
    return result;
  }

  async printInvestments(userId: string) {
    const result = await printInvestments(userId);
    return result;
  }
}