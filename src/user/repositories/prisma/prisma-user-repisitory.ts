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

  async findUserById(userID: string) {
    const user = await prisma.user.findUnique({
        where: {
          id: userID
        },
    });

    return user;
  }

  async save(data: Prisma.UserUpdateInput){
    const id = data.id?.toString();
    
    const user = await prisma.user.update({
        where: {
            id
        },
        data,
    });

    return user;
  }
}