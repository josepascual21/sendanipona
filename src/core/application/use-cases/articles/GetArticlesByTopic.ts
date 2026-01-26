import { Article } from '@core/domain/entities/Article';
import { IArticleRepository } from '@core/domain/repositories/IArticleRepository';

/**
 * Caso de Uso: Obtener artículos por topic
 * 
 * Responsabilidad: Recuperar todos los artículos de un topic específico
 */
export class GetArticlesByTopic {
    constructor(private readonly articleRepository: IArticleRepository) {}

    /**
     * Ejecuta el caso de uso
     * 
     * @param topicId - ID del topic
     * @returns Promise con array de artículos del topic
     * @throws Error si el topicId es inválido
     * @example
     * ```ts
     * const useCase = new GetArticlesByTopic(articleRepository);
     * const articles = await useCase.execute(1); // Topic "Historia"
     * console.log(articles.length); // 3
     * ```
     */
    async execute(topicId: number): Promise<Article[]> {
        if (topicId <= 0) {
            throw new Error('El ID del topic debe ser positivo');
        }

        return await this.articleRepository.findByTopicId(topicId);
    }
}

