import { Injectable } from '@nestjs/common';
import { getTotalHeritageConverted } from './helpers/get.total.heritage.converted';

@Injectable()
export class HeritageService {

  async getTotalHeritageConverted(userId: string, targetConvertion:string) {
    const result = await getTotalHeritageConverted(userId, targetConvertion);
    return result;
  }

}
