import { Injectable } from '@nestjs/common';
import { addCryptoToAsset } from './helpers/add.new.crypto.to.assets';
import { addNewAsset_dto } from './dto/add.new.asset';
import { getCryptoDetails } from './helpers/crypto/get.crypto.details';

@Injectable()
export class AssetsService {

  async addCryptoToAsset(cryptoApiId: string) {
    const result = await addCryptoToAsset(cryptoApiId);
    return result;
  }

  async getCryptoDetails(cryptoApiId: string) {
    const result = await getCryptoDetails(cryptoApiId);
    return result;
  }
}
