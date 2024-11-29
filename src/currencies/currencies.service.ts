import { Injectable } from '@nestjs/common';
import { uploadCurrenciesToDatabase } from './helpers/upload.currencies.to.database';
import { getCurrencyRateByDate } from './helpers/api/get.currencies.rate.by.date';

@Injectable()
export class CurrenciesService {

  async getCurrencyRateByDate(baseCurrency: string, targetCurrency: string, date: string) {
    const result = await getCurrencyRateByDate(baseCurrency, targetCurrency, date);
    return result;
  }

  async uploadCurrenciesToDatabase() {
    const result = await uploadCurrenciesToDatabase();
    return result;
  }
}
