import { Injectable } from '@nestjs/common';
import { createCryptoTransition } from './helpers/create.crypto.transition';
import { createCryptoTransition_dto } from './dto/create.crypto.transition.dto';
import { getCryptoPortefolio } from './helpers/get.crypto.portfolio';

@Injectable()
export class CryptoTransitionsService {

  async createCryptoTransition(dto: createCryptoTransition_dto, userId: string) { // Adicione o parâmetro cryptoId
    const result = await createCryptoTransition(dto, userId); // Chame a função com os parâmetros corretos
    return result;
  }

  async getCryptoPortefolio(userId: string){
    const result = await getCryptoPortefolio(userId);
    
    return result
  }
}