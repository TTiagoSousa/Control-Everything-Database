import { Injectable } from '@nestjs/common';
import { addNewPlatform } from './helpers/add.new.platform';
import { addNewPlatform_dto } from './dto/add.new.platform';
import { GetPlatformsFromDataBase } from './helpers/get.platforms.from.database';

@Injectable()
export class PlatformsService {

  async addNewPlatform(dto: addNewPlatform_dto) {
    const result = await addNewPlatform(dto);
    return result;
  }

  async GetPlatformsFromDataBase() {
    const result = await GetPlatformsFromDataBase();
    return result;
  }
}
