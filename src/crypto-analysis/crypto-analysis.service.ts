import { Injectable } from '@nestjs/common';
import { getSinglePriceCrypto } from './helpers/get.single.price';
import { getCryptoDetails } from './helpers/get.crypto.details';
@Injectable()
export class CryptoAnalysisService {

  async getSinglePriceCrypto(currencyId: string) {
    const result = await getSinglePriceCrypto(currencyId);
    return result;
  }

  async getCryptoDetails(currencyId: string) {
    const result = await getCryptoDetails(currencyId);
    return result;
  }
}
