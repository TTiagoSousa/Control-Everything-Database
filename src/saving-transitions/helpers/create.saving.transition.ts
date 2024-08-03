import { PrismaCurrencyRepository } from "src/currency/repository/prisma/prisma-currency-repisitory";
import { createSavingTransition_dto } from "../dto/create.savings.transition.dto";
import { PrismaSavingTransitionRepository } from "../repositories/prisma/prisma-savings-transitions-repisitory";
import { BadGatewayException } from "@nestjs/common";
import { containsOnlyLettersNumbersAndHyphens } from "src/utils/text/contains.only.letters.numbers.and.hyphens";
import { containsOnlyLettersAndNumbers } from "src/utils/text/contains.only.letters.and.numbers";
import { isNotStringAndIsNumber } from "src/utils/numbers/contains.only.numbers";
import { PrismaPlatformRepository } from "src/platforms/repositories/prisma/prisma-platform-repisitory";

export async function createSavingTransition(
  dto: createSavingTransition_dto,
  userId: string,
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

  const count = await SavingTransitionRepository.countByUserId(userId)
  if (count === 0 && transitionType !== 'DEPOSIT') {
    throw new BadGatewayException('The first transition must be a deposit');
  }

  if(!containsOnlyLettersNumbersAndHyphens(currencyTypeID)) {
    throw new BadGatewayException('Invalid currency')
  }

  const currencyID = await CurrencyRepository.findByID(currencyTypeID)
  if (!currencyID) {
    throw new BadGatewayException('Invalid currency');
  }

  if(!containsOnlyLettersNumbersAndHyphens(platformID)) {
    throw new BadGatewayException('Invalid platform')
  }

  const platform = await PlatformRepository.findPlatformByID(platformID)
  if (!platform) {
    throw new BadGatewayException('Invalid platform');
  }

  if(!containsOnlyLettersAndNumbers(description)) {
    throw new BadGatewayException('Description must contain only letters and numbers')
  }

  if(!isNotStringAndIsNumber(amount)) {
    throw new BadGatewayException('Ammount must contains only numbers')
  }

  const savingTransition = await SavingTransitionRepository.create({
    transitionType, 
    date,
    platformID,
    amount: transitionAmount,
    currencyTypeID,
    createdById: userId,
    description: description,
    feesPaid,
    isActive: true,   
  })

  return { savingTransition };
}