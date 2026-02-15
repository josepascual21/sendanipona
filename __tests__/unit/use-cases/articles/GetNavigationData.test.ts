import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetNavigationData } from '@/core/application/use-cases/articles/GetNavigationData';
import { ArticleTopic } from '@/core/domain/entities/ArticleTopic';
import { Article } from '@/core/domain/entities/Article';
import type { IArticleTopicRepository } from '@/core/domain/repositories/IArticleTopicRepository';

/**
 * Tests para GetNavigationData
 *
 * Verificamos:
 * - Transformación correcta de entidades de dominio a DTOs serializables
 * - Retorna array vacío si no hay topics
 * - Estructura correcta del DTO de salida
 */
describe('GetNavigationData', () => {
    let mockArticleTopicRepository: IArticleTopicRepository;
    let getNavigationData: GetNavigationData;

    /** Datos de prueba: topics con artículos */
    const mockTopicsWithArticles = [
        {
            topic: new ArticleTopic({ id: 1, name: 'Historia' }),
            articles: [
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
            ],
        },
        {
            topic: new ArticleTopic({ id: 2, name: 'Cultura' }),
            articles: [
                new Article({
                    id: 'art_3',
                    slug: 'anime-manga',
                    name: 'Anime y Manga',
                    info: 'El mundo del anime',
                    topicId: 2,
                    createdAt: new Date('2024-01-03'),
                }),
            ],
        },
    ];

    beforeEach(() => {
        mockArticleTopicRepository = {
            findAll: vi.fn(),
            findById: vi.fn(),
            findAllWithArticles: vi.fn().mockResolvedValue(mockTopicsWithArticles),
        };

        getNavigationData = new GetNavigationData(mockArticleTopicRepository);
    });

    it('debe transformar topics con artículos a DTOs', async () => {
        // Act
        const result = await getNavigationData.execute();

        // Assert — Estructura correcta
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe(1);
        expect(result[0].name).toBe('Historia');
        expect(result[0].articles).toHaveLength(2);
        expect(result[1].id).toBe(2);
        expect(result[1].name).toBe('Cultura');
        expect(result[1].articles).toHaveLength(1);
    });

    it('debe incluir solo las propiedades necesarias en los DTOs de artículos', async () => {
        // Act
        const result = await getNavigationData.execute();

        // Assert — El DTO del artículo tiene solo id, name, slug, info
        const firstArticle = result[0].articles[0];
        expect(firstArticle).toEqual({
            id: 'art_1',
            name: 'Pasado de Japón',
            slug: 'pasado',
            info: 'Artículo sobre el pasado',
        });
    });

    it('debe manejar artículos con info null', async () => {
        // Act
        const result = await getNavigationData.execute();

        // Assert — El segundo artículo tiene info null
        const secondArticle = result[0].articles[1];
        expect(secondArticle.info).toBeNull();
    });

    it('debe retornar array vacío si no hay topics', async () => {
        // Arrange
        vi.mocked(mockArticleTopicRepository.findAllWithArticles).mockResolvedValue([]);

        // Act
        const result = await getNavigationData.execute();

        // Assert
        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
    });

    it('debe delegar la consulta al repositorio de topics', async () => {
        // Act
        await getNavigationData.execute();

        // Assert
        expect(mockArticleTopicRepository.findAllWithArticles).toHaveBeenCalledTimes(1);
    });
});
