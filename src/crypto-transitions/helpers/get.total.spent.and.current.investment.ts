import { roundToFixed } from "src/utils/numbers/round.to.fixed";
import { getTotalPerCrypto } from "./get.total.per.crypto";
import { getSinglePriceCrypto } from "src/crypto-analysis/helpers/get.single.price";

export async function getTotalSpentAndCurrentInvestment(
  userId: string,
) {

  const totalPerCoin = await getTotalPerCrypto(userId);

  // Adicionar preço atual, preço médio, investimento atual, retorno e retorno percentual para cada moeda na tabela
  const cryptoTableWithPrices = await Promise.all(
    totalPerCoin.cryptoTable.map(async (crypto) => {
      const price = await getSinglePriceCrypto(crypto.cryptoID);

      const currentInvestment = crypto.quantityPurchased * price;
      const currency = "USD"
      const currencySymbol = "$"

      return {
        ...crypto,
        currentInvestment: roundToFixed(currentInvestment), // Arredondar para duas casas decimais
        currecny: currency,
        currencySymbol
      };
    })
  );

  return { cryptoTable: cryptoTableWithPrices };
}