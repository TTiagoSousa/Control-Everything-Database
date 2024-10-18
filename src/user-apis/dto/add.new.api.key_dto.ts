/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddNewApiKey_dto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  authorizedBrokerId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  apiKey?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  secretKey?: string;
}