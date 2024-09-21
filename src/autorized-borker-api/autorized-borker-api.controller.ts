import { Controller } from '@nestjs/common';
import { AutorizedBorkerApiService } from './autorized-borker-api.service';

@Controller('autorized-borker-api')
export class AutorizedBorkerApiController {
  constructor(private readonly autorizedBorkerApiService: AutorizedBorkerApiService) {}
}
