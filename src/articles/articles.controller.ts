import { ArticlesService } from './articles.service';
import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth-user/jwt.guard';
import { Request } from 'express';
import { createArticle_dto } from './dto/create.article_dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createArticle(@Req() req: Request, @Body() dto: createArticle_dto) {
    const userId = req.user['id'];
    return this.articlesService.createArticle(dto, userId);
  }
}
