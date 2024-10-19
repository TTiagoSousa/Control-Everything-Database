import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CryptoTransitionsService } from './crypto-transitions.service';
import { JwtAuthGuard } from 'src/auth-user/jwt.guard';
import { Request } from 'express';
import { createCryptoTransition_dto } from './dto/create.crypto.transition.dto';

@Controller('crypto-transitions')
export class CryptoTransitionsController {
  constructor(private readonly cryptoTransitionsService: CryptoTransitionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createCryptoTransition(@Req() req: Request, @Body() dto: createCryptoTransition_dto) {
    const userId = req.user['id'];
    return this.cryptoTransitionsService.createCryptoTransition(dto, userId);
  }

}
