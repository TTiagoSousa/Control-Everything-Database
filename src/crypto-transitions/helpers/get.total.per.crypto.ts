import { getCryptoDetails } from "src/crypto-analysis/helpers/get.crypto.details";
import { PrismaCryptoTransitionsRepository } from "../repositories/prisma/prisma-crypto-transitions-repisitory";
import { roundToFixed } from "src/utils/numbers/round.to.fixed";

export async function getTotalPerCrypto(
  userId: string,
): Promise<{
  cryptoTable: {
    cryptoID: string;
    cryptoName: string;
    cryptoSymbol: string;
    cryptoImage: string;
    totalSpendInUSD: number;
    quantityPurchased: number;
  }[];
}> {

  const CryptoTransitionRepository = new PrismaCryptoTransitionsRepository();

  const cryptoTransitions = await CryptoTransitionRepository.findMany(userId);

  interface CryptoTotalsItem {
    totalSpendUSD: number;
    quantityPurchased: number;
    cryptoApiID: string;
    cryptoName: string;
    cryptoSymbol: string;
    cryptoImage: string;
  }

  const cryptoTotals: { [cryptoId: string]: CryptoTotalsItem } = {};

  for (const transition of cryptoTransitions) {
    const { cryptoId, totalSpendUSD, quantityPurchased, feesCrypto  } = transition;
    let cryptoApiID = '';
    let cryptoName = '';
    let cryptoSymbol = '';
    let cryptoImage = '';

    const cryptoInfo = await getCryptoDetails(cryptoId);
    if (cryptoInfo) {
      cryptoName = cryptoInfo.data.coin.name;
      cryptoSymbol = cryptoInfo.data.coin.symbol;
      cryptoImage = cryptoInfo.data.coin.iconUrl;
    }

    const realQuantityPurchased = quantityPurchased - feesCrypto;
    
    if (cryptoId in cryptoTotals) {
      cryptoTotals[cryptoId].totalSpendUSD += totalSpendUSD;
      cryptoTotals[cryptoId].quantityPurchased += realQuantityPurchased;
    } else {
      cryptoTotals[cryptoId] = { totalSpendUSD, quantityPurchased: realQuantityPurchased, cryptoApiID, cryptoName, cryptoSymbol, cryptoImage };
    }
  }

  const cryptoTable = Object.keys(cryptoTotals).map((cryptoID) => ({
    cryptoID,
    cryptoName: cryptoTotals[cryptoID].cryptoName,
    cryptoSymbol: cryptoTotals[cryptoID].cryptoSymbol,
    cryptoImage: cryptoTotals[cryptoID].cryptoImage,
    totalSpendInUSD: parseFloat(roundToFixed(cryptoTotals[cryptoID].totalSpendUSD)),
    quantityPurchased: cryptoTotals[cryptoID].quantityPurchased,
  }));

  return { cryptoTable };
}