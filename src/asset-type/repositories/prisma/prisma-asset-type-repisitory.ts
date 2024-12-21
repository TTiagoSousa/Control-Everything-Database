import { Prisma } from "@prisma/client";
import { prisma } from '../../../lib/prisma';
import { AssetTypeRepository } from "../asset-type-repository";

export class PrismaAssetTypeRepository implements AssetTypeRepository{

  async create(data: Prisma.AssetTypeUncheckedCreateInput) {
    const asset = await prisma.assetType.create({
      data,
    })

    return asset
  }

}