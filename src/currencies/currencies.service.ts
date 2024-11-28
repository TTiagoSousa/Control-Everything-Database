import { Injectable } from '@nestjs/common';
import { uploadCurrenciesToDatabase } from './helpers/upload.currencies.to.database';
import { retrieveAndUpdateRateIfNeeded } from './helpers/retrieve.and.update.rate.if.needed';
import { getCurrencyRatesByID } from './helpers/get.currencies.rate.by.id';
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

  async retrieveAndUpdateRateIfNeeded(currencyID: string, date: string) {
    const result = await retrieveAndUpdateRateIfNeeded(currencyID, date);
    return result;
  }

  async getCurrencyRatesByID(currencyID: string) {
    const result = await getCurrencyRatesByID(currencyID);
    return result;
  }
}
