/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEnum, IsOptional  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransitionType } from '@prisma/client';

export class transferSavingTransition_dto {

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TransitionType, {
    message: 'O campo transitionType deve ser um dos valores: DEPOSIT, WITHDRAWAL, TRANSFER',
  }) 
  transitionType: TransitionType;

  @ApiProperty()
  @IsNotEmpty()
  fromPlatformID: string;

  @ApiProperty()
  @IsNotEmpty()
  toPlatformID: string;

  @ApiProperty()
  @IsNotEmpty() 
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  currencyTypeID: string

  @ApiProperty()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsOptional() 
  description: string;

  @ApiProperty()
  @IsNotEmpty() 
  feesPaid: number;
}