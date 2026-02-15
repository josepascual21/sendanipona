import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateCommentUseCase } from '@/core/application/use-cases/comments/CreateCommentUseCase';
import { CommentAlreadyExistsError } from '@/core/domain/errors/CommentAlreadyExistsError';
import { Comment } from '@/core/domain/entities/Comment';
import type { ICommentRepository } from '@/core/domain/repositories/ICommentRepository';

/**
 * Tests para CreateCommentUseCase
 *
 * Verificamos:
 * - Creación exitosa cuando no existe comentario previo
 * - Error CommentAlreadyExistsError cuando ya existe un comentario del usuario
 * - Interacción correcta con el repositorio
 */
describe('CreateCommentUseCase', () => {
    let mockCommentRepository: ICommentRepository;
    let createCommentUseCase: CreateCommentUseCase;

    /** Comentario de prueba devuelto por el mock del repositorio */
    const createdComment = new Comment({
        id: 'new_comment_id',
        textComment: 'Un comentario muy interesante sobre Japón',
        userId: 'user_123',
        articleId: 'article_456',
        createdAt: new Date('2024-01-15'),
    });

    beforeEach(() => {
        mockCommentRepository = {
            findByArticleId: vi.fn(),
            findByUserAndArticle: vi.fn(),
            findById: vi.fn(),
            create: vi.fn().mockResolvedValue(createdComment),
            delete: vi.fn(),
        };

        createCommentUseCase = new CreateCommentUseCase(mockCommentRepository);
    });

    // ====================================================================
    // Creación exitosa
    // ====================================================================
    describe('Creación exitosa', () => {
        it('debe crear un comentario cuando el usuario no ha comentado antes', async () => {
            // Arrange — No existe comentario previo
            vi.mocked(mockCommentRepository.findByUserAndArticle).mockResolvedValue(null);

            const dto = {
                textComment: 'Un comentario muy interesante sobre Japón',
                userId: 'user_123',
                articleId: 'article_456',
            };

            // Act
            const result = await createCommentUseCase.execute(dto);

            // Assert
            expect(result).toBeInstanceOf(Comment);
            expect(result.textComment).toBe(dto.textComment);
        });

        it('debe verificar unicidad antes de crear', async () => {
            // Arrange
            vi.mocked(mockCommentRepository.findByUserAndArticle).mockResolvedValue(null);

            const dto = {
                textComment: 'Comentario de prueba para tests',
                userId: 'user_abc',
                articleId: 'article_xyz',
            };

            // Act
            await createCommentUseCase.execute(dto);

            // Assert — Se verificó la unicidad primero
            expect(mockCommentRepository.findByUserAndArticle).toHaveBeenCalledWith('user_abc', 'article_xyz');
            expect(mockCommentRepository.findByUserAndArticle).toHaveBeenCalledTimes(1);
        });

        it('debe delegar la creación al repositorio con los datos correctos', async () => {
            // Arrange
            vi.mocked(mockCommentRepository.findByUserAndArticle).mockResolvedValue(null);

            const dto = {
                textComment: 'Texto del comentario para persistir',
                userId: 'user_persist',
                articleId: 'article_persist',
            };

            // Act
            await createCommentUseCase.execute(dto);

            // Assert
            expect(mockCommentRepository.create).toHaveBeenCalledWith({
                textComment: 'Texto del comentario para persistir',
                userId: 'user_persist',
                articleId: 'article_persist',
            });
        });
    });

    // ====================================================================
    // Errores
    // ====================================================================
    describe('Errores', () => {
        it('debe lanzar CommentAlreadyExistsError si el usuario ya comentó', async () => {
            // Arrange — Ya existe un comentario del usuario
            const existingComment = new Comment({
                id: 'existing_comment',
                textComment: 'Ya comenté aquí antes',
                userId: 'user_123',
                articleId: 'article_456',
                createdAt: new Date(),
            });
            vi.mocked(mockCommentRepository.findByUserAndArticle).mockResolvedValue(existingComment);

            const dto = {
                textComment: 'Intento de segundo comentario',
                userId: 'user_123',
                articleId: 'article_456',
            };

            // Act & Assert
            await expect(createCommentUseCase.execute(dto)).rejects.toThrow(CommentAlreadyExistsError);
        });

        it('no debe llamar a create si el usuario ya comentó', async () => {
            // Arrange
            const existingComment = new Comment({
                id: 'existing',
                textComment: 'Comentario existente del user',
                userId: 'user_dup',
                articleId: 'art_dup',
                createdAt: new Date(),
            });
            vi.mocked(mockCommentRepository.findByUserAndArticle).mockResolvedValue(existingComment);

            // Act & Assert
            await expect(createCommentUseCase.execute({
                textComment: 'Segundo intento de comentar',
                userId: 'user_dup',
                articleId: 'art_dup',
            })).rejects.toThrow();

            expect(mockCommentRepository.create).not.toHaveBeenCalled();
        });
    });
});
