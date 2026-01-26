import { describe, it, expect } from 'vitest';
import { Article } from '@/core/domain/entities/Article';

/**
 * Tests para la entidad Article
 * 
 * Verificamos:
 * - Construcción correcta con datos válidos
 * - Validaciones de campos obligatorios
 * - Validaciones de reglas de negocio
 */
describe('Article Entity', () => {
    describe('Constructor - Casos válidos', () => {
        it('debe crear un artículo con todos los datos válidos', () => {
            // Arrange
            const validData = {
                id: 'clxxx123456',
                slug: 'pasado',
                name: 'Historia de Japón',
                info: 'Un recorrido por la historia japonesa',
                htmlRoute: '/articles/pasado/pasado.html',
                topicId: 1,
                createdAt: new Date('2024-01-01'),
            };

            // Act
            const article = new Article(validData);

            // Assert
            expect(article.id).toBe(validData.id);
            expect(article.slug).toBe(validData.slug);
            expect(article.name).toBe(validData.name);
            expect(article.info).toBe(validData.info);
            expect(article.htmlRoute).toBe(validData.htmlRoute);
            expect(article.topicId).toBe(validData.topicId);
            expect(article.createdAt).toEqual(validData.createdAt);
        });

        it('debe crear un artículo con info null', () => {
            // Arrange
            const validData = {
                id: 'clxxx123456',
                slug: 'presente',
                name: 'Japón Actual',
                info: null,
                htmlRoute: '/articles/presente/presente.html',
                topicId: 2,
                createdAt: new Date(),
            };

            // Act
            const article = new Article(validData);

            // Assert
            expect(article.info).toBeNull();
            expect(article.name).toBe('Japón Actual');
        });


    });

    describe('Constructor - Validaciones de campos obligatorios', () => {
        const validBase = {
            id: 'clxxx123456',
            slug: 'pasado',
            name: 'Historia de Japón',
            info: null,
            htmlRoute: '/articles/pasado/pasado.html',
            topicId: 1,
            createdAt: new Date(),
        };

        it('debe lanzar error si el id está vacío', () => {
            // Arrange
            const invalidData = { ...validBase, id: '' };

            // Act & Assert
            expect(() => new Article(invalidData)).toThrow('El ID del articulo no puede estar vacio');
        });

        it('debe lanzar error si el id es solo espacios', () => {
            // Arrange
            const invalidData = { ...validBase, id: '   ' };

            // Act & Assert
            expect(() => new Article(invalidData)).toThrow('El ID del articulo no puede estar vacio');
        });

        it('debe lanzar error si el slug está vacío', () => {
            // Arrange
            const invalidData = { ...validBase, slug: '' };

            // Act & Assert
            expect(() => new Article(invalidData)).toThrow('El slug del articulo no puede estar vacio');
        });

        it('debe lanzar error si el slug es solo espacios', () => {
            // Arrange
            const invalidData = { ...validBase, slug: '   ' };

            // Act & Assert
            expect(() => new Article(invalidData)).toThrow('El slug del articulo no puede estar vacio');
        });

        it('debe lanzar error si el name está vacío', () => {
            // Arrange
            const invalidData = { ...validBase, name: '' };

            // Act & Assert
            expect(() => new Article(invalidData)).toThrow('El nombre del articulo no puede estar vacio');
        });

        it('debe lanzar error si el name es solo espacios', () => {
            // Arrange
            const invalidData = { ...validBase, name: '   ' };

            // Act & Assert
            expect(() => new Article(invalidData)).toThrow('El nombre del articulo no puede estar vacio');
        });

        it('debe lanzar error si htmlRoute está vacío', () => {
            // Arrange
            const invalidData = { ...validBase, htmlRoute: '' };

            // Act & Assert
            expect(() => new Article(invalidData)).toThrow('La ruta del articulo no puede estar vacia');
        });

        it('debe lanzar error si htmlRoute es solo espacios', () => {
            // Arrange
            const invalidData = { ...validBase, htmlRoute: '   ' };

            // Act & Assert
            expect(() => new Article(invalidData)).toThrow('La ruta del articulo no puede estar vacia');
        });
    });

    describe('Constructor - Validaciones de reglas de negocio', () => {
        const validBase = {
            id: 'clxxx123456',
            slug: 'pasado',
            name: 'Historia de Japón',
            info: null,
            htmlRoute: '/articles/pasado/pasado.html',
            topicId: 1,
            createdAt: new Date(),
        };

        it('debe lanzar error si topicId es 0', () => {
            // Arrange
            const invalidData = { ...validBase, topicId: 0 };

            // Act & Assert
            expect(() => new Article(invalidData)).toThrow('El ID del topic debe ser positivo');
        });

        it('debe lanzar error si topicId es negativo', () => {
            // Arrange
            const invalidData = { ...validBase, topicId: -1 };

            // Act & Assert
            expect(() => new Article(invalidData)).toThrow('El ID del topic debe ser positivo');
        });

        it('debe aceptar topicId positivo', () => {
            // Arrange
            const validData = { ...validBase, topicId: 5 };

            // Act
            const article = new Article(validData);

            // Assert
            expect(article.topicId).toBe(5);
        });
    });
});
