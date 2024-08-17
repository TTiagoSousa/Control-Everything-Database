import { Controller } from '@nestjs/common';
import { HeritageService } from './heritage.service';

@Controller('heritage')
export class HeritageController {
  constructor(private readonly heritageService: HeritageService) {}
}
