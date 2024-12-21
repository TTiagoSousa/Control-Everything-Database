import { Injectable } from '@nestjs/common';
import { addNewAssetType_dto } from './dto/add.new.asset.type';
import { addNewAssetType } from './helpers/add.new.platform';

@Injectable()
export class AssetTypeService {

  async addNewAssetType(dto: addNewAssetType_dto) {
    const result = await addNewAssetType(dto);
    return result;
  }

}
