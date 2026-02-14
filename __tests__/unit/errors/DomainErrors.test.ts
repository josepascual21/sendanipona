import { describe, it, expect } from 'vitest';
import { InvalidEntityError } from '@/core/domain/errors/InvalidEntityError';
import { CommentAlreadyExistsError } from '@/core/domain/errors/CommentAlreadyExistsError';
import { CommentNotFoundError } from '@/core/domain/errors/CommentNotFoundError';
import { UnauthorizedDeleteError } from '@/core/domain/errors/UnauthorizedDeleteError';
import { UserAlreadyExistsError } from '@/core/domain/errors/UserAlreadyExistsError';

/**
 * Tests para los errores de dominio
 * 
 * Verificamos:
 * - Nombre correcto del error (propiedad name)
 * - Mensaje descriptivo con los datos relevantes
 * - Propiedades adicionales almacenadas correctamente
 * - Herencia de la clase Error nativa
 */
describe('Errores de Dominio', () => {

    // ====================================================================
    // InvalidEntityError
    // ====================================================================
    describe('InvalidEntityError', () => {
        it('debe crear el error con el nombre de entidad y razón correctos', () => {
            // Arrange & Act
            const error = new InvalidEntityError('User', 'Email de usuario es invalido');

            // Assert
            expect(error.message).toBe('Email de usuario es invalido');
            expect(error.name).toBe('InvalidEntityError');
            expect(error.entityName).toBe('User');
        });

        it('debe ser instancia de Error', () => {
            // Arrange & Act
            const error = new InvalidEntityError('Comment', 'Campo requerido');

            // Assert
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(InvalidEntityError);
        });

        it('debe funcionar con diferentes nombres de entidad', () => {
            // Arrange & Act & Assert
            const entidades = ['User', 'Comment', 'Article', 'ArticleTopic'];

            entidades.forEach(entityName => {
                const error = new InvalidEntityError(entityName, 'campo inválido');
                expect(error.entityName).toBe(entityName);
            });
        });
    });

    // ====================================================================
    // CommentAlreadyExistsError
    // ====================================================================
    describe('CommentAlreadyExistsError', () => {
        it('debe crear el error con userId y articleId en el mensaje', () => {
            // Arrange
            const userId = 'user_123';
            const articleId = 'article_456';

            // Act
            const error = new CommentAlreadyExistsError(userId, articleId);

            // Assert
            expect(error.message).toBe(`El usuario ${userId} ya ha comentado en el artículo ${articleId}`);
            expect(error.name).toBe('CommentAlreadyExistsError');
        });

        it('debe ser instancia de Error', () => {
            // Arrange & Act
            const error = new CommentAlreadyExistsError('u1', 'a1');

            // Assert
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(CommentAlreadyExistsError);
        });
    });

    // ====================================================================
    // CommentNotFoundError
    // ====================================================================
    describe('CommentNotFoundError', () => {
        it('debe crear el error con el commentId en el mensaje', () => {
            // Arrange
            const commentId = 'comment_789';

            // Act
            const error = new CommentNotFoundError(commentId);

            // Assert
            expect(error.message).toBe(`Comentario con ID ${commentId} no encontrado`);
            expect(error.name).toBe('CommentNotFoundError');
            expect(error.commentId).toBe(commentId);
        });

        it('debe ser instancia de Error', () => {
            // Arrange & Act
            const error = new CommentNotFoundError('c1');

            // Assert
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(CommentNotFoundError);
        });
    });

    // ====================================================================
    // UnauthorizedDeleteError
    // ====================================================================
    describe('UnauthorizedDeleteError', () => {
        it('debe crear el error con userId y commentId en el mensaje y propiedades', () => {
            // Arrange
            const userId = 'user_abc';
            const commentId = 'comment_xyz';

            // Act
            const error = new UnauthorizedDeleteError(userId, commentId);

            // Assert
            expect(error.message).toBe(
                `El usuario ${userId} no tiene permiso para eliminar el comentario ${commentId}`
            );
            expect(error.name).toBe('UnauthorizedDeleteError');
            expect(error.userId).toBe(userId);
            expect(error.commentId).toBe(commentId);
        });

        it('debe ser instancia de Error', () => {
            // Arrange & Act
            const error = new UnauthorizedDeleteError('u1', 'c1');

            // Assert
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(UnauthorizedDeleteError);
        });
    });

    // ====================================================================
    // UserAlreadyExistsError
    // ====================================================================
    describe('UserAlreadyExistsError', () => {
        it('debe crear el error con el email en el mensaje', () => {
            // Arrange
            const email = 'test@example.com';

            // Act
            const error = new UserAlreadyExistsError(email);

            // Assert
            expect(error.message).toBe(`El usuario con email ${email} ya existe.`);
            expect(error.name).toBe('UserAlreadyExistsError');
        });

        it('debe ser instancia de Error', () => {
            // Arrange & Act
            const error = new UserAlreadyExistsError('user@test.com');

            // Assert
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(UserAlreadyExistsError);
        });
    });
});
