import { Article } from '@core/domain/entities/Article';
import { IArticleRepository } from '@core/domain/repositories/IArticleRepository';

/**
 * Caso de Uso: Obtener todos los artículos
 * 
 * Responsabilidad: Recuperar todos los artículos disponibles en el sistema
 */
export class GetAllArticles {
    constructor(private readonly articleRepository: IArticleRepository) {}

    /**
     * Ejecuta el caso de uso
     * 
     * @returns Promise con array de todos los artículos
     * @example
     * ```ts
     * const useCase = new GetAllArticles(articleRepository);
     * const articles = await useCase.execute();
     * console.log(articles.length); // 3
     * ```
     */
    async execute(): Promise<Article[]> {
        return await this.articleRepository.findAll();
    }
}

