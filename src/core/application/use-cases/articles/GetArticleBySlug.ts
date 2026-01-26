import { Article } from '@core/domain/entities/Article';
import { IArticleRepository } from '@core/domain/repositories/IArticleRepository';

/**
 * Caso de Uso: Obtener artículo por slug
 * 
 * Responsabilidad: Recuperar un artículo específico usando su slug único
 */
export class GetArticleBySlug {
    constructor(private readonly articleRepository: IArticleRepository) {}

    /**
     * Ejecuta el caso de uso
     * 
     * @param slug - Slug único del artículo
     * @returns Promise con el artículo encontrado o null
     * @throws Error si el slug está vacío
     * @example
     * ```ts
     * const useCase = new GetArticleBySlug(articleRepository);
     * const article = await useCase.execute('pasado');
     * if (article) {
     *   console.log(article.name); // "Pasado"
     * }
     * ```
     */
    async execute(slug: string): Promise<Article | null> {
        if (!slug || slug.trim() === '') {
            throw new Error('El slug no puede estar vacío');
        }

        return await this.articleRepository.findBySlug(slug);
    }
}

