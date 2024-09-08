import { Controller, Post } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Post('upload-currencies-to-database')
  async createCurrency() {
    const updatedCurrencies = await this.currenciesService.uploadCurrenciesToDatabase();
    return { updatedCurrencies };
  }
}
