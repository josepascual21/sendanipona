import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetArticleCommentsUseCase } from '@/core/application/use-cases/comments/GetArticleCommentsUseCase';
import { Comment } from '@/core/domain/entities/Comment';
import type { ICommentRepository } from '@/core/domain/repositories/ICommentRepository';

/**
 * Tests para GetArticleCommentsUseCase
 *
 * Verificamos:
 * - Retorna comentarios del artículo
 * - Cálculo correcto del offset para paginación
 * - Usa valores por defecto para page y pageSize
 * - Retorna array vacío si no hay comentarios
 */
describe('GetArticleCommentsUseCase', () => {
    let mockCommentRepository: ICommentRepository;
    let getArticleCommentsUseCase: GetArticleCommentsUseCase;

    /** Comentarios de prueba */
    const mockComments = [
        new Comment({
            id: 'c1',
            textComment: 'Primer comentario del artículo',
            userId: 'u1',
            articleId: 'art_1',
            createdAt: new Date('2024-01-01'),
        }),
        new Comment({
            id: 'c2',
            textComment: 'Segundo comentario del artículo',
            userId: 'u2',
            articleId: 'art_1',
            createdAt: new Date('2024-01-02'),
        }),
    ];

    beforeEach(() => {
        mockCommentRepository = {
            findByArticleId: vi.fn().mockResolvedValue(mockComments),
            findByUserAndArticle: vi.fn(),
            findById: vi.fn(),
            create: vi.fn(),
            delete: vi.fn(),
        };

        getArticleCommentsUseCase = new GetArticleCommentsUseCase(mockCommentRepository);
    });

    it('debe retornar los comentarios de un artículo', async () => {
        // Act
        const result = await getArticleCommentsUseCase.execute('art_1');

        // Assert
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe('c1');
        expect(result[1].id).toBe('c2');
    });

    it('debe usar page=1 y pageSize=4 por defecto', async () => {
        // Act
        await getArticleCommentsUseCase.execute('art_1');

        // Assert — offset = (1-1)*4 = 0, limit = 4
        expect(mockCommentRepository.findByArticleId).toHaveBeenCalledWith('art_1', 0, 4);
    });

    it('debe calcular el offset correctamente para la página 2', async () => {
        // Act
        await getArticleCommentsUseCase.execute('art_1', 2);

        // Assert — offset = (2-1)*4 = 4
        expect(mockCommentRepository.findByArticleId).toHaveBeenCalledWith('art_1', 4, 4);
    });

    it('debe calcular el offset correctamente para la página 3', async () => {
        // Act
        await getArticleCommentsUseCase.execute('art_1', 3);

        // Assert — offset = (3-1)*4 = 8
        expect(mockCommentRepository.findByArticleId).toHaveBeenCalledWith('art_1', 8, 4);
    });

    it('debe retornar array vacío si no hay comentarios', async () => {
        // Arrange
        vi.mocked(mockCommentRepository.findByArticleId).mockResolvedValue([]);

        // Act
        const result = await getArticleCommentsUseCase.execute('art_sin_comments');

        // Assert
        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
    });
});
