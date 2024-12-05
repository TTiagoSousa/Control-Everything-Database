import { Injectable } from '@nestjs/common';
import { addNewPlatform_dto } from './dto/add.new.platform';
import { addNewPlatform } from './helpers/add.new.platform';

@Injectable()
export class PlatformService {

  async addNewPlatform(dto: addNewPlatform_dto) {
    const result = await addNewPlatform(dto);
    return result;
  }

}
