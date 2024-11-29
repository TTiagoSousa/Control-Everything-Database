import { Injectable } from '@nestjs/common';
import { retrieveAndUpdateRateIfNeeded } from './helpers/retrieve.and.update.rate.if.needed';

@Injectable()
export class CurrenciesExchangeRateService {

  async retrieveAndUpdateRateIfNeeded(currencyID: string, date: string) {
    const result = await retrieveAndUpdateRateIfNeeded(currencyID, date);
    return result;
  }

}
