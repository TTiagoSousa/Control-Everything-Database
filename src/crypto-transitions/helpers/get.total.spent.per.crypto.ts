import { roundToFixed } from "src/utils/numbers/round.to.fixed";
import { getTotalPerCrypto } from "./get.total.per.crypto";
import { getSinglePriceCrypto } from "src/crypto-analysis/helpers/get.single.price";

export async function getTotalSpentPerCrypto(
  userId: string,
) {
  const totalPerCoin = await getTotalPerCrypto(userId);

  // Calcular o total global de totalSpendInUSD
  let totalSpentInUSD = 0;

  const cryptoTableWithSpentPercentages = await Promise.all(
    totalPerCoin.cryptoTable.map(async (crypto) => {
      totalSpentInUSD += crypto.totalSpendInUSD;
      return {
        ...crypto,
      };
    })
  );

  // Adicionar percentual de gasto de cada moeda no portfólio
  const spentPercentages = cryptoTableWithSpentPercentages.map((crypto) => {
    const spentPercentage = (crypto.totalSpendInUSD / totalSpentInUSD) * 100;

    return {
      cryptoID: crypto.cryptoID,
      cryptoName: crypto.cryptoName,
      cryptoSymbol: crypto.cryptoSymbol,
      spentPercentage: roundToFixed(spentPercentage), // Percentual do gasto total no portfólio
      currencySymbol: "$", // Símbolo da moeda
    };
  });

  return { cryptoTable: spentPercentages };
}