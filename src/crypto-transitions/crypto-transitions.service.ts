import { Injectable } from '@nestjs/common';
import { createCryptoTransition } from './helpers/create.crypto.transition';
import { createCryptoTransition_dto } from './dto/create.crypto.transition.dto';
import { getTotalCryptoTransitionsByUserId } from './helpers/get.total.crypto.transitions.by.user';
import { getTotalPerCrypto } from './helpers/get.total.per.crypto';
import { getCryptoPortefolio } from './helpers/get.crypto.portfolio';
import { getTotalSpentPerCrypto } from './helpers/get.total.spent.per.crypto';
import { getCurrentInvestment } from './helpers/get.current.investent';
import { getTotalSpentAndCurrentInvestment } from './helpers/get.total.spent.and.current.investment';

@Injectable()
export class CryptoTransitionsService {

  async createCryptoTransition(dto: createCryptoTransition_dto, userId: string) { // Adicione o parâmetro cryptoId
    const result = await createCryptoTransition(dto, userId); // Chame a função com os parâmetros corretos
    return result;
  }

  async getTotalCryptoTransitionsByUserId(userId: string) { // Adicione o parâmetro cryptoId
    const result = await getTotalCryptoTransitionsByUserId(userId); // Chame a função com os parâmetros corretos
    return result;
  }

  async getTotalPerCrypto(userId: string){
    const result = await getTotalPerCrypto(userId);
    
    return result
  }

  async getCryptoPortefolio(userId: string){
    const result = await getCryptoPortefolio(userId);
    
    return result
  }

  async getTotalSpentPerCrypto(userId: string){
    const result = await getTotalSpentPerCrypto(userId);
    
    return result
  }

  async getTotalSpentAndCurrentInvestment(userId: string){
    const result = await getTotalSpentAndCurrentInvestment(userId);
    
    return result
  }
}
