/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class addNewRate_dto {
  @ApiProperty()
  @IsNotEmpty()
  currencyId: string;

  @ApiProperty()
  @IsNotEmpty()
  rate: number;

  @ApiProperty()
  @IsNotEmpty()
  date: Date;
}