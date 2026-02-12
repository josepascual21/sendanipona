import { Comment } from '../entities/Comment';

/**
 * Interface ICommentRepository - Define el contrato para gestionar comentarios
 * 
 * Esta interface pertenece a la capa de dominio y NO debe tener dependencias
 * de infraestructura (Prisma, APIs, etc.).
 */
export interface ICommentRepository {
    /**
     * Obtiene los comentarios de un artículo con paginación
     * 
     * @param articleId - ID del artículo
     * @param offset - Número de registros a saltar (para paginación)
     * @param limit - Número de registros a devolver (por defecto 4)
     * @returns Promise con array de entidades Comment ordenados por fecha desc
     */
    findByArticleId(articleId: string, offset?: number, limit?: number): Promise<Comment[]>;

    /**
     * Busca si existe un comentario de un usuario específico en un artículo.
     * Útil para validar la regla de "un comentario por usuario".
     * 
     * @param userId - ID del usuario
     * @param articleId - ID del artículo
     * @returns Promise con el comentario si existe, o null
     */
    findByUserAndArticle(userId: string, articleId: string): Promise<Comment | null>;

    /**
     * Busca un comentario específico por su ID
     * 
     * @param id - ID del comentario
     * @returns Promise con la entidad Comment o null si no existe
     * @example
     * ```ts
     * const comment = await repository.findById('clyyy456');
     * if (comment) {
     *   console.log(comment.textComment);
     * }
     * ```
     */
    findById(id: string): Promise<Comment | null>;

    /**
     * Crea un nuevo comentario
     * 
     * @param comment - Entidad Comment a persistir (sin ID ni createdAt)
     * @returns Promise con la entidad Comment creada (con ID y createdAt asignados)
     * @example
     * ```ts
     * const newComment = await repository.create({
     *   textComment: "Excelente artículo sobre Japón",
     *   userId: "clzzz789",
     *   articleId: "clxxx123"
     * });
     * console.log(newComment.id); // "clyyy456"
     * ```
     */
    create(comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment>;

    /**
     * Elimina un comentario por su ID
     * 
     * @param id - ID del comentario a eliminar
     * @returns Promise<void>
     * @throws Error si el comentario no existe
     * @example
     * ```ts
     * await repository.delete('clyyy456');
     * ```
     */
    delete(id: string): Promise<void>;
}
