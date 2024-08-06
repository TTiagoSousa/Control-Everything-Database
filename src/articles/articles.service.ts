import { Injectable } from '@nestjs/common';
import { createArticle } from './helpers/create.article';
import { createArticle_dto } from './dto/create.article_dto';

@Injectable()
export class ArticlesService {

  async createArticle(dto: createArticle_dto, employeeId: string) {
    const result = await createArticle(dto, employeeId);
    return result;
  }

}
