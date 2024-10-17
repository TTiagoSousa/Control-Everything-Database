import { Controller } from '@nestjs/common';
import { UserApisService } from './user-apis.service';

@Controller('user-apis')
export class UserApisController {
  constructor(private readonly userApisService: UserApisService) {}
}
