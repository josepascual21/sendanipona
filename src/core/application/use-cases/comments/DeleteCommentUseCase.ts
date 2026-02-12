import { ICommentRepository } from '@/core/domain/repositories/ICommentRepository';

export class DeleteCommentUseCase {
    constructor(private commentRepository: ICommentRepository) { }

    async execute(commentId: string, userId: string): Promise<void> {
        // 1. Buscar comentario para verificar existencia y propiedad
        const comment = await this.commentRepository.findById(commentId);

        if (!comment) {
            throw new Error('Comentario no encontrado');
        }

        // 2. Validar que el usuario sea el dueño del comentario
        if (comment.userId !== userId) {
            throw new Error('No tienes permiso para eliminar este comentario');
        }

        // 3. Eliminar
        await this.commentRepository.delete(commentId);
    }
}
