import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetArticlesByTopic } from '@/core/application/use-cases/articles/GetArticlesByTopic';
import { Article } from '@/core/domain/entities/Article';
import type { IArticleRepository } from '@/core/domain/repositories/IArticleRepository';

/**
 * Tests para GetArticlesByTopic
 *
 * Verificamos:
 * - Retorna artículos del topic solicitado
 * - Retorna array vacío si no hay artículos en el topic
 * - Lanza error si el topicId es inválido (≤ 0)
 * - Delega correctamente al repositorio
 */
describe('GetArticlesByTopic', () => {
    let mockArticleRepository: IArticleRepository;
    let getArticlesByTopic: GetArticlesByTopic;

    /** Artículos de prueba para un topic */
    const mockArticles = [
        new Article({
            id: 'art_1',
            slug: 'pasado',
            name: 'Pasado de Japón',
            info: 'Artículo sobre el pasado',
            topicId: 1,
            createdAt: new Date('2024-01-01'),
        }),
        new Article({
            id: 'art_2',
            slug: 'presente',
            name: 'Japón Actual',
            info: null,
            topicId: 1,
            createdAt: new Date('2024-01-02'),
        }),
    ];

    beforeEach(() => {
        mockArticleRepository = {
            findAll: vi.fn(),
            findById: vi.fn(),
            findBySlug: vi.fn(),
            findByTopicId: vi.fn().mockResolvedValue(mockArticles),
        };

        getArticlesByTopic = new GetArticlesByTopic(mockArticleRepository);
    });

    it('debe retornar los artículos del topic solicitado', async () => {
        // Act
        const result = await getArticlesByTopic.execute(1);

        // Assert
        expect(result).toHaveLength(2);
        expect(result[0].slug).toBe('pasado');
        expect(result[1].slug).toBe('presente');
    });

    it('debe retornar array vacío si no hay artículos en el topic', async () => {
        // Arrange
        vi.mocked(mockArticleRepository.findByTopicId).mockResolvedValue([]);

        // Act
        const result = await getArticlesByTopic.execute(99);

        // Assert
        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
    });

    it('debe delegar la búsqueda al repositorio con el topicId correcto', async () => {
        // Act
        await getArticlesByTopic.execute(1);

        // Assert
        expect(mockArticleRepository.findByTopicId).toHaveBeenCalledWith(1);
        expect(mockArticleRepository.findByTopicId).toHaveBeenCalledTimes(1);
    });

    it('debe lanzar error si el topicId es 0', async () => {
        // Act & Assert
        await expect(getArticlesByTopic.execute(0)).rejects.toThrow('El ID del topic debe ser positivo');
    });

    it('debe lanzar error si el topicId es negativo', async () => {
        // Act & Assert
        await expect(getArticlesByTopic.execute(-1)).rejects.toThrow('El ID del topic debe ser positivo');
    });

    it('no debe llamar al repositorio si el topicId es inválido', async () => {
        // Act & Assert
        await expect(getArticlesByTopic.execute(0)).rejects.toThrow();

        // Assert — No se llamó al repositorio
        expect(mockArticleRepository.findByTopicId).not.toHaveBeenCalled();
    });
});

