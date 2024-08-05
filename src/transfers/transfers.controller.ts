import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { JwtAuthGuard } from 'src/auth-user/jwt.guard';
import { Request } from 'express';
import { transferSavingTransition_dto } from 'src/saving-transitions/dto/transfer.savings.transition.dto';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':userId/savings-to-savings')
  async transfersBetweenSavings(
    @Param('userId') userId: string,
    @Body() dto: transferSavingTransition_dto
  ) {
    
    return this.transfersService.transfersBetweenSavings(dto, userId);
  }
}