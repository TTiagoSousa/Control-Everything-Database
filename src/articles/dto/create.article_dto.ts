/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Articledifficulty, Gender } from '@prisma/client';

export class createArticle_dto {

  @ApiProperty()
  @IsNotEmpty()
  title:  string;

  @ApiProperty()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Articledifficulty, {
    message: '',
  }) 
  difficulty: Articledifficulty;
}