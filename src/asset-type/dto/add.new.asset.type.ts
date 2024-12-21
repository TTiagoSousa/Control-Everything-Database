/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PlatformType } from '@prisma/client';

export class addNewAssetType_dto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}