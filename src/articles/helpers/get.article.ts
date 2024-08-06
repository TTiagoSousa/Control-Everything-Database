import { BadRequestException } from "@nestjs/common";
import { PrismaArticlesRepository } from "../repositories/prisma/prisma-articles-repisitory";


export async function getArticleById(
  articleId: string
) {

  const articleRepository = new PrismaArticlesRepository();

  try {
    const article = await articleRepository.findArticleByID(articleId);

    if (!article) {
      throw new BadRequestException('Article not found');
    }

    return { article };
  } catch (error) {
    throw new BadRequestException('Article not found')
  }
}