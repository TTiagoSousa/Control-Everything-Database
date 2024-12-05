import { PlatformType } from "@prisma/client";
import { addNewPlatform_dto } from "../dto/add.new.platform";
import { PrismaPlatformRepository } from "../repositories/prisma/prisma-platform-repisitory";

export async function addNewPlatform(
  dto: addNewPlatform_dto,
) {

  const platformRepository = new PrismaPlatformRepository();

  const { name, logo, type } = dto

  const creationResult = await platformRepository.create({
    logo : logo,
    name: name,
    type: type as PlatformType,
  })

  return creationResult

}