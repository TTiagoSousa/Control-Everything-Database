import { Controller } from '@nestjs/common';
import { FunctionsValidationsService } from './functions-validations.service';

@Controller('functions-validations')
export class FunctionsValidationsController {
  constructor(private readonly functionsValidationsService: FunctionsValidationsService) {}
}
