import { describe, it, expect } from 'vitest';
import { ArticleTopic } from '@/core/domain/entities/ArticleTopic';

/**
 * Tests para la entidad ArticleTopic
 * 
 * Verificamos:
 * - Construcción correcta con datos válidos
 * - Validaciones de campos obligatorios (id positivo, name no vacío)
 */
describe('ArticleTopic Entity', () => {
    describe('Constructor - Casos válidos', () => {
        it('debe crear un topic con todos los datos válidos', () => {
            // Arrange
            const validData = {
                id: 1,
                name: 'Historia',
            };

            // Act
            const topic = new ArticleTopic(validData);

            // Assert
            expect(topic.id).toBe(validData.id);
            expect(topic.name).toBe(validData.name);
        });

        it.each([
            { id: 1, name: 'Historia' },
            { id: 2, name: 'Cultura' },
            { id: 3, name: 'Tecnología' },
            { id: 4, name: 'Gastronomía' },
        ])('debe crear topic "$name" con id $id', ({ id, name }) => {
            // Act
            const topic = new ArticleTopic({ id, name });

            // Assert
            expect(topic.name).toBe(name);
            expect(topic.id).toBe(id);
        });
    });

    describe('Constructor - Validaciones de id', () => {
        it('debe lanzar error si el id es 0', () => {
            // Arrange
            const invalidData = { id: 0, name: 'Historia' };

            // Act & Assert
            expect(() => new ArticleTopic(invalidData)).toThrow('ArticleTopic ID debe ser positivo');
        });

        it('debe lanzar error si el id es negativo', () => {
            // Arrange
            const invalidData = { id: -1, name: 'Historia' };

            // Act & Assert
            expect(() => new ArticleTopic(invalidData)).toThrow('ArticleTopic ID debe ser positivo');
        });

        it('debe aceptar un id positivo', () => {
            // Arrange
            const validData = { id: 5, name: 'Cultura' };

            // Act
            const topic = new ArticleTopic(validData);

            // Assert
            expect(topic.id).toBe(5);
        });
    });

    describe('Constructor - Validaciones de name', () => {
        it('debe lanzar error si el name está vacío', () => {
            // Arrange
            const invalidData = { id: 1, name: '' };

            // Act & Assert
            expect(() => new ArticleTopic(invalidData)).toThrow('ArticleTopic name no puede estar vacio');
        });

        it('debe lanzar error si el name es solo espacios', () => {
            // Arrange
            const invalidData = { id: 1, name: '   ' };

            // Act & Assert
            expect(() => new ArticleTopic(invalidData)).toThrow('ArticleTopic name no puede estar vacio');
        });
    });
});
