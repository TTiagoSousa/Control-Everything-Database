import { Controller, Patch, Post } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Post('upload-currencies-to-database')
  async createCurrency() {
    const uploadupdatedCurrencies = await this.currenciesService.uploadCurrenciesToDatabase();
    return { uploadupdatedCurrencies };
  }

  @Patch('update-currencies-rate')
  async updateCurrenciesRate() {
    const updatedCurrencies = await this.currenciesService.updateCurrenciesRate();
    return { updatedCurrencies };
  }
}
