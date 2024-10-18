import { Prisma, UserApiKey } from "@prisma/client";

export interface UserApiKeyRepository{
  create(data: Prisma.UserApiKeyUncheckedCreateInput): Promise<UserApiKey>;
}