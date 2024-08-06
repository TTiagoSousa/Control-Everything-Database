import { BadGatewayException } from "@nestjs/common";
import { PrismaArticlesRepository } from "../repositories/prisma/prisma-articles-repisitory";

export async function getTotalOfArticles() {
  const articleRepository = new PrismaArticlesRepository();

  try {
    const totalArticles = await articleRepository.countTotalArticles();
    return totalArticles; // Retornando apenas o número total de artigos
  } catch (error) {
    throw new BadGatewayException('Could not retrieve total articles');
  }
}