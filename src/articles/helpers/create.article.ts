import { PrismaArticlesRepository } from "../repositories/prisma/prisma-articles-repisitory";
import { createArticle_dto } from "../dto/create.article_dto";

export async function createArticle(
  dto: createArticle_dto,
  employeeId: string,
){

  const ArtcileRepository = new PrismaArticlesRepository();

  const { content, difficulty, imageUrl, title } = dto
 
  const article = await ArtcileRepository.create({
    content,
    difficulty,
    imageUrl,
    title,
    authorId: employeeId,
  });

  return { article };
}