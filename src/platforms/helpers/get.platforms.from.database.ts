
import { BadGatewayException } from '@nestjs/common';
import { PrismaPlatformRepository } from '../repositories/prisma/prisma-platform-repisitory';

export async function GetPlatformsFromDataBase() {

  const platformsRepository = new PrismaPlatformRepository();

  try {
    const platforms = await platformsRepository.findAll();
    return platforms;
  } catch (error) {
    console.error('Error fetching currencies:', error);
    throw new BadGatewayException('Failed to fetch currencies');
  }
}