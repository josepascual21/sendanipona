import { describe, it, expect } from 'vitest';
import { Comment } from '@/core/domain/entities/Comment';

/**
 * Tests para la entidad Comment
 * 
 * Verificamos:
 * - Construcción correcta con datos válidos
 * - Validaciones de campos obligatorios
 * - Validaciones de longitud de texto (10-500 caracteres)
 */
describe('Comment Entity', () => {
    describe('Constructor - Casos válidos', () => {
        it('debe crear un comentario con todos los datos válidos', () => {
            // Arrange
            const validData = {
                id: 'clyyy456789',
                textComment: 'Este es un comentario válido sobre el artículo de Japón.',
                userId: 'clzzz123456',
                articleId: 'clxxx789012',
                createdAt: new Date('2024-01-15'),
            };

            // Act
            const comment = new Comment(validData);

            // Assert
            expect(comment.id).toBe(validData.id);
            expect(comment.textComment).toBe(validData.textComment);
            expect(comment.userId).toBe(validData.userId);
            expect(comment.articleId).toBe(validData.articleId);
            expect(comment.createdAt).toEqual(validData.createdAt);
        });

        it('debe aceptar un comentario con exactamente 10 caracteres', () => {
            // Arrange
            const validData = {
                id: 'clyyy456789',
                textComment: 'Diez chars', // Exactamente 10 caracteres
                userId: 'clzzz123456',
                articleId: 'clxxx789012',
                createdAt: new Date(),
            };

            // Act
            const comment = new Comment(validData);

            // Assert
            expect(comment.textComment).toBe('Diez chars');
            expect(comment.textComment.length).toBe(10);
        });

        it('debe aceptar un comentario con exactamente 500 caracteres', () => {
            // Arrange
            const longText = 'A'.repeat(500); // Exactamente 500 caracteres
            const validData = {
                id: 'clyyy456789',
                textComment: longText,
                userId: 'clzzz123456',
                articleId: 'clxxx789012',
                createdAt: new Date(),
            };

            // Act
            const comment = new Comment(validData);

            // Assert
            expect(comment.textComment.length).toBe(500);
        });


    });

    describe('Constructor - Validaciones de campos obligatorios', () => {
        const validBase = {
            id: 'clyyy456789',
            textComment: 'Este es un comentario válido',
            userId: 'clzzz123456',
            articleId: 'clxxx789012',
            createdAt: new Date(),
        };

        it('debe lanzar error si el id está vacío', () => {
            // Arrange
            const invalidData = { ...validBase, id: '' };

            // Act & Assert
            expect(() => new Comment(invalidData)).toThrow('Comment ID no puede estar vacio');
        });

        it('debe lanzar error si el id es solo espacios', () => {
            // Arrange
            const invalidData = { ...validBase, id: '   ' };

            // Act & Assert
            expect(() => new Comment(invalidData)).toThrow('Comment ID no puede estar vacio');
        });

        it('debe lanzar error si textComment está vacío', () => {
            // Arrange
            const invalidData = { ...validBase, textComment: '' };

            // Act & Assert
            expect(() => new Comment(invalidData)).toThrow('Comment text no puede estar vacio');
        });

        it('debe lanzar error si textComment es solo espacios', () => {
            // Arrange
            const invalidData = { ...validBase, textComment: '   ' };

            // Act & Assert
            expect(() => new Comment(invalidData)).toThrow('Comment text no puede estar vacio');
        });

        it('debe lanzar error si userId está vacío', () => {
            // Arrange
            const invalidData = { ...validBase, userId: '' };

            // Act & Assert
            expect(() => new Comment(invalidData)).toThrow('Comment userId no puede estar vacio');
        });

        it('debe lanzar error si userId es solo espacios', () => {
            // Arrange
            const invalidData = { ...validBase, userId: '   ' };

            // Act & Assert
            expect(() => new Comment(invalidData)).toThrow('Comment userId no puede estar vacio');
        });

        it('debe lanzar error si articleId está vacío', () => {
            // Arrange
            const invalidData = { ...validBase, articleId: '' };

            // Act & Assert
            expect(() => new Comment(invalidData)).toThrow('Comment articleId no puede estar vacio');
        });

        it('debe lanzar error si articleId es solo espacios', () => {
            // Arrange
            const invalidData = { ...validBase, articleId: '   ' };

            // Act & Assert
            expect(() => new Comment(invalidData)).toThrow('Comment articleId no puede estar vacio');
        });
    });

    describe('Constructor - Validaciones de longitud de texto', () => {
        const validBase = {
            id: 'clyyy456789',
            textComment: 'Este es un comentario válido',
            userId: 'clzzz123456',
            articleId: 'clxxx789012',
            createdAt: new Date(),
        };

        it('debe lanzar error si textComment tiene menos de 10 caracteres', () => {
            // Arrange
            const invalidData = { ...validBase, textComment: 'Corto' }; // 5 caracteres

            // Act & Assert
            expect(() => new Comment(invalidData)).toThrow('Comment text debe tener al menos 10 caracteres');
        });

        it('debe lanzar error si textComment tiene exactamente 9 caracteres', () => {
            // Arrange
            const invalidData = { ...validBase, textComment: 'NueveChar' }; // 9 caracteres

            // Act & Assert
            expect(() => new Comment(invalidData)).toThrow('Comment text debe tener al menos 10 caracteres');
        });

        it('debe lanzar error si textComment tiene más de 500 caracteres', () => {
            // Arrange
            const longText = 'A'.repeat(501); // 501 caracteres
            const invalidData = { ...validBase, textComment: longText };

            // Act & Assert
            expect(() => new Comment(invalidData)).toThrow('Comment text no puede exceder 500 caracteres');
        });

        it('debe aceptar un comentario con longitud entre 10 y 500 caracteres', () => {
            // Arrange
            const validData = { ...validBase, textComment: 'Este comentario tiene una longitud válida de caracteres.' };

            // Act
            const comment = new Comment(validData);

            // Assert
            expect(comment.textComment.length).toBeGreaterThanOrEqual(10);
            expect(comment.textComment.length).toBeLessThanOrEqual(500);
        });
    });
});
