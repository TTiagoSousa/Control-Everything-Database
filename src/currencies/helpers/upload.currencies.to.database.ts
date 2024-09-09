import axios from 'axios';
import { PrismaCurrencyRepository } from '../repository/prisma/prisma-currency-repisitory'; 

interface Currency {
  id: number;
  name: string;
  short_code: string;
  code: string;
  precision: number;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  decimal_mark: string;
  thousands_separator: string;
  rate?: number | null;
}

export async function uploadCurrenciesToDatabase() {

  const currencyRepository = new PrismaCurrencyRepository();

  try{

    const currencyRateUrl = `${process.env.Currency_Api}/latest?base=USD&api_key=${process.env.Currency_Api_Key}`;
    const responseCurrencyRate = await axios.get(currencyRateUrl);
    const currencyRates = responseCurrencyRate.data.response.rates;
  
    const currencyNameUrl  = `${process.env.Currency_Api}/currencies?api_key=${process.env.Currency_Api_Key}`;
    const responseCurrencyName = await axios.get(currencyNameUrl);
    const currencies = responseCurrencyName.data.response;
  
    const combinedCurrencies = currencies.map((currency: Currency) => {
      const rate = currencyRates[currency.short_code] || 0;  // Default to 0 if rate is not available
      return {
        ...currency,
        rate: rate
      };
    });
  
    for (const currency of combinedCurrencies) {
      await currencyRepository.create({
        name: currency.name,
        short_code: currency.short_code,
        code: currency.code,
        precision: currency.precision,
        symbol: currency.symbol,
        symbol_first: currency.symbol_first,
        decimal_mark: currency.decimal_mark,
        thousands_separator: currency.thousands_separator,
        rate: currency.rate,
      });
    }

    return true

  }catch(error){
    return error
  }

}