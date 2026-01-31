import { ArticleTopic } from '@core/domain/entities/ArticleTopic';
import { Article } from '@core/domain/entities/Article';
import {
    IArticleTopicRepository,
    ArticleTopicWithArticles
} from '@core/domain/repositories/IArticleTopicRepository';
import { prisma } from '@infra/database/prisma';

/**
 * Implementación de IArticleTopicRepository usando Prisma ORM
 * 
 * Responsabilidad: Traducir entre modelos de Prisma y entidades de dominio
 * para los topics de artículos
 */
export class PrismaArticleTopicRepository implements IArticleTopicRepository {
    /**
     * Convierte un registro de Prisma ArticleTopic a una entidad de dominio
     */
    private topicToDomain(prismaTopic: { id: number; name: string }): ArticleTopic {
        return new ArticleTopic({
            id: prismaTopic.id,
            name: prismaTopic.name,
        });
    }

    /**
     * Convierte un registro de Prisma Article a una entidad de dominio
     */
    private articleToDomain(prismaArticle: {
        id: string;
        slug: string;
        name: string;
        info: string | null;
        topicId: number;
        createdAt: Date;
    }): Article {
        return new Article({
            id: prismaArticle.id,
            slug: prismaArticle.slug,
            name: prismaArticle.name,
            info: prismaArticle.info,
            topicId: prismaArticle.topicId,
            createdAt: prismaArticle.createdAt,
        });
    }

    /**
     * Obtiene todos los topics de artículos
     * Ordenados por nombre alfabéticamente
     */
    async findAll(): Promise<ArticleTopic[]> {
        const topics = await prisma.articleTopic.findMany({
            orderBy: { id: 'asc' },
        });

        return topics.map((topic) => this.topicToDomain(topic));
    }

    /**
     * Busca un topic por su ID
     */
    async findById(id: number): Promise<ArticleTopic | null> {
        const topic = await prisma.articleTopic.findUnique({
            where: { id },
        });

        return topic ? this.topicToDomain(topic) : null;
    }

    /**
     * Obtiene todos los topics con sus artículos relacionados
     * Optimizado con una sola query usando include de Prisma
     * Ordenado: topics por nombre, artículos por fecha de creación descendente
     */
    async findAllWithArticles(): Promise<ArticleTopicWithArticles[]> {
        const topicsWithArticles = await prisma.articleTopic.findMany({
            include: {
                articles: {
                    orderBy: { id: 'asc' },
                },
            },
            orderBy: { id: 'asc' },
        });

        return topicsWithArticles.map((topicData) => ({
            topic: this.topicToDomain(topicData),
            articles: topicData.articles.map((article) => this.articleToDomain(article)),
        }));
    }
}
