import { Article } from '@core/domain/entities/Article';
import { IArticleRepository } from '@core/domain/repositories/IArticleRepository';

/**
 * Caso de Uso: Obtener artículo por ID
 * 
 * Responsabilidad: Recuperar un artículo específico usando su ID único
 */
export class GetArticleById {
    constructor(private readonly articleRepository: IArticleRepository) {}

    /**
     * Ejecuta el caso de uso
     * 
     * @param id - ID único del artículo (CUID)
     * @returns Promise con el artículo encontrado o null
     * @throws Error si el ID está vacío
     * @example
     * ```ts
     * const useCase = new GetArticleById(articleRepository);
     * const article = await useCase.execute('clxxx123456');
     * if (article) {
     *   console.log(article.name); // "Historia de Japón"
     * }
     * ```
     */
    async execute(id: string): Promise<Article | null> {
        if (!id || id.trim() === '') {
            throw new Error('El ID no puede estar vacío');
        }

        return await this.articleRepository.findById(id);
    }
}

