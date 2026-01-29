import { ArticleTopic } from '../entities/ArticleTopic';
import { Article } from '../entities/Article';

/**
 * Tipo que representa un ArticleTopic con sus artículos relacionados
 * Útil para la navegación del Header
 */
export interface ArticleTopicWithArticles {
    topic: ArticleTopic;
    articles: Article[];
}

/**
 * Interface IArticleTopicRepository - Define el contrato para acceder a topics de artículos
 * 
 * Esta interface pertenece a la capa de dominio y NO debe tener dependencias
 * de infraestructura (Prisma, APIs, etc.). Las implementaciones concretas
 * estarán en la capa de infraestructura.
 */
export interface IArticleTopicRepository {
    /**
     * Obtiene todos los topics disponibles
     * 
     * @returns Promise con array de entidades ArticleTopic
     * @example
     * ```ts
     * const topics = await repository.findAll();
     * console.log(topics.length); // 3
     * ```
     */
    findAll(): Promise<ArticleTopic[]>;

    /**
     * Busca un topic por su ID
     * 
     * @param id - ID del topic
     * @returns Promise con la entidad ArticleTopic o null si no existe
     * @example
     * ```ts
     * const topic = await repository.findById(1);
     * if (topic) {
     *   console.log(topic.name); // "Historia"
     * }
     * ```
     */
    findById(id: number): Promise<ArticleTopic | null>;

    /**
     * Obtiene todos los topics con sus artículos relacionados
     * Ideal para construir menús de navegación
     * 
     * @returns Promise con array de topics incluyendo sus artículos
     * @example
     * ```ts
     * const navigation = await repository.findAllWithArticles();
     * navigation.forEach(item => {
     *   console.log(item.topic.name, item.articles.length);
     * });
     * ```
     */
    findAllWithArticles(): Promise<ArticleTopicWithArticles[]>;
}
