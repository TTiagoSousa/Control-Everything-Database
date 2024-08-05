import { Injectable } from '@nestjs/common';
import { transfersBetweenSavings } from './helpers/transfers.between.savings';
import { transferSavingTransition_dto } from 'src/saving-transitions/dto/transfer.savings.transition.dto';

@Injectable()
export class TransfersService {
  
  async transfersBetweenSavings(dto: transferSavingTransition_dto, userId: string) {
    const result = await transfersBetweenSavings(dto, userId);
    return result;
  }

}
