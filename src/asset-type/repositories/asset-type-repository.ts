import { Prisma, AssetType } from "@prisma/client";

export interface AssetTypeRepository{
  create(data: Prisma.AssetTypeUncheckedCreateInput): Promise<AssetType>;
}