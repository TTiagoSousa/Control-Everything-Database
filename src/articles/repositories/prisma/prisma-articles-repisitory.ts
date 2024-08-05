import { ArticlesRepository } from "../articles-repisitory";
import { prisma } from '../../../lib/prisma';
import { Prisma, Article } from "@prisma/client";

export type SelectedArticleFields = {
  id: string;
  title: string;
  imageUrl: string;
  difficulty: string; // ou o tipo correspondente para dificuldade
};

export class PrismaArticlesRepository implements ArticlesRepository{

  async create(data: Prisma.ArticleUncheckedCreateInput) {
    const Article = await prisma.article.create({
      data,
    })

    return Article
  }

}