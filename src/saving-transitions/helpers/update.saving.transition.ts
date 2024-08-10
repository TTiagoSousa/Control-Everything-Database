import { PrismaCurrencyRepository } from "src/currency/repository/prisma/prisma-currency-repisitory";
import { updateSavingTransition_dto } from "../dto/update.savings.transition.dto";
import { PrismaSavingTransitionRepository } from "../repositories/prisma/prisma-savings-transitions-repisitory";
import { BadGatewayException } from "@nestjs/common";
import { containsOnlyLettersNumbersAndHyphens } from "src/utils/text/contains.only.letters.numbers.and.hyphens";
import { containsOnlyLettersAndNumbers } from "src/utils/text/contains.only.letters.and.numbers";
import { isNotStringAndIsNumber } from "src/utils/numbers/contains.only.numbers";
import { PrismaPlatformRepository } from "src/platforms/repositories/prisma/prisma-platform-repisitory";

export async function updateSavingTransition(
  dto: updateSavingTransition_dto,
  userId: string,
  transitionId: string,
){

  const SavingTransitionRepository = new PrismaSavingTransitionRepository();
  const CurrencyRepository = new PrismaCurrencyRepository();
  const PlatformRepository = new PrismaPlatformRepository();

  const { transitionType, date, platformID, amount, currencyTypeID, description, feesPaid } = dto;

  let transitionAmount = amount;

  if (transitionType === 'DEPOSIT') {
    transitionAmount = Math.abs(amount);
  } else if (transitionType === 'WITHDRAWAL') {
    transitionAmount = -amount;
  }

  if(!containsOnlyLettersNumbersAndHyphens(currencyTypeID)) {
    throw new BadGatewayException('Invalid currency');
  }

  const currencyID = await CurrencyRepository.findByID(currencyTypeID);
  if (!currencyID) {
    throw new BadGatewayException('Invalid currency');
  }

  if(!containsOnlyLettersNumbersAndHyphens(platformID)) {
    throw new BadGatewayException('Invalid platform');
  }

  const platform = await PlatformRepository.findPlatformByID(platformID);
  if (!platform) {
    throw new BadGatewayException('Invalid platform');
  }

  if(!containsOnlyLettersAndNumbers(description)) {
    throw new BadGatewayException('Description must contain only letters and numbers');
  }

  if(!isNotStringAndIsNumber(amount)) {
    throw new BadGatewayException('Amount must contains only numbers');
  }

  transitionAmount -= feesPaid;

  const updatedSavingTransition = await SavingTransitionRepository.save(userId, {
    id: transitionId,
    transitionType,
    date,
    platform: {
      connect: { id: platformID }  // Use connect to link by platformID
    },
    amount: transitionAmount,
    currency: {
      connect: { id: currencyTypeID }  // Similarly for currencyTypeID
    },
    description: description,
    feesPaid,
    isActive: true,
  });

  return { updatedSavingTransition };
}