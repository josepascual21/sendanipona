import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetArticleById } from '@/core/application/use-cases/articles/GetArticleById';
import { Article } from '@/core/domain/entities/Article';
import type { IArticleRepository } from '@/core/domain/repositories/IArticleRepository';

/**
 * Tests para GetArticleById
 *
 * Verificamos:
 * - Retorna el artículo cuando el ID existe
 * - Retorna null cuando el ID no se encuentra
 * - Lanza error si el ID está vacío o es solo espacios
 * - Delega correctamente al repositorio
 */
describe('GetArticleById', () => {
    let mockArticleRepository: IArticleRepository;
    let getArticleById: GetArticleById;

    /** Artículo de prueba */
    const mockArticle = new Article({
        id: 'art_123',
        slug: 'pasado',
        name: 'Historia de Japón',
        info: 'Un recorrido por la historia japonesa',
        topicId: 1,
        createdAt: new Date('2024-01-01'),
    });

    beforeEach(() => {
        mockArticleRepository = {
            findAll: vi.fn(),
            findById: vi.fn(),
            findBySlug: vi.fn(),
            findByTopicId: vi.fn(),
        };

        getArticleById = new GetArticleById(mockArticleRepository);
    });

    it('debe retornar el artículo cuando el ID existe', async () => {
        // Arrange
        vi.mocked(mockArticleRepository.findById).mockResolvedValue(mockArticle);

        // Act
        const result = await getArticleById.execute('art_123');

        // Assert
        expect(result).toBe(mockArticle);
        expect(result?.id).toBe('art_123');
        expect(result?.name).toBe('Historia de Japón');
    });

    it('debe retornar null cuando el ID no se encuentra', async () => {
        // Arrange
        vi.mocked(mockArticleRepository.findById).mockResolvedValue(null);

        // Act
        const result = await getArticleById.execute('id_inexistente');

        // Assert
        expect(result).toBeNull();
    });

    it('debe delegar la búsqueda al repositorio con el ID correcto', async () => {
        // Arrange
        vi.mocked(mockArticleRepository.findById).mockResolvedValue(mockArticle);

        // Act
        await getArticleById.execute('art_123');

        // Assert
        expect(mockArticleRepository.findById).toHaveBeenCalledWith('art_123');
        expect(mockArticleRepository.findById).toHaveBeenCalledTimes(1);
    });

    it('debe lanzar error si el ID está vacío', async () => {
        // Act & Assert
        await expect(getArticleById.execute('')).rejects.toThrow('El ID no puede estar vacío');
    });

    it('debe lanzar error si el ID es solo espacios', async () => {
        // Act & Assert
        await expect(getArticleById.execute('   ')).rejects.toThrow('El ID no puede estar vacío');
    });

    it('no debe llamar al repositorio si el ID está vacío', async () => {
        // Act & Assert
        await expect(getArticleById.execute('')).rejects.toThrow();

        // Assert — No se llamó al repositorio
        expect(mockArticleRepository.findById).not.toHaveBeenCalled();
    });
});

