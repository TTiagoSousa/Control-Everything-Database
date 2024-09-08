import axios from 'axios';
import { PrismaCurrencyRepository } from '../repository/prisma/prisma-currency-repisitory'; 

export async function uploadCurrenciesToDatabase() {

  const Currency_Api_Key: string = process.env.Currency_Api_Key;

  const currencyRepository = new PrismaCurrencyRepository();

  try{

    const currencyRateUrl  = `https://api.currencyapi.com/v3/latest?apikey=${Currency_Api_Key}&currencies=`;
    const responseCurrencyRate = await axios.get(currencyRateUrl);
    const currencyRates = responseCurrencyRate.data.data;

    const currencyNameUrl  = `https://api.currencyapi.com/v3/currencies?apikey=${Currency_Api_Key}&currencies=`;
    const responseCurrencyName = await axios.get(currencyNameUrl);
    const currencies = responseCurrencyName.data.data;

    for (const currencyCode in currencies) {
      // Verificar se a moeda está presente na currencyRateUrl e é do tipo "fiat"
      if (
        currencyRates.hasOwnProperty(currencyCode) &&
        currencies[currencyCode].type === 'fiat'
      ) {
        // Criar um novo objeto para a moeda, excluindo a propriedade 'countries'
        const { countries, ...currencyData } = currencies[currencyCode];
        // Adicionar a moeda ao objeto combinado e preencher com a taxa
        const rate = currencyRates[currencyCode].value;
        console.log("Chegou ao create")
        // Criar uma instância de Currency usando o currencyRepository
        await currencyRepository.create({
          code: currencyData.code,
          decimal_digits: currencyData.decimal_digits,
          name: currencyData.name,
          name_plural: currencyData.name_plural,
          rate: rate,
          rounding: currencyData.rounding,
          symbol: currencyData.symbol,
          symbol_native: currencyData.symbol_native,
          type: currencyData.type,
        });
      }
    }

  }catch(error){
    return  error
  }
}