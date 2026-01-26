import { Article } from '@core/domain/entities/Article';
import { IArticleRepository } from '@core/domain/repositories/IArticleRepository';
import { prisma } from '@infra/database/prisma';
import { Article as PrismaArticle } from '@prisma/client';

/**
 * Implementación de IArticleRepository usando Prisma ORM
 * 
 * Responsabilidad: Traducir entre modelos de Prisma y entidades de dominio
 */
export class PrismaArticleRepository implements IArticleRepository {
    /**
     * Convierte un modelo de Prisma a una entidad de dominio
     */
    private toDomain(prismaArticle: PrismaArticle): Article {
        return new Article({
            id: prismaArticle.id,
            slug: prismaArticle.slug,
            name: prismaArticle.name,
            info: prismaArticle.info,
            htmlRoute: prismaArticle.htmlRoute,
            topicId: prismaArticle.topicId,
            createdAt: prismaArticle.createdAt,
        });
    }

    /**
     * Obtiene todos los artículos
     */
    async findAll(): Promise<Article[]> {
        const articles = await prisma.article.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return articles.map(article => this.toDomain(article));
    }

    /**
     * Busca un artículo por su slug único
     */
    async findBySlug(slug: string): Promise<Article | null> {
        const article = await prisma.article.findUnique({
            where: { slug },
        });

        return article ? this.toDomain(article) : null;
    }

    /**
     * Busca un artículo por su ID único
     */
    async findById(id: string): Promise<Article | null> {
        const article = await prisma.article.findUnique({
            where: { id },
        });

        return article ? this.toDomain(article) : null;
    }

    /**
     * Obtiene todos los artículos de un topic específico
     */
    async findByTopicId(topicId: number): Promise<Article[]> {
        const articles = await prisma.article.findMany({
            where: { topicId },
            orderBy: { createdAt: 'desc' },
        });

        return articles.map(article => this.toDomain(article));
    }
}

