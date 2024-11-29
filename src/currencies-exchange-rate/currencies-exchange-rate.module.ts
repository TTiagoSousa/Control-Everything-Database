import { Module } from '@nestjs/common';
import { CurrenciesExchangeRateService } from './currencies-exchange-rate.service';
import { CurrenciesExchangeRateController } from './currencies-exchange-rate.controller';

@Module({
  controllers: [CurrenciesExchangeRateController],
  providers: [CurrenciesExchangeRateService],
})
export class CurrenciesExchangeRateModule {}
