import { Controller } from '@nestjs/common';
import { BrokersService } from './brokers.service';

@Controller('brokers')
export class BrokersController {
  constructor(private readonly brokersService: BrokersService) {}
}
