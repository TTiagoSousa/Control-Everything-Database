import { getPriceHistory } from "src/crypto-analysis/helpers/get.price.history"; 
import { PrismaCryptoTransitionsRepository } from "src/crypto-transitions/repositories/prisma/prisma-crypto-transitions-repisitory"; 
import { getTotalPerCrypto } from "src/crypto-transitions/helpers/get.total.per.crypto"; 
import { roundToFixed } from "src/utils/numbers/round.to.fixed";

interface PriceData {
  price: string;
  dateTime: Date;
}

interface CryptoData {
  cryptoID: string;
  cryptoName: string;
  cryptoSymbol: string;
  cryptoImage: string;
  totalSpendInUSD: number;
  quantityPurchased: number;
  purchaseDate: Date;
}


export async function calculateCryptoValueEvolution(
  userId: string,
  timePeriod: string,
) {
  const CryptoTransitionRepository = new PrismaCryptoTransitionsRepository();
  const totalPerCoins = await getTotalPerCrypto(userId);

  const priceHistoryPromises = [];

  // Objeto para armazenar a soma dos valores de cada moeda por data e hora
  const consolidatedValues: { [dateTime: string]: number } = {};

  for (const coin of totalPerCoins.cryptoTable) {
    const { cryptoID, quantityPurchased } = coin;

    try {
      // Obtém a data de compra da criptomoeda
      const purchaseDate = await CryptoTransitionRepository.getPurchaseDate(userId, cryptoID);
      console.log(purchaseDate)

      // Obtém o histórico de preços para a moeda
      const priceHistoryResponse = await getPriceHistory(cryptoID, timePeriod);
      
      if (priceHistoryResponse && priceHistoryResponse.history) {
        const priceHistory: PriceData[] = priceHistoryResponse.history.map((data) => ({
          price: data.price,
          dateTime: new Date(data.timestamp * 1000), // Converte o timestamp para dateTime
        }));

        // Filtra os dados de histórico para começar a partir da data de compra
        const filteredPriceHistory = priceHistory.filter((data) => data.dateTime >= purchaseDate);

        // Calcula o valor da moeda em cada momento com base na quantidade que você possui
        filteredPriceHistory.forEach((data) => {
          const value = quantityPurchased * parseFloat(data.price);
          const key = data.dateTime.toISOString(); // Utiliza a data e hora como chave
          consolidatedValues[key] = (consolidatedValues[key] || 0) + value; // Soma o valor ao existente
        });

        priceHistoryPromises.push(priceHistoryResponse);
      } else {
        console.error(`Failed to get price history for coin with ID ${cryptoID}`);
      }
    } catch (error) {
      console.error(`Error fetching price history for coin with ID ${cryptoID}:`, error);
    }
  }

  try {
    await Promise.all(priceHistoryPromises);

    // Arredonda os valores consolidados para duas casas decimais
    for (const key in consolidatedValues) {
      if (consolidatedValues.hasOwnProperty(key)) {
        consolidatedValues[key] = parseFloat(roundToFixed(consolidatedValues[key])); // Garantir duas casas decimais
      }
    }

    return consolidatedValues;
  } catch (error) {
    console.error("Error fetching price history:", error);
    throw new Error("Failed to fetch price history");
  }
}