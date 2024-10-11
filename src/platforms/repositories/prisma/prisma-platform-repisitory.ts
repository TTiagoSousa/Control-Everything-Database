import { Prisma, Platform } from "@prisma/client";
import { prisma } from '../../../lib/prisma';
import { PlatformRepository } from "../platform-repository";

export class PrismaPlatformRepository implements PlatformRepository{

  async create(data: Prisma.PlatformUncheckedCreateInput) {
    const platform = await prisma.platform.create({
      data,
    })

    return platform
  }

  async findPlatformByID(id: string) {
    const PlatformID = await prisma.platform.findUnique({
      where: {
        id
      },
    });

    return PlatformID;
  }

  async findAll(){
    const paltforms = await prisma.platform.findMany();

    return paltforms;
  }
}