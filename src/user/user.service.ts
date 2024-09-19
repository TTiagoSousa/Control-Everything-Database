import { Injectable } from '@nestjs/common';
import { updatePassword } from './helpers/settings/update.password';
import { updatePassword_dto } from './dto/update.password.dto';

@Injectable()
export class UserService {

  async updatePassword( dto: updatePassword_dto, userId:string) {
    const result  = await updatePassword(userId, dto);
    return result;
  }

}
