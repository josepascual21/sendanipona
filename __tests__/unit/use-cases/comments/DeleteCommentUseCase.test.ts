import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DeleteCommentUseCase } from '@/core/application/use-cases/comments/DeleteCommentUseCase';
import { CommentNotFoundError } from '@/core/domain/errors/CommentNotFoundError';
import { UnauthorizedDeleteError } from '@/core/domain/errors/UnauthorizedDeleteError';
import { Comment } from '@/core/domain/entities/Comment';
import type { ICommentRepository } from '@/core/domain/repositories/ICommentRepository';

/**
 * Tests para DeleteCommentUseCase
 *
 * Verificamos:
 * - Eliminación exitosa cuando el usuario es propietario
 * - Error CommentNotFoundError si el comentario no existe
 * - Error UnauthorizedDeleteError si el usuario no es propietario
 */
describe('DeleteCommentUseCase', () => {
    let mockCommentRepository: ICommentRepository;
    let deleteCommentUseCase: DeleteCommentUseCase;

    /** Comentario de prueba propiedad del user_owner */
    const existingComment = new Comment({
        id: 'comment_to_delete',
        textComment: 'Comentario que será eliminado',
        userId: 'user_owner',
        articleId: 'article_123',
        createdAt: new Date('2024-01-15'),
    });

    beforeEach(() => {
        mockCommentRepository = {
            findByArticleId: vi.fn(),
            findByUserAndArticle: vi.fn(),
            findById: vi.fn(),
            create: vi.fn(),
            delete: vi.fn(),
        };

        deleteCommentUseCase = new DeleteCommentUseCase(mockCommentRepository);
    });

    // ====================================================================
    // Eliminación exitosa
    // ====================================================================
    describe('Eliminación exitosa', () => {
        it('debe eliminar un comentario cuando el usuario es el propietario', async () => {
            // Arrange
            vi.mocked(mockCommentRepository.findById).mockResolvedValue(existingComment);

            // Act
            await deleteCommentUseCase.execute('comment_to_delete', 'user_owner');

            // Assert
            expect(mockCommentRepository.delete).toHaveBeenCalledWith('comment_to_delete');
            expect(mockCommentRepository.delete).toHaveBeenCalledTimes(1);
        });

        it('debe verificar existencia y propiedad antes de eliminar', async () => {
            // Arrange
            vi.mocked(mockCommentRepository.findById).mockResolvedValue(existingComment);

            // Act
            await deleteCommentUseCase.execute('comment_to_delete', 'user_owner');

            // Assert — Se buscó el comentario por ID primero
            expect(mockCommentRepository.findById).toHaveBeenCalledWith('comment_to_delete');
        });
    });

    // ====================================================================
    // Errores
    // ====================================================================
    describe('Errores', () => {
        it('debe lanzar CommentNotFoundError si el comentario no existe', async () => {
            // Arrange — findById devuelve null
            vi.mocked(mockCommentRepository.findById).mockResolvedValue(null);

            // Act & Assert
            await expect(
                deleteCommentUseCase.execute('comment_inexistente', 'user_123')
            ).rejects.toThrow(CommentNotFoundError);
        });

        it('debe lanzar UnauthorizedDeleteError si el usuario no es propietario', async () => {
            // Arrange — El comentario pertenece a user_owner, no a user_intruso
            vi.mocked(mockCommentRepository.findById).mockResolvedValue(existingComment);

            // Act & Assert
            await expect(
                deleteCommentUseCase.execute('comment_to_delete', 'user_intruso')
            ).rejects.toThrow(UnauthorizedDeleteError);
        });

        it('no debe llamar a delete si el comentario no existe', async () => {
            // Arrange
            vi.mocked(mockCommentRepository.findById).mockResolvedValue(null);

            // Act & Assert
            await expect(
                deleteCommentUseCase.execute('no_existe', 'user_123')
            ).rejects.toThrow();

            expect(mockCommentRepository.delete).not.toHaveBeenCalled();
        });

        it('no debe llamar a delete si el usuario no es propietario', async () => {
            // Arrange
            vi.mocked(mockCommentRepository.findById).mockResolvedValue(existingComment);

            // Act & Assert
            await expect(
                deleteCommentUseCase.execute('comment_to_delete', 'user_intruso')
            ).rejects.toThrow();

            expect(mockCommentRepository.delete).not.toHaveBeenCalled();
        });
    });
});
