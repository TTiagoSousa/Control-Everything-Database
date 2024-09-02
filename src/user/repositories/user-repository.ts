import { Prisma, User } from "@prisma/client";

export interface UsersRepository{
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
}