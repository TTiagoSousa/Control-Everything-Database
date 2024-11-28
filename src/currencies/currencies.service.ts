import { Injectable } from '@nestjs/common';
import { getCurrencyRateByDate } from './helpers/get.currencies.rate.by.date';
import { uploadCurrenciesToDatabase } from './helpers/upload.currencies.to.database';
import { updateHistoricalRateIfNeeded } from './helpers/update.historical.rate.if.needed';

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

  async updateHistoricalRateIfNeeded(currencyID: string, date: string) {
    const result = await updateHistoricalRateIfNeeded(currencyID, date);
    return result;
  }
}
