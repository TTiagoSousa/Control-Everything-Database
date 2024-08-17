import { Controller } from '@nestjs/common';
import { CryptoAnalysisService } from './crypto-analysis.service';

@Controller('crypto-analysis')
export class CryptoAnalysisController {
  constructor(private readonly cryptoAnalysisService: CryptoAnalysisService) {}
}
