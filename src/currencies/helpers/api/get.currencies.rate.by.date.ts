import axios from 'axios';

export async function getCurrencyRateByDate(baseCurrency: string, targetCurrency: string, date: string) {
  const apiKey = process.env.Currency_Api_Key;
  // Certifique-se de verificar a chave da API antes de construir a URL
  if (!apiKey) {
      throw new Error("API key is not set in environment variables.");
  }

  const url = `https://api.currencybeacon.com/v1/historical?base=${baseCurrency}&symbols=${targetCurrency}&date=${date}&api_key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data && response.data.rates && response.data.rates[targetCurrency]) {
      return {
        date: date,
        rate: response.data.rates[targetCurrency],
        base: baseCurrency,
        currency: targetCurrency
      };
    } else {
      throw new Error(`Currency rate not found for ${targetCurrency} on the specified date.`);
    }
  } catch (error) {
    console.error("Error fetching currency rate:", error);
    throw error;
  }
}

// return
// {
//   "date": "2022-12-23",
//   "rate": 1.0617729,
//   "base": "EUR",
//   "currency": "USD"
// }