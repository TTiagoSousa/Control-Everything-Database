import { Body, Controller, Post } from '@nestjs/common';
import { AssetTypeService } from './asset-type.service';
import { addNewAssetType_dto } from './dto/add.new.asset.type';

@Controller('asset-type')
export class AssetTypeController {
  constructor(private readonly assetTypeService: AssetTypeService) {}

  @Post('add-new-asset-type')
  async signup_User(@Body() dto: addNewAssetType_dto) {

    return this.assetTypeService.addNewAssetType(dto);
  }
}