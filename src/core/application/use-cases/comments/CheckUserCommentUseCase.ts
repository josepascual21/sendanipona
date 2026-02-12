import { ICommentRepository } from '@/core/domain/repositories/ICommentRepository';

/**
 * Caso de Uso: Verificar si un usuario ya ha comentado en un artículo
 *
 * Responsabilidad: Encapsular la regla de negocio de "un comentario por usuario por artículo"
 * para consultas de estado (lectura), separada de la validación en CreateCommentUseCase.
 */
export class CheckUserCommentUseCase {
    constructor(private readonly commentRepository: ICommentRepository) { }

    /**
     * Verifica si un usuario ya tiene un comentario publicado en un artículo
     *
     * @param userId - ID del usuario a verificar
     * @param articleId - ID del artículo donde buscar el comentario
     * @returns Promise<boolean> - true si ya existe un comentario del usuario
     */
    async execute(userId: string, articleId: string): Promise<boolean> {
        const existingComment = await this.commentRepository.findByUserAndArticle(userId, articleId);
        return existingComment !== null;
    }
}
