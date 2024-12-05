import { Body, Controller, Post } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { addNewPlatform_dto } from './dto/add.new.platform';

@Controller('platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Post('add-new-platform')
  async signup_User(@Body() dto: addNewPlatform_dto) {

    return this.platformService.addNewPlatform(dto);
  }
}
