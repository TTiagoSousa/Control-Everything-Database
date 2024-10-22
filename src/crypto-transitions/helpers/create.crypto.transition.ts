import { getCryptoDetails } from "src/crypto-analysis/helpers/get.crypto.details";
import { createCryptoTransition_dto } from "../dto/create.crypto.transition.dto";
import { PrismaCryptoTransitionsRepository } from "../repositories/prisma/prisma-crypto-transitions-repisitory";
import { PrismaPlatformRepository } from "src/platforms/repositories/prisma/prisma-platform-repisitory";
import { BadGatewayException, BadRequestException } from "@nestjs/common";
import { containsOnlyLettersNumbersAndHyphens } from "src/utils/text/contains.only.letters.numbers.and.hyphens";
import { isNotStringAndIsNumber } from "src/utils/numbers/contains.only.numbers";

export async function createCryptoTransition (
  dto: createCryptoTransition_dto,
  userId: string,
) {

  const CryptoTransitionRepository = new PrismaCryptoTransitionsRepository();
  const PlatformRepository = new PrismaPlatformRepository();

  const { cryptoId, feesUSD, feesCrypto, totalSpendUSD, quantityPurchased, purchasePrice, date, platformID, orderType } = dto;

  if(!containsOnlyLettersNumbersAndHyphens(cryptoId)) {
    throw new BadGatewayException('Invalid crypto')
  }

  const cryptoDetailsResponse = await getCryptoDetails(cryptoId);

  if (cryptoDetailsResponse.status !== "success" || !cryptoDetailsResponse.data?.coin) {
    throw new BadRequestException('Crypto not found');
  }

  const existingCrypto = cryptoDetailsResponse.data.coin;

  const count = await CryptoTransitionRepository.countByUserId(userId)

  if (count === 0 && orderType !== 'BUY') {
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
  if (orderType === 'DROP') {
    adjustedTotalSpendUSD = 0;
    adjustedFeesCrypto = 0;
    adjustedFeesUSD = 0;
  }

  if(!isNotStringAndIsNumber(totalSpendUSD)) {
    throw new BadGatewayException('Total spent must contains only numbers')
  }

  if(!isNotStringAndIsNumber(feesUSD)) {
    throw new BadGatewayException('Fees must contains only numbers')
  }

  if(!isNotStringAndIsNumber(quantityPurchased)) {
    throw new BadGatewayException('Quantity purchased must contains only numbers')
  }

  if(!isNotStringAndIsNumber(purchasePrice)) {
    throw new BadGatewayException('Quantity purchased must contains only numbers')
  }

  if (new Date(date) > new Date()) {
    throw new BadRequestException('Date cannot be in the future');
  }

  if (orderType === 'DROP' && (feesUSD !== 0 || feesCrypto !== 0)) {
    throw new BadRequestException('Fees should not be present for DROP orders');
  }
  
  if (orderType === 'BUY' && totalSpendUSD === 0) {
    throw new BadRequestException('Purchase total cannot be zero for a BUY order');
  }
  
  if (orderType === 'SELL' && quantityPurchased === 0) {
    throw new BadRequestException('Quantity sold cannot be zero for a SELL order');
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