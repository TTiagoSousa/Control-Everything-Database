import { Module } from '@nestjs/common';
import { UserApisService } from './user-apis.service';
import { UserApisController } from './user-apis.controller';

@Module({
  controllers: [UserApisController],
  providers: [UserApisService],
})
export class UserApisModule {}
