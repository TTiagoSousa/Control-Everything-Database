/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class signin_employee_dto {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  employeeNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
  
}