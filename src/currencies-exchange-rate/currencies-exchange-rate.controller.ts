import { Controller, Get, Param } from '@nestjs/common';
import { CurrenciesExchangeRateService } from './currencies-exchange-rate.service';

@Controller('currencies-exchange-rate')
export class CurrenciesExchangeRateController {
  constructor(private readonly currenciesExchangeRateService: CurrenciesExchangeRateService) {}

  @Get(':currencyID/:date')
  async retrieveAndUpdateRateIfNeeded(
    @Param('currencyID') currencyID:string,
    @Param('date') date: string) {

      const currencyRate = await this.currenciesExchangeRateService.retrieveAndUpdateRateIfNeeded(currencyID, date);
      return currencyRate;
  }

}
