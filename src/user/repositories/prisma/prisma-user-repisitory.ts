import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../user-repository";
import { prisma } from '../../../lib/prisma';

export class PrismaUsersRepository implements UsersRepository{

  async create(data: Prisma.UserUncheckedCreateInput) {
    
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email
        },
    });

    return user;
  }

}