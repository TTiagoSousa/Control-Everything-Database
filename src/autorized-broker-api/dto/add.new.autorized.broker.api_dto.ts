/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PlatformType } from '@prisma/client';

export class addNewAutorizedBroker_dto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  website: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PlatformType)
  type: PlatformType

  @ApiProperty()
  @IsNotEmpty()
  logo: string;
}