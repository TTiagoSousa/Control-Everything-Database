import { BadGatewayException, BadRequestException } from "@nestjs/common";
import { createCryptoTransition_dto } from "../dto/create.crypto.transition.dto";
import { PrismaCryptoTransitionsRepository } from "../repositories/prisma/prisma-crypto-transitions-repisitory";
import { getCryptoDetails } from "src/crypto-analysis/helpers/get.crypto.details";
import { containsOnlyLettersNumbersAndHyphens } from "src/utils/text/contains.only.letters.numbers.and.hyphens";
import { PrismaPlatformRepository } from "src/platforms/repositories/prisma/prisma-platform-repisitory";
import { isNotStringAndIsNumber } from "src/utils/numbers/contains.only.numbers";

export async function createCryptoTransition (
  dto: createCryptoTransition_dto,
  userId: string,
) {

  const CryptoTransitionRepository = new PrismaCryptoTransitionsRepository();
  const PlatformRepository = new PrismaPlatformRepository();

  const { cryptoId, feesUSD, feesCrypto, totalSpendUSD, quantityPurchased, purchasePrice, date, platformID, orderType } = dto;

  const cryptoDetailsResponse = await getCryptoDetails(cryptoId);

  if (cryptoDetailsResponse.status !== "success" || !cryptoDetailsResponse.data?.coin) {
    throw new BadRequestException('Crypto not found');
  }

  const existingCrypto = cryptoDetailsResponse.data.coin;

  const count = await CryptoTransitionRepository.countByUserId(userId)

  if (count === 0 && orderType !== 'buy') {
    throw new BadGatewayException('The first transition must be a purchase');
  }

  if(!containsOnlyLettersNumbersAndHyphens(platformID)) {
    throw new BadGatewayException('Invalid platform')
  }

  const platform = await PlatformRepository.findPlatformByID(platformID)
  if (!platform) {
    throw new BadGatewayException('Invalid platform');
  }

  let adjustedTotalSpendUSD = totalSpendUSD;
  let adjustedFeesCrypto = feesCrypto;
  let adjustedFeesUSD = feesUSD;
  if (orderType === 'drop') {
    adjustedTotalSpendUSD = 0;
    adjustedFeesCrypto = 0;
    adjustedFeesUSD = 0;
  }

  if(!isNotStringAndIsNumber(totalSpendUSD)) {
    throw new BadGatewayException('Total spent must contains only numbers')
  }
  
  const cryptoTransition = await CryptoTransitionRepository.create({
    platformID,
    orderType,
    date,
    purchasePrice,
    quantityPurchased,
    totalSpendUSD: adjustedTotalSpendUSD,
    feesCrypto: adjustedFeesCrypto,
    feesUSD: adjustedFeesUSD,
    createdById: userId,
    cryptoId: existingCrypto.uuid,
    isActive: true
  });

  return cryptoTransition;
} 