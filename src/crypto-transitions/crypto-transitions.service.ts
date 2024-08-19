import { Injectable } from '@nestjs/common';
import { createCryptoTransition } from './helpers/create.crypto.transition';
import { createCryptoTransition_dto } from './dto/create.crypto.transition.dto';
import { getTotalCryptoTransitionsByUserId } from './helpers/get.total.crypto.transitions.by.user';

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
}
