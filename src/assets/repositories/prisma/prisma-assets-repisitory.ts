import { Prisma } from "@prisma/client";
import { prisma } from '../../../lib/prisma';
import { AssetsRepository } from "../assets-repository";

export class PrismaAssetsRepository implements AssetsRepository{

  async create(data: Prisma.AssetUncheckedCreateInput) {
    const asset = await prisma.asset.create({
      data,
    })

    return asset
  }

  async findByApiIdAndName(apiId: string, name: string) {
    const asset = await prisma.asset.findFirst({
      where: {
        apiId,
        name,
      },
    });

    return asset;
  }
}