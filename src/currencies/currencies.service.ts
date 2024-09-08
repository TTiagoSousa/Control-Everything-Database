import { Injectable } from '@nestjs/common';
import { uploadCurrenciesToDatabase } from './helpers/upload.currencies.to.database';

@Injectable()
export class CurrenciesService {

  async uploadCurrenciesToDatabase() {
    const result = await uploadCurrenciesToDatabase();
    return result;
  }
  
}
