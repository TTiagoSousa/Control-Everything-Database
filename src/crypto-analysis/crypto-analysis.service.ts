import { Injectable } from '@nestjs/common';
import { getSinglePriceCrypto } from './helpers/get.single.price';
@Injectable()
export class CryptoAnalysisService {

  async getSinglePriceCrypto(currencyId: string) {
    const result = await getSinglePriceCrypto(currencyId);
    return result;
  }
}
