import { PrismaAssetTypeRepository } from "../repositories/prisma/prisma-asset-type-repisitory";
import { addNewAssetType_dto } from "../dto/add.new.asset.type";

export async function addNewAssetType(
  dto: addNewAssetType_dto,
) {

  const assetTypeRepository = new PrismaAssetTypeRepository();

  const { name } = dto

  const creationResult = await assetTypeRepository.create({
   name
  })

  return creationResult

}