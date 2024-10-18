import { PlatformType } from "@prisma/client";
import { PrismaUserApiKeyRepository } from "../repositories/prisma/prisma-user-apis-repisitory";
import { PrismaAuthorizedBrokerRepository } from "src/autorized-broker-api/repositories/prisma/prisma-autorized-broker-api-repisitory";
import { BadRequestException } from "@nestjs/common";
import { hashPassword } from "src/utils/password/hashPassword";
import { AddNewApiKey_dto } from "src/user-apis/dto/add.new.api.key_dto"; 

export async function AddNewApiKey(
  userId: string,
  dto: AddNewApiKey_dto
) {

  const userApiKeyRepository = new PrismaUserApiKeyRepository();
  const authorizedBrokerRepository = new PrismaAuthorizedBrokerRepository();

  const { authorizedBrokerId, apiKey, secretKey } = dto;

  const broker = await authorizedBrokerRepository.findById(authorizedBrokerId);

  if (!broker) {
    throw new BadRequestException('Corretora autorizada não encontrada');
  }

  if (broker.credentialRequirement === 'KEY_ONLY' && !apiKey) {
    throw new Error('A chave de API é necessária para esta corretora');
  }

  if (broker.credentialRequirement === 'KEY_AND_SECRET' && (!apiKey || !secretKey)) {
    throw new Error('A chave de API e a chave secreta são necessárias para esta corretora');
  }

  const hashedApiKey = await hashPassword(apiKey);
  const hashedSecretKey = secretKey ? await hashPassword(secretKey) : null;

  const creationResult = await userApiKeyRepository.create({
    userId,
    authorizedBrokerId,
    hashKey: hashedApiKey,
    hashSecretKey: hashedSecretKey,
  });

  return creationResult;

}