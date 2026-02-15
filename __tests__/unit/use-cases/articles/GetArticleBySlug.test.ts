import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetArticleBySlug } from '@/core/application/use-cases/articles/GetArticleBySlug';
import { Article } from '@/core/domain/entities/Article';
import type { IArticleRepository } from '@/core/domain/repositories/IArticleRepository';

/**
 * Tests para GetArticleBySlug
 *
 * Verificamos:
 * - Retorna el artículo cuando el slug existe
 * - Retorna null cuando el slug no se encuentra
 * - Lanza error si el slug está vacío
 * - Delega correctamente al repositorio
 */
describe('GetArticleBySlug', () => {
    let mockArticleRepository: IArticleRepository;
    let getArticleBySlug: GetArticleBySlug;

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

        getArticleBySlug = new GetArticleBySlug(mockArticleRepository);
    });

    it('debe retornar el artículo cuando el slug existe', async () => {
        // Arrange
        vi.mocked(mockArticleRepository.findBySlug).mockResolvedValue(mockArticle);

        // Act
        const result = await getArticleBySlug.execute('pasado');

        // Assert
        expect(result).toBe(mockArticle);
        expect(result?.slug).toBe('pasado');
        expect(result?.name).toBe('Historia de Japón');
    });

    it('debe retornar null cuando el slug no se encuentra', async () => {
        // Arrange
        vi.mocked(mockArticleRepository.findBySlug).mockResolvedValue(null);

        // Act
        const result = await getArticleBySlug.execute('slug-inexistente');

        // Assert
        expect(result).toBeNull();
    });

    it('debe delegar la búsqueda al repositorio con el slug correcto', async () => {
        // Arrange
        vi.mocked(mockArticleRepository.findBySlug).mockResolvedValue(mockArticle);

        // Act
        await getArticleBySlug.execute('pasado');

        // Assert
        expect(mockArticleRepository.findBySlug).toHaveBeenCalledWith('pasado');
        expect(mockArticleRepository.findBySlug).toHaveBeenCalledTimes(1);
    });

    it('debe lanzar error si el slug está vacío', async () => {
        // Act & Assert
        await expect(getArticleBySlug.execute('')).rejects.toThrow('El slug no puede estar vacío');
    });

    it('debe lanzar error si el slug es solo espacios', async () => {
        // Act & Assert
        await expect(getArticleBySlug.execute('   ')).rejects.toThrow('El slug no puede estar vacío');
    });
});
