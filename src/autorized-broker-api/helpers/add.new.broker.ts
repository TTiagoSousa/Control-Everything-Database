import { PlatformType } from "@prisma/client";
import { PrismaAuthorizedBrokerRepository } from "../repositories/prisma/prisma-autorized-broker-api-repisitory";
import { addNewAutorizedBroker_dto } from "../dto/add.new.autorized.broker.api_dto";

export async function addNewBroker(
  userID: String,
  dto: addNewAutorizedBroker_dto,
) {

  const authorizedBrokerRepository = new PrismaAuthorizedBrokerRepository();

  const { name, logo, website, type } = dto

  const creationResult = await authorizedBrokerRepository.create({
    logo : logo,
    name: name,
    website: website,
    type: type as PlatformType,
  })

  return creationResult

}