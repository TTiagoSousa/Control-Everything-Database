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
}