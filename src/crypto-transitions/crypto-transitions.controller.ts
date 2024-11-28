import { Controller } from '@nestjs/common';
import { CryptoTransitionsService } from './crypto-transitions.service';

@Controller('crypto-transitions')
export class CryptoTransitionsController {
  constructor(private readonly cryptoTransitionsService: CryptoTransitionsService) {}
}
