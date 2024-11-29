import { Controller, Get, Param, Post } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get(':baseCurrency/:targetCurrency/:date')
  async getCurrencyRateByDate(
    @Param('baseCurrency') baseCurrency:string,
    @Param('targetCurrency') targetCurrency: string, 
    @Param('date') date: string) {

    try {
      const currencyRate = await this.currenciesService.getCurrencyRateByDate(baseCurrency, targetCurrency, date);
      return currencyRate;
    } catch (error) {

    }
  }

  @Post('upload-currencies-to-database')
  async createCurrency() {
    const uploadupdatedCurrencies = await this.currenciesService.uploadCurrenciesToDatabase();
    return { uploadupdatedCurrencies };
  }

}
