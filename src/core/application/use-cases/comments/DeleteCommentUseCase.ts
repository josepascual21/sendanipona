import { ICommentRepository } from '@/core/domain/repositories/ICommentRepository';
import { CommentNotFoundError } from '@/core/domain/errors/CommentNotFoundError';
import { UnauthorizedDeleteError } from '@/core/domain/errors/UnauthorizedDeleteError';

/**
 * Caso de uso: Eliminar un comentario existente
 * 
 * Valida que el comentario exista y que el usuario sea su propietario
 * antes de proceder con la eliminación.
 */
export class DeleteCommentUseCase {
    constructor(private commentRepository: ICommentRepository) { }

    async execute(commentId: string, userId: string): Promise<void> {
        // 1. Buscar comentario para verificar existencia y propiedad
        const comment = await this.commentRepository.findById(commentId);

        if (!comment) {
            throw new CommentNotFoundError(commentId);
        }

        // 2. Validar que el usuario sea el dueño del comentario
        if (comment.userId !== userId) {
            throw new UnauthorizedDeleteError(userId, commentId);
        }

        // 3. Eliminar
        await this.commentRepository.delete(commentId);
    }
}
