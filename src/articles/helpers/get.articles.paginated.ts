import { BadGatewayException } from "@nestjs/common";
import { PrismaArticlesRepository, SelectedArticleFields } from "../repositories/prisma/prisma-articles-repisitory";

export async function getArticlesPaginated(page: number): Promise<SelectedArticleFields[]> {
  const articleRepository = new PrismaArticlesRepository();

  try {
   
    const take = 12; // Definindo o número de artigos por página
    const skip = (page - 1) * take;

    const articles = await articleRepository.findArticlesPaginated(take, skip);

    return articles; // Retornando a lista de artigos paginados
  } catch (error) {
    throw new BadGatewayException('Could not retrieve articles');
  }
}