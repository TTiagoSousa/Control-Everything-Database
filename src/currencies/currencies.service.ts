import { Injectable } from '@nestjs/common';
import { uploadCurrenciesToDatabase } from './helpers/upload.currencies.to.database';
import { updateCurrenciesRate } from './helpers/update.currencies.rate';

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
}
