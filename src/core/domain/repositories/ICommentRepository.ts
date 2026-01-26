import { Comment } from '../entities/Comment';

/**
 * Interface ICommentRepository - Define el contrato para gestionar comentarios
 * 
 * Esta interface pertenece a la capa de dominio y NO debe tener dependencias
 * de infraestructura (Prisma, APIs, etc.).
 */
export interface ICommentRepository {
    /**
     * Obtiene todos los comentarios de un artículo específico
     * 
     * @param articleId - ID del artículo
     * @returns Promise con array de entidades Comment ordenados por fecha (más recientes primero)
     * @example
     * ```ts
     * const comments = await repository.findByArticleId('clxxx123');
     * console.log(comments.length); // 5
     * ```
     */
    findByArticleId(articleId: string): Promise<Comment[]>;

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
