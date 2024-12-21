import axios from 'axios';

export async function getCryptoDetails(
  currencyId: string
) {

  const apiKey = process.env.CoinRanking_API_Key;
  
  try {

    const response = await axios.get(`https://api.coinranking.com/v2/coin/${currencyId}`, {
      headers: {
        'x-access-token': apiKey // Define o cabeçalho com a chave da API
      }
    });
    const cryptoDetails = response.data;

    return cryptoDetails

  } catch (error) {
    throw new Error('Failed to fetch currency price from API');
  }
}