import { roundToFixed } from "src/utils/numbers/round.to.fixed";
import { getTotalPerCrypto } from "./get.total.per.crypto";
import { getSinglePriceCrypto } from "src/crypto-analysis/helpers/get.single.price";
import { convertTotalToCurrency } from "src/utils/convertions/convertion";

export async function getTotalCurrentInvestment(userId: string, targetConversion: string) {

  const totalPerCoin = await getTotalPerCrypto(userId);

  let totalCurrentInvestment = 0;
  let totalSpentInUSD = 0;

  const cryptoTableWithPrices = await Promise.all(
    totalPerCoin.cryptoTable.map(async (crypto) => {
      const price = await getSinglePriceCrypto(crypto.cryptoID);

      const currentInvestment = crypto.quantityPurchased * price;
      totalCurrentInvestment += currentInvestment;

      // Somando o total gasto
      totalSpentInUSD += crypto.totalSpendInUSD;

      return {
        ...crypto,
        currentInvestment: parseFloat(roundToFixed(currentInvestment)), // Arredondar e converter para número
      };
    })
  );

  // Cálculo do retorno percentual
  const returnPercentage = ((totalCurrentInvestment - totalSpentInUSD) / totalSpentInUSD) * 100;

  // Converter o total de investimento atual para a moeda de destino
  const conversionResult = await convertTotalToCurrency(totalCurrentInvestment, targetConversion, { baseCurrency: 'e8993f89-8d00-4bf7-bf8c-8968d394c2ad' });
  const totalConverted = parseFloat(roundToFixed(parseFloat(conversionResult.value)));
  const targetSymbol = conversionResult.targetSymbol;

  return {
    totalSpentInUSD: parseFloat(roundToFixed(totalSpentInUSD)),
    totalCurrentInvestment: parseFloat(roundToFixed(totalCurrentInvestment)),
    returnPercentage: parseFloat(roundToFixed(returnPercentage)),
    totalConverted, // Valor convertido para a moeda de destino
    targetSymbol // Símbolo da moeda de destino
  };
}