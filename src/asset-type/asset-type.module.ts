import { Module } from '@nestjs/common';
import { AssetTypeService } from './asset-type.service';
import { AssetTypeController } from './asset-type.controller';

@Module({
  controllers: [AssetTypeController],
  providers: [AssetTypeService],
})
export class AssetTypeModule {}
