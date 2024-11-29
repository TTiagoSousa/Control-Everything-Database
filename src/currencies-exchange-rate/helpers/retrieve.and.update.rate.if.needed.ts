import { BadGatewayException, BadRequestException } from "@nestjs/common";
import { PrismaCurrencyRepository } from "src/currencies/repository/prisma/prisma-currency-repisitory";
import { PrismaCurrenciesExchangeRateRepository } from "../repository/prisma/prisma-currencies-exchange-rate-repisitory";
import { getCurrencyRateByDate } from "src/currencies/helpers/api/get.currencies.rate.by.date";

export async function retrieveAndUpdateRateIfNeeded (
  currencyID: string,
  date: string
){

  // console.log('Starting process for', { currencyID, date });

  const CurrencyRepository = new PrismaCurrencyRepository();
  const CurrenciesExchangeRateRepository = new PrismaCurrenciesExchangeRateRepository()

  const currency = await CurrencyRepository.findByID(currencyID);
  if (!currency) { 
    throw new BadRequestException('Invalid currency ID provided.');
  }

  // console.log('Currency details:', {
  //   code: currency.code,
  //   createdAt: currency.createdAt,
  //   decimalMark: currency.decimal_mark,
  //   id: currency.id,
  //   name: currency.name,
  //   precision: currency.precision,
  //   rate: currency.rate,
  //   shortCode: currency.short_code,
  //   symbol: currency.symbol,
  //   symbolFirst: currency.symbol_first,
  //   thousandsSeparator: currency.thousands_separator,
  //   updatedAt: currency.updatedAt
  // });

  const existingRate = await CurrenciesExchangeRateRepository.findByCurrencyIdAndDate(currencyID, date);
  if (existingRate) {

    // console.log('Existing rate found:', {
    //   currencyId: existingRate.currencyId,
    //   date: existingRate.date,
    //   id: existingRate.id,
    //   rate: existingRate.rate
    // });

    return existingRate;
  }

  // console.log(`No rate found for currency ID ${currencyID} on ${date}. Attempting to fetch new rate.`);

  try {
    const baseCurrency = 'USD';
    const targetCurrency = currency.short_code;

    // console.log('Fetching new rate:', { baseCurrency, targetCurrency, date });

    const rateData = await getCurrencyRateByDate(baseCurrency, targetCurrency, date);
    if (!rateData || !rateData.rate) {
      throw new BadGatewayException('Failed to fetch rate from external API.');
    }

    const newRate = await CurrenciesExchangeRateRepository.create({
      currencyId: currencyID,
      date: new Date(date),
      rate: rateData.rate,
    });

    // console.log('New rate successfully fetched and stored:', newRate);

    return newRate;
  } catch(error) {

    // console.log(`Error fetching rate for ${currency.code} on ${date}:`, error);
    throw new BadGatewayException(`Failed to fetch rate: ${error.message}`);
  }
}