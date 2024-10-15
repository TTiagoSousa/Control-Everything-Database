import { Injectable } from '@nestjs/common';
import { addNewAutorizedBroker_dto } from './dto/add.new.autorized.broker.api_dto';
import { addNewBroker } from './helpers/add.new.broker';

@Injectable()
export class AutorizedBrokerApiService {

  async addNewBroker(userId: string, dto: addNewAutorizedBroker_dto) {
    const result = await addNewBroker(userId, dto);
    return result;
  }

}
