import { ArticleTopicWithArticles } from '@core/domain/repositories/IArticleTopicRepository';
import { IArticleTopicRepository } from '@core/domain/repositories/IArticleTopicRepository';

/**
 * DTO para datos de navegación serializables
 * Necesario porque las entidades de dominio no son serializables directamente
 * para pasar entre Server Components y Client Components
 */
export interface NavigationTopicDTO {
    id: number;
    name: string;
    articles: NavigationArticleDTO[];
}

export interface NavigationArticleDTO {
    id: string;
    name: string;
    slug: string;
    info: string | null;
}

/**
 * Caso de Uso: Obtener datos de navegación para el Header
 * 
 * Responsabilidad: Recuperar todos los topics con sus artículos
 * y transformarlos a un formato serializable para el frontend
 */
export class GetNavigationData {
    constructor(private readonly articleTopicRepository: IArticleTopicRepository) { }

    /**
     * Ejecuta el caso de uso
     * 
     * @returns Promise con array de topics y sus artículos en formato DTO
     * @example
     * ```ts
     * const useCase = new GetNavigationData(articleTopicRepository);
     * const navigation = await useCase.execute();
     * // [{ id: 1, name: "Historia", articles: [...] }, ...]
     * ```
     */
    async execute(): Promise<NavigationTopicDTO[]> {
        const topicsWithArticles = await this.articleTopicRepository.findAllWithArticles();

        // Transformar a DTOs serializables
        return topicsWithArticles.map(item => ({
            id: item.topic.id,
            name: item.topic.name,
            articles: item.articles.map(article => ({
                id: article.id,
                name: article.name,
                slug: article.slug,
                info: article.info,
            })),
        }));
    }
}
