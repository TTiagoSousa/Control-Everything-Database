import { PlatformType } from "@prisma/client";
import { PrismaAuthorizedBrokerRepository } from "../repositories/prisma/prisma-autorized-broker-api-repisitory";
import { addNewAutorizedBroker_dto } from "../dto/add.new.autorized.broker.api_dto";
import { BadGatewayException, BadRequestException } from "@nestjs/common";
import { containsOnlyLettersAndNumbers } from "src/utils/text/contains.only.letters.and.numbers";

export async function addNewBroker(
  userID: String,
  dto: addNewAutorizedBroker_dto,
) {

  const authorizedBrokerRepository = new PrismaAuthorizedBrokerRepository();

  const { name, logo, website, type, credentialRequirement } = dto

  if(!containsOnlyLettersAndNumbers(name)) {
    throw new BadGatewayException('Invalid platform')
  }

  const existingBroker = await authorizedBrokerRepository.findByName(name);
  if (existingBroker) {
    throw new BadRequestException('Broker with this name already exists');
  }

  const creationResult = await authorizedBrokerRepository.create({
    logo : logo,
    name: name,
    website: website,
    type: type as PlatformType,
    credentialRequirement,
  })

  return creationResult

}