import { Prisma, Article } from "@prisma/client";

export interface ArticlesRepository {
  create(data: Prisma.ArticleUncheckedCreateInput): Promise<Article>;
  findArticleByID(id: string)
} 