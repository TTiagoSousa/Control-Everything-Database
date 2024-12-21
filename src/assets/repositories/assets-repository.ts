import { Prisma, Asset } from "@prisma/client";

export interface AssetsRepository{
  create(data: Prisma.AssetUncheckedCreateInput): Promise<Asset>;
}