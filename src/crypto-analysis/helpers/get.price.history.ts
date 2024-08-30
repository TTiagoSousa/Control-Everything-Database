import axios from 'axios';

export async function getPriceHistory(cryptoId: string, timePeriod: string) {
  const apiKey = process.env.CoinRanking_API_Key;

  try {
    const response = await axios.get(`https://api.coinranking.com/v2/coin/${cryptoId}/history?timePeriod=${timePeriod}`, {
      headers: {
        'x-access-token': apiKey // Define o cabeçalho com a chave da API
      }
    });

    const responseData = response.data; // Obtém os dados da resposta da API
    const historyData = responseData.data.history; // Obtém o histórico de preços da resposta

    return { id: cryptoId, history: historyData };

  } catch (error) {
    throw new Error('Failed to fetch currency price history from API');
  }
}