import { PrismaCurrencyRepository } from "src/currencies/repository/prisma/prisma-currency-repisitory";
import { createSavingTransition_dto } from "../dto/create.saving.transition.dto";
import { PrismaSavingsTransitionsRepository } from "../repositories/prisma/prisma-savings-transitions-repisitory";
import { PrismaPlatformRepository } from "src/platforms/repositories/prisma/prisma-platform-repisitory";
import { BadGatewayException } from "@nestjs/common";
import { containsOnlyLettersNumbersAndHyphens } from "src/utils/text/contains.only.letters.numbers.and.hyphens";
import { containsOnlyLettersAndNumbers } from "src/utils/text/contains.only.letters.and.numbers";

export async function createSavingTransition(
  dto: createSavingTransition_dto,
  userId: string,
){
  
  const SavingTransitionRepository = new PrismaSavingsTransitionsRepository();
  const CurrencyRepository = new PrismaCurrencyRepository();
  const PlatformRepository = new PrismaPlatformRepository();

  const { transitionType, date, platformID, amount, currencyTypeID, description } = dto;

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

  const savingTransition = await SavingTransitionRepository.create({
    transitionType, 
    date,
    platformID,
    amount: transitionAmount,
    currencyTypeID,
    createdById: userId,
    description: description,
    isActive: true,   
  })

  return { savingTransition };
}
