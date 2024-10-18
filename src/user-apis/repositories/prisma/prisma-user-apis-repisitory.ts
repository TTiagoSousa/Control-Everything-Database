import { Prisma, User } from "@prisma/client";
import { UserApiKey } from "@prisma/client";
import { prisma } from '../../../lib/prisma';
import { UserApiKeyRepository } from "../user-apis-repository";

export class PrismaUserApiKeyRepository implements UserApiKeyRepository{

  async create(data: Prisma.UserApiKeyUncheckedCreateInput) {
    
    const apiKey = await prisma.userApiKey.create({
      data,
    })

    return apiKey
  }

}