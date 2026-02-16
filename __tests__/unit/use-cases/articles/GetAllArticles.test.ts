import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetAllArticles } from '@/core/application/use-cases/articles/GetAllArticles';
import { Article } from '@/core/domain/entities/Article';
import type { IArticleRepository } from '@/core/domain/repositories/IArticleRepository';

/**
 * Tests para GetAllArticles
 *
 * Verificamos:
 * - Retorna todos los artículos disponibles
 * - Retorna array vacío cuando no hay artículos
 * - Delega correctamente al repositorio
 */
describe('GetAllArticles', () => {
    let mockArticleRepository: IArticleRepository;
    let getAllArticles: GetAllArticles;

    /** Artículos de prueba */
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
        new Article({
            id: 'art_3',
            slug: 'anime-manga',
            name: 'Anime y Manga',
            info: 'El mundo del anime',
            topicId: 2,
            createdAt: new Date('2024-01-03'),
        }),
    ];

    beforeEach(() => {
        mockArticleRepository = {
            findAll: vi.fn().mockResolvedValue(mockArticles),
            findById: vi.fn(),
            findBySlug: vi.fn(),
            findByTopicId: vi.fn(),
        };

        getAllArticles = new GetAllArticles(mockArticleRepository);
    });

    it('debe retornar todos los artículos disponibles', async () => {
        // Act
        const result = await getAllArticles.execute();

        // Assert
        expect(result).toHaveLength(3);
        expect(result[0].slug).toBe('pasado');
        expect(result[1].slug).toBe('presente');
        expect(result[2].slug).toBe('anime-manga');
    });

    it('debe retornar array vacío cuando no hay artículos', async () => {
        // Arrange
        vi.mocked(mockArticleRepository.findAll).mockResolvedValue([]);

        // Act
        const result = await getAllArticles.execute();

        // Assert
        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
    });

    it('debe delegar la consulta al repositorio', async () => {
        // Act
        await getAllArticles.execute();

        // Assert
        expect(mockArticleRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('debe retornar instancias de Article', async () => {
        // Act
        const result = await getAllArticles.execute();

        // Assert
        result.forEach(article => {
            expect(article).toBeInstanceOf(Article);
        });
    });
});

