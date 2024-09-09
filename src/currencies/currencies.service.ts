import { Injectable } from '@nestjs/common';
import { uploadCurrenciesToDatabase } from './helpers/upload.currencies.to.database';
import { updateCurrenciesRate } from './helpers/update.currencies.rate';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CurrenciesService {

  async uploadCurrenciesToDatabase() {
    const result = await uploadCurrenciesToDatabase();
    return result;
  }
  
  async updateCurrenciesRate() {
    const result = await updateCurrenciesRate();
    return result;
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    const result = await updateCurrenciesRate();
    return result
  }
  
}
