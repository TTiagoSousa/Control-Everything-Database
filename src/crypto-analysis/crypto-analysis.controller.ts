import { Controller, Get, Param } from '@nestjs/common';
import { CryptoAnalysisService } from './crypto-analysis.service';

@Controller('crypto-analysis')
export class CryptoAnalysisController {
  constructor(private readonly cryptoAnalysisService: CryptoAnalysisService) {}

  @Get(':currencyId/single-price')
  async getSinglePrice(@Param('currencyId') currencyId: string) {
    try {
      const price = await this.cryptoAnalysisService.getSinglePriceCrypto(currencyId);
      return { price };
    } catch (error) {
      return { error: 'Failed to fetch currency price' };
    }
  }
}
