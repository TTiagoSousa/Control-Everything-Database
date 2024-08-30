import { getTotalCurrentInvestment } from "src/crypto-transitions/helpers/get.total.current.investment.crypto";
import { getTotalOnSavingsTransitionsConverted } from "src/saving-transitions/helpers/get.total.on.savings.converted";

export async function getTotalHeritageConverted(
  userId: string,
  targetConversion: string
) {
  try {

    const cryptoResult = await getTotalCurrentInvestment(userId, targetConversion);
    const savingsResult = await getTotalOnSavingsTransitionsConverted(userId, targetConversion);

    const cryptoTotalConverted = typeof cryptoResult.totalConverted === 'string' ? parseFloat(cryptoResult.totalConverted) : cryptoResult.totalConverted;
    const savingsTotalConverted = typeof savingsResult.totalConverted === 'string' ? parseFloat(savingsResult.totalConverted) : savingsResult.totalConverted;

    const totalConvertedSum = cryptoTotalConverted + savingsTotalConverted;

    return {
      totalConverted: totalConvertedSum,
      targetSymbol: cryptoResult.targetSymbol,  // Retorna o símbolo do cryptoResult
    };
  } catch (error) {

    console.error('Erro ao obter o total convertido:', error);
    throw error;
  }
}