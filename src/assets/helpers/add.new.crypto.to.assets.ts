import { PrismaAssetsRepository } from "../repositories/prisma/prisma-assets-repisitory";
import { getCryptoDetails } from "./crypto/get.crypto.details";
import { BadRequestException } from "@nestjs/common";

export async function addCryptoToAsset(
  cryptoApiId: string 
) {
  const assetRepository = new PrismaAssetsRepository();

  const cryptoDetailsResponse = await getCryptoDetails(cryptoApiId);
  if (cryptoDetailsResponse.status !== "success" || !cryptoDetailsResponse.data?.coin) {
    throw new BadRequestException('Crypto not found');
  }

  const crypto = cryptoDetailsResponse.data.coin;

  const completedAssetData = {
    apiId: crypto.uuid,
    name: crypto.name,
    abbreviation: crypto.symbol,
    image: crypto.iconUrl,
    assetTypeId: '392aa932-7f7f-44e2-bdad-da52c03db006',
  };

  const existingAsset = await assetRepository.findByApiIdAndName(completedAssetData.apiId, completedAssetData.name);
  if (existingAsset) {
    throw new BadRequestException('Asset with the same apiId and name already exists');
  }

  console.log(existingAsset)

  // Cria o novo ativo
  const creationResult = await assetRepository.create(completedAssetData);

  return creationResult;
}

// https://site.financialmodelingprep.com/developer/docs#commodities-list-commoditiesd