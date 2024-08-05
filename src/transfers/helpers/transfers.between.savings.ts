import { PrismaPlatformRepository } from "src/platforms/repositories/prisma/prisma-platform-repisitory";
import { PrismaCurrencyRepository } from "src/currency/repository/prisma/prisma-currency-repisitory";
import { PrismaSavingTransitionRepository } from "src/saving-transitions/repositories/prisma/prisma-savings-transitions-repisitory";
import { transferSavingTransition_dto } from "src/saving-transitions/dto/transfer.savings.transition.dto";
import { BadGatewayException } from "@nestjs/common";
import { containsOnlyLettersNumbersAndHyphens } from "src/utils/text/contains.only.letters.numbers.and.hyphens";
import { containsOnlyLettersAndNumbers } from "src/utils/text/contains.only.letters.and.numbers";
import { isNotStringAndIsNumber } from "src/utils/numbers/contains.only.numbers";
import { getTotalCurrencyPerPlatform } from "src/saving-transitions/helpers/get.total.currency.per.platform";

export async function transfersBetweenSavings(
  dto: transferSavingTransition_dto,
  userId: string,
) {
  const savingTransitionRepository = new PrismaSavingTransitionRepository();
  const currencyRepository = new PrismaCurrencyRepository();
  const platformRepository = new PrismaPlatformRepository();

  const { transitionType, date, fromPlatformID, toPlatformID, amount, currencyTypeID, description, feesPaid } = dto;

  if (transitionType !== 'TRANSFER') {
    throw new BadGatewayException('Invalid transition type for this operation');
  }

  if (!containsOnlyLettersNumbersAndHyphens(currencyTypeID)) {
    throw new BadGatewayException('Invalid currency');
  }

  const currency = await currencyRepository.findByID(currencyTypeID);
  if (!currency) {
    throw new BadGatewayException('Invalid currency');
  }

  if (!containsOnlyLettersNumbersAndHyphens(fromPlatformID)) {
    throw new BadGatewayException('Invalid from platform');
  }

  const fromPlatform = await platformRepository.findPlatformByID(fromPlatformID);
  if (!fromPlatform) {
    throw new BadGatewayException('Invalid from platform');
  }

  if (!containsOnlyLettersNumbersAndHyphens(toPlatformID)) {
    throw new BadGatewayException('Invalid to platform');
  }

  const toPlatform = await platformRepository.findPlatformByID(toPlatformID);
  if (!toPlatform) {
    throw new BadGatewayException('Invalid to platform');
  }

  if (!containsOnlyLettersAndNumbers(description)) {
    throw new BadGatewayException('Description must contain only letters and numbers');
  }

  if (!isNotStringAndIsNumber(amount)) {
    throw new BadGatewayException('Amount must contain only numbers');
  }

  if (!isNotStringAndIsNumber(feesPaid) || feesPaid < 0) {
    throw new BadGatewayException('Fees paid must be a positive number');
  }

  if (feesPaid > amount) {
    throw new BadGatewayException('Fees paid cannot be greater than the amount');
  }

  // Get total currencies per platform
  const totalCurrencies = await getTotalCurrencyPerPlatform(userId);

  // Find the relevant platform and currency
  const fromPlatformData = totalCurrencies.find(platform => platform.platformID === fromPlatformID);
  if (!fromPlatformData) {
    throw new BadGatewayException('No data found for the from platform');
  }

  const currencyData = fromPlatformData.currencies.find(currency => currency.currencyTypeID === currencyTypeID);
  if (!currencyData) {
    throw new BadGatewayException('No data found for the currency in the from platform');
  }

  // Check if there are enough funds
  if (currencyData.total < amount + feesPaid) {
    throw new BadGatewayException('Insufficient funds in the from platform');
  }

  const transferAmount = -amount;
  const depositAmount = amount - feesPaid;

  const transferTransition = await savingTransitionRepository.create({
    transitionType: 'TRANSFER',
    date,
    platformID: fromPlatformID,
    amount: transferAmount,
    currencyTypeID,
    createdById: userId,
    description,
    feesPaid,
    isActive: true,
  });

  const depositTransition = await savingTransitionRepository.create({
    transitionType: 'DEPOSIT',
    date,
    platformID: toPlatformID,
    amount: depositAmount,
    currencyTypeID,
    createdById: userId,
    description,
    feesPaid: 0, // No fees applied to the deposit transition
    isActive: true,
  });

  return { transferTransition, depositTransition };
}