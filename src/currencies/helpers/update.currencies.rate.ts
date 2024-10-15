import axios from 'axios';
import { PrismaCurrencyRepository } from '../repository/prisma/prisma-currency-repisitory'; 

export async function updateCurrenciesRate() {

  const currencyRepository = new PrismaCurrencyRepository();

  const currencyRateUrl = `${process.env.Currency_Api}/latest?base=USD&api_key=${process.env.Currency_Api_Key}`;
  const responseCurrencyRate = await axios.get(currencyRateUrl);
  const currencyRates = responseCurrencyRate.data.response.rates;

  const allCurrencies = await currencyRepository.findAll();

  for (const currency of allCurrencies) {
    const rate = currencyRates[currency.short_code];
    if (rate) {
      await currencyRepository.updateRate(currency.short_code, rate);
    }
  }

  return 'Currencies updated successfully';
}