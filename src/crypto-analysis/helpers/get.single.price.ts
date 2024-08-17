import axios from 'axios';

export async function getSinglePriceCrypto(currencyId: string) {

  const apiKey = process.env.CoinRanking_API_Key;
  
  try {

    const response = await axios.get(`https://api.coinranking.com/v2/coin/${currencyId}/price`, {
      headers: {
        'x-access-token': apiKey // Define o cabeçalho com a chave da API
      }
    });
    const currencyPrice = response.data.data.price;
    return parseFloat(currencyPrice);

  } catch (error) {
    throw new Error('Failed to fetch currency price from API');
  }
}