import { Module } from '@nestjs/common';
import { CryptoAnalysisService } from './crypto-analysis.service';
import { CryptoAnalysisController } from './crypto-analysis.controller';

@Module({
  controllers: [CryptoAnalysisController],
  providers: [CryptoAnalysisService],
})
export class CryptoAnalysisModule {}
