/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEnum, IsOptional  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransitionCryptoTypeRole } from '@prisma/client';

export class createCryptoTransition_dto {

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TransitionCryptoTypeRole, {
    message: 'O campo transitionType deve ser um dos valores: DEPOSIT, WITHDRAWAL, TRANSFER',
  }) 
  orderType: TransitionCryptoTypeRole;

  @ApiProperty()
  @IsNotEmpty()
  platformID: string;

  @ApiProperty()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  purchasePrice: number;

  @ApiProperty()
  @IsNotEmpty() 
  quantityPurchased: number;

  @ApiProperty()
  @IsOptional() 
  totalSpendUSD: number;

  @ApiProperty()
  @IsOptional() 
  feesCrypto: number;

  @ApiProperty()
  @IsOptional() 
  feesUSD: number;

  @ApiProperty()
  @IsNotEmpty()
  cryptoId: string;
}