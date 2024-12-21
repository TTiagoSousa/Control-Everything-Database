import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { addNewAsset_dto } from './dto/add.new.asset';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post(':cryptoApiId/add-new-crypto-to-assets-list')
  async addCryptoToAsset(
    @Param('cryptoApiId') cryptoApiId: string  // Obtém cryptoApiId dos parâmetros da URL
  ) {
    return this.assetsService.addCryptoToAsset(cryptoApiId);
  }

  @Get(':cryptoApiId/crypto-get-coin-details')
  async getCryptoDetails(@Param('cryptoApiId') cryptoApiId: string) {
    
    return this.assetsService.getCryptoDetails(cryptoApiId)
  }

}
