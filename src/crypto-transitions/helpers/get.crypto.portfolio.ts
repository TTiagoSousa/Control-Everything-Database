import { roundToFixed } from "src/utils/numbers/round.to.fixed";
import { getTotalPerCrypto } from "./get.total.per.crypto";
import { getSinglePriceCrypto } from "src/crypto-analysis/helpers/get.single.price";

export async function getCryptoPortefolio(
  userId: string,
) {

  const totalPerCoin = await getTotalPerCrypto(userId);

  // Adicionar preço atual, preço médio, investimento atual, retorno e retorno percentual para cada moeda na tabela
  const cryptoTableWithPrices = await Promise.all(
    totalPerCoin.cryptoTable.map(async (crypto) => {
      const price = await getSinglePriceCrypto(crypto.cryptoID);

      const currentInvestment = crypto.quantityPurchased * price;
      const averagePrice = crypto.totalSpendInUSD / crypto.quantityPurchased;
      const currentReturn = currentInvestment - crypto.totalSpendInUSD;
      const returnPercentage = ((currentInvestment / crypto.totalSpendInUSD) - 1) * 100;
      const currency = "USD"
      const currencySymbol = "$"

      return {
        ...crypto,
        currentPrice: roundToFixed(price),
        currentInvestment: roundToFixed(currentInvestment), // Arredondar para duas casas decimais
        averagePrice: roundToFixed(averagePrice), // Arredondar para duas casas decimais
        currentReturn: roundToFixed(currentReturn), // Arredondar para duas casas decimais
        returnPercentage: roundToFixed(returnPercentage), // Arredondar para duas casas decimais
        currency: currency,
        currencySymbol
      };
    })
  );

  return { cryptoTable: cryptoTableWithPrices };
}