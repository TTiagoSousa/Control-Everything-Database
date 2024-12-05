/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PlatformType } from '@prisma/client';

export class addNewPlatform_dto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  logo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PlatformType)
  type: PlatformType
}