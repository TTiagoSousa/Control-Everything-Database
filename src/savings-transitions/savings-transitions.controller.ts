import { Controller } from '@nestjs/common';
import { SavingsTransitionsService } from './savings-transitions.service';

@Controller('savings-transitions')
export class SavingsTransitionsController {
  constructor(private readonly savingsTransitionsService: SavingsTransitionsService) {}
}
