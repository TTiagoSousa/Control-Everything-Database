import { Injectable } from '@nestjs/common';
import { createArticle } from './helpers/create.article';
import { createArticle_dto } from './dto/create.article_dto';
import { getArticleById } from './helpers/get.article';

@Injectable()
export class ArticlesService {

  async createArticle(dto: createArticle_dto, employeeId: string) {
    const result = await createArticle(dto, employeeId);
    return result;
  }

  async getArticleById(articleId: string) {
    const result = await getArticleById(articleId);
    return result;
  }
}
