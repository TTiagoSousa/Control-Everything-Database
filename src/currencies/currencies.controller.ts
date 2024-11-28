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

  @Post('update-historical-rate/:currencyID/:date')
  async updateHistoricalRateIfNeeded(
    @Param('currencyID') currencyID:string,
    @Param('date') date: string) {

    try {
      const currencyRate = await this.currenciesService.updateHistoricalRateIfNeeded(currencyID, date);
      return currencyRate;
    } catch (error) {

    }
  }

  @Get('get-historical-rate/:currencyID')
  async getCurrencyRatesByID(
    @Param('currencyID') currencyID:string,) {

    try {
      const currencyRate = await this.currenciesService.getCurrencyRatesByID(currencyID);
      return currencyRate;
    } catch (error) {

    }
  }
}
