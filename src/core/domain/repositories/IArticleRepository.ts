import { Article } from '../entities/Article';

/**
 * Interface IArticleRepository - Define el contrato para acceder a artículos
 * 
 * Esta interface pertenece a la capa de dominio y NO debe tener dependencias
 * de infraestructura (Prisma, APIs, etc.). Las implementaciones concretas
 * estarán en la capa de infraestructura.
 */
export interface IArticleRepository {
    /**
     * Obtiene todos los artículos disponibles
     * 
     * @returns Promise con array de entidades Article
     * @example
     * ```ts
     * const articles = await repository.findAll();
     * console.log(articles.length); // 5
     * ```
     */
    findAll(): Promise<Article[]>;

    /**
     * Busca un artículo por su slug único
     * 
     * @param slug slug del artículo
     * @returns Promise con la entidad Article o null si no existe
     * @example
     * ```ts
     * const article = await repository.findBySlug('pasado');
     * if (article) {
     *   console.log(article.name); // "Pasado"
     * }
     * ```
     */
    findBySlug(slug: string): Promise<Article | null>;

    /**
     * Busca un artículo por su ID único
     *
     * @param id - Identificador único del artículo (CUID)
     * @returns Promise con la entidad Article o null si no existe
     * @example
     * ```ts
     * const article = await repository.findById('clxxx123456');
     * ```
     */
    findById(id: string): Promise<Article | null>;

    /**
     * Obtiene todos los artículos de un topic específico
     *
     * @param topicId - ID del topic
     * @returns Promise con array de entidades Article del topic
     * @example
     * ```ts
     * const articles = await repository.findByTopicId(1);
     * console.log(articles.length); // 3
     * ```
     */
    findByTopicId(topicId: number): Promise<Article[]>;
}
