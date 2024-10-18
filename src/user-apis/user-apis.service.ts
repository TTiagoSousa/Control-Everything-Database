import { Injectable } from '@nestjs/common';
import { AddNewApiKey } from './helpers/add.new.api';
import { AddNewApiKey_dto } from './dto/add.new.api.key_dto';

@Injectable()
export class UserApisService {

  async AddNewApiKey( dto: AddNewApiKey_dto, userId:string) {
    const result  = await AddNewApiKey(userId, dto);
    return result;
  }

}
