import { roundToFixed } from "src/utils/numbers/round.to.fixed";
import { getTotalPerCrypto } from "./get.total.per.crypto";
import { getSinglePriceCrypto } from "src/crypto-analysis/helpers/get.single.price";

export async function getTotalSpentAndCurrentInvestment(
  userId: string,
) {
  const totalPerCoin = await getTotalPerCrypto(userId);

  // Calcular o total global de currentInvestment e totalSpendInUSD
  let totalCurrentInvestment = 0;
  let totalSpentInUSD = 0;

  const cryptoTableWithPrices = await Promise.all(
    totalPerCoin.cryptoTable.map(async (crypto) => {
      const price = await getSinglePriceCrypto(crypto.cryptoID);

      const currentInvestment = crypto.quantityPurchased * price;
      totalCurrentInvestment += currentInvestment;
      totalSpentInUSD += crypto.totalSpendInUSD;

      return {
        ...crypto,
        currentInvestment: parseFloat(roundToFixed(currentInvestment)), // Arredondar e converter para número
      };
    })
  );

  // Adicionar percentual de cada moeda no portfólio
  const cryptoTableWithPercentages = cryptoTableWithPrices.map((crypto) => {
    const investmentPercentage = (crypto.currentInvestment / totalCurrentInvestment) * 100;
    const spentPercentage = (crypto.totalSpendInUSD / totalSpentInUSD) * 100;

    return {
      ...crypto,
      investmentPercentage: roundToFixed(investmentPercentage), // Percentual do investimento atual no portfólio
      spentPercentage: roundToFixed(spentPercentage), // Percentual do gasto total no portfólio
      currency: "USD",
      currencySymbol: "$",
    };
  });

  return { cryptoTable: cryptoTableWithPercentages };
}