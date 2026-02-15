import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CheckUserCommentUseCase } from '@/core/application/use-cases/comments/CheckUserCommentUseCase';
import { Comment } from '@/core/domain/entities/Comment';
import type { ICommentRepository } from '@/core/domain/repositories/ICommentRepository';

/**
 * Tests para CheckUserCommentUseCase
 *
 * Verificamos:
 * - Retorna true cuando el usuario ya tiene comentario en el artículo
 * - Retorna false cuando no existe comentario previo
 * - Delega correctamente al repositorio
 */
describe('CheckUserCommentUseCase', () => {
    let mockCommentRepository: ICommentRepository;
    let checkUserCommentUseCase: CheckUserCommentUseCase;

    beforeEach(() => {
        mockCommentRepository = {
            findByArticleId: vi.fn(),
            findByUserAndArticle: vi.fn(),
            findById: vi.fn(),
            create: vi.fn(),
            delete: vi.fn(),
        };

        checkUserCommentUseCase = new CheckUserCommentUseCase(mockCommentRepository);
    });

    it('debe retornar true cuando el usuario ya ha comentado en el artículo', async () => {
        // Arrange — Existe un comentario del usuario
        const existingComment = new Comment({
            id: 'comment_123',
            textComment: 'Mi comentario previo en este artículo',
            userId: 'user_abc',
            articleId: 'article_xyz',
            createdAt: new Date(),
        });
        vi.mocked(mockCommentRepository.findByUserAndArticle).mockResolvedValue(existingComment);

        // Act
        const result = await checkUserCommentUseCase.execute('user_abc', 'article_xyz');

        // Assert
        expect(result).toBe(true);
    });

    it('debe retornar false cuando el usuario no ha comentado en el artículo', async () => {
        // Arrange — No existe comentario
        vi.mocked(mockCommentRepository.findByUserAndArticle).mockResolvedValue(null);

        // Act
        const result = await checkUserCommentUseCase.execute('user_new', 'article_xyz');

        // Assert
        expect(result).toBe(false);
    });

    it('debe delegar la búsqueda al repositorio con los parámetros correctos', async () => {
        // Arrange
        vi.mocked(mockCommentRepository.findByUserAndArticle).mockResolvedValue(null);

        // Act
        await checkUserCommentUseCase.execute('user_id_test', 'article_id_test');

        // Assert
        expect(mockCommentRepository.findByUserAndArticle).toHaveBeenCalledWith('user_id_test', 'article_id_test');
        expect(mockCommentRepository.findByUserAndArticle).toHaveBeenCalledTimes(1);
    });
});
