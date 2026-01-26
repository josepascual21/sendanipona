import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { PrismaArticleRepository } from '@infra/repositories/PrismaArticleRepository';
import { Article } from '@core/domain/entities/Article';
import { prisma } from '@infra/database/prisma';

/**
 * Tests de Integración para PrismaArticleRepository
 * 
 * Estos tests verifican la integración real con la base de datos SQLite.
 * Se ejecutan contra una base de datos de prueba y verifican:
 * - Operaciones CRUD completas
 * - Mapeo correcto entre modelos Prisma y entidades de dominio
 * - Comportamiento con datos reales
 */
describe('PrismaArticleRepository - Integration Tests', () => {
    let repository: PrismaArticleRepository;
    let testTopicId: number;

    /**
     * Setup: Limpia la BD y crea datos de prueba antes de cada test
     */
    beforeEach(async () => {
        repository = new PrismaArticleRepository();

        // Limpiar datos existentes
        await prisma.comment.deleteMany();
        await prisma.article.deleteMany();
        await prisma.articleTopic.deleteMany();

        // Crear un topic de prueba
        const topic = await prisma.articleTopic.create({
            data: { name: 'Historia' },
        });
        testTopicId = topic.id;
    });

    /**
     * Cleanup: Cierra la conexión después de todos los tests
     */
    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe('findAll()', () => {
        it('debe retornar un array vacío cuando no hay artículos', async () => {
            // Act
            const articles = await repository.findAll();

            // Assert
            expect(articles).toEqual([]);
            expect(articles).toHaveLength(0);
        });

        it('debe retornar todos los artículos ordenados por fecha descendente', async () => {
            // Arrange - Crear artículos con diferentes fechas
            const article1 = await prisma.article.create({
                data: {
                    name: 'Artículo Antiguo',
                    slug: 'antiguo',
                    info: 'Primer artículo',
                    htmlRoute: '/articles/antiguo.html',
                    topicId: testTopicId,
                    createdAt: new Date('2024-01-01'),
                },
            });

            const article2 = await prisma.article.create({
                data: {
                    name: 'Artículo Reciente',
                    slug: 'reciente',
                    info: 'Segundo artículo',
                    htmlRoute: '/articles/reciente.html',
                    topicId: testTopicId,
                    createdAt: new Date('2024-06-01'),
                },
            });

            // Act
            const articles = await repository.findAll();

            // Assert
            expect(articles).toHaveLength(2);
            expect(articles[0]).toBeInstanceOf(Article);
            expect(articles[1]).toBeInstanceOf(Article);

            // Verificar orden descendente (más reciente primero)
            expect(articles[0].slug).toBe('reciente');
            expect(articles[1].slug).toBe('antiguo');
        });

        it('debe mapear correctamente los campos de Prisma a la entidad Article', async () => {
            // Arrange
            const prismaArticle = await prisma.article.create({
                data: {
                    name: 'Historia de Japón',
                    slug: 'historia-japon',
                    info: 'Un recorrido histórico',
                    htmlRoute: '/articles/historia.html',
                    topicId: testTopicId,
                },
            });

            // Act
            const articles = await repository.findAll();
            const article = articles[0];

            // Assert
            expect(article.id).toBe(prismaArticle.id);
            expect(article.slug).toBe('historia-japon');
            expect(article.name).toBe('Historia de Japón');
            expect(article.info).toBe('Un recorrido histórico');
            expect(article.htmlRoute).toBe('/articles/historia.html');
            expect(article.topicId).toBe(testTopicId);
            expect(article.createdAt).toBeInstanceOf(Date);
        });

        it('debe manejar correctamente el campo info cuando es null', async () => {
            // Arrange
            await prisma.article.create({
                data: {
                    name: 'Artículo sin descripción',
                    slug: 'sin-descripcion',
                    info: null,
                    htmlRoute: '/articles/sin-desc.html',
                    topicId: testTopicId,
                },
            });

            // Act
            const articles = await repository.findAll();

            // Assert
            expect(articles[0].info).toBeNull();
        });
    });

    describe('findBySlug()', () => {
        it('debe retornar null cuando el slug no existe', async () => {
            // Act
            const article = await repository.findBySlug('no-existe');

            // Assert
            expect(article).toBeNull();
        });

        it('debe retornar el artículo correcto cuando el slug existe', async () => {
            // Arrange
            await prisma.article.create({
                data: {
                    name: 'Pasado',
                    slug: 'pasado',
                    info: 'Historia antigua',
                    htmlRoute: '/articles/pasado.html',
                    topicId: testTopicId,
                },
            });

            await prisma.article.create({
                data: {
                    name: 'Presente',
                    slug: 'presente',
                    info: 'Actualidad',
                    htmlRoute: '/articles/presente.html',
                    topicId: testTopicId,
                },
            });

            // Act
            const article = await repository.findBySlug('pasado');

            // Assert
            expect(article).not.toBeNull();
            expect(article).toBeInstanceOf(Article);
            expect(article!.slug).toBe('pasado');
            expect(article!.name).toBe('Pasado');
            expect(article!.info).toBe('Historia antigua');
        });

        it('debe ser case-sensitive en la búsqueda por slug', async () => {
            // Arrange
            await prisma.article.create({
                data: {
                    name: 'Test',
                    slug: 'pasado',
                    info: null,
                    htmlRoute: '/test.html',
                    topicId: testTopicId,
                },
            });

            // Act
            const articleLower = await repository.findBySlug('pasado');
            const articleUpper = await repository.findBySlug('PASADO');

            // Assert
            expect(articleLower).not.toBeNull();
            expect(articleUpper).toBeNull(); // SQLite es case-sensitive por defecto
        });
    });

    describe('findById()', () => {
        it('debe retornar null cuando el ID no existe', async () => {
            // Act
            const article = await repository.findById('id-inexistente');

            // Assert
            expect(article).toBeNull();
        });

        it('debe retornar el artículo correcto cuando el ID existe', async () => {
            // Arrange
            const created = await prisma.article.create({
                data: {
                    name: 'Artículo de Prueba',
                    slug: 'prueba',
                    info: 'Descripción de prueba',
                    htmlRoute: '/articles/prueba.html',
                    topicId: testTopicId,
                },
            });

            // Act
            const article = await repository.findById(created.id);

            // Assert
            expect(article).not.toBeNull();
            expect(article).toBeInstanceOf(Article);
            expect(article!.id).toBe(created.id);
            expect(article!.name).toBe('Artículo de Prueba');
        });

        it('debe mapear todos los campos correctamente', async () => {
            // Arrange
            const created = await prisma.article.create({
                data: {
                    name: 'Cultura Japonesa',
                    slug: 'cultura',
                    info: 'Tradiciones y costumbres',
                    htmlRoute: '/articles/cultura.html',
                    topicId: testTopicId,
                },
            });

            // Act
            const article = await repository.findById(created.id);

            // Assert
            expect(article!.id).toBe(created.id);
            expect(article!.slug).toBe('cultura');
            expect(article!.name).toBe('Cultura Japonesa');
            expect(article!.info).toBe('Tradiciones y costumbres');
            expect(article!.htmlRoute).toBe('/articles/cultura.html');
            expect(article!.topicId).toBe(testTopicId);
            expect(article!.createdAt).toEqual(created.createdAt);
        });
    });

    describe('findByTopicId()', () => {
        it('debe retornar un array vacío cuando el topic no tiene artículos', async () => {
            // Arrange - Crear un topic sin artículos
            const emptyTopic = await prisma.articleTopic.create({
                data: { name: 'Topic Vacío' },
            });

            // Act
            const articles = await repository.findByTopicId(emptyTopic.id);

            // Assert
            expect(articles).toEqual([]);
            expect(articles).toHaveLength(0);
        });

        it('debe retornar solo los artículos del topic especificado', async () => {
            // Arrange - Crear dos topics con artículos
            const topic1 = await prisma.articleTopic.create({
                data: { name: 'Gastronomía' },
            });
            const topic2 = await prisma.articleTopic.create({
                data: { name: 'Cultura' },
            });

            await prisma.article.create({
                data: {
                    name: 'Artículo Historia 1',
                    slug: 'historia-1',
                    info: null,
                    htmlRoute: '/historia1.html',
                    topicId: topic1.id,
                },
            });

            await prisma.article.create({
                data: {
                    name: 'Artículo Historia 2',
                    slug: 'historia-2',
                    info: null,
                    htmlRoute: '/historia2.html',
                    topicId: topic1.id,
                },
            });

            await prisma.article.create({
                data: {
                    name: 'Artículo Cultura 1',
                    slug: 'cultura-1',
                    info: null,
                    htmlRoute: '/cultura1.html',
                    topicId: topic2.id,
                },
            });

            // Act
            const articlesHistoria = await repository.findByTopicId(topic1.id);
            const articlesCultura = await repository.findByTopicId(topic2.id);

            // Assert
            expect(articlesHistoria).toHaveLength(2);
            expect(articlesCultura).toHaveLength(1);

            expect(articlesHistoria[0].name).toContain('Historia');
            expect(articlesHistoria[1].name).toContain('Historia');
            expect(articlesCultura[0].name).toContain('Cultura');
        });

        it('debe retornar los artículos ordenados por fecha descendente', async () => {
            // Arrange
            await prisma.article.create({
                data: {
                    name: 'Artículo Antiguo',
                    slug: 'antiguo',
                    info: null,
                    htmlRoute: '/antiguo.html',
                    topicId: testTopicId,
                    createdAt: new Date('2024-01-01'),
                },
            });

            await prisma.article.create({
                data: {
                    name: 'Artículo Reciente',
                    slug: 'reciente',
                    info: null,
                    htmlRoute: '/reciente.html',
                    topicId: testTopicId,
                    createdAt: new Date('2024-06-01'),
                },
            });

            // Act
            const articles = await repository.findByTopicId(testTopicId);

            // Assert
            expect(articles[0].name).toBe('Artículo Reciente');
            expect(articles[1].name).toBe('Artículo Antiguo');
        });

        it('debe retornar instancias de Article correctamente mapeadas', async () => {
            // Arrange
            await prisma.article.create({
                data: {
                    name: 'Test Article',
                    slug: 'test',
                    info: 'Test info',
                    htmlRoute: '/test.html',
                    topicId: testTopicId,
                },
            });

            // Act
            const articles = await repository.findByTopicId(testTopicId);

            // Assert
            expect(articles[0]).toBeInstanceOf(Article);
            expect(articles[0].topicId).toBe(testTopicId);
        });
    });

    describe('toDomain() - Mapeo de datos', () => {
        it('debe crear entidades Article válidas que pasen las validaciones', async () => {
            // Arrange
            await prisma.article.create({
                data: {
                    name: 'Artículo Válido',
                    slug: 'valido',
                    info: 'Información válida',
                    htmlRoute: '/valido.html',
                    topicId: testTopicId,
                },
            });

            // Act
            const articles = await repository.findAll();

            // Assert - Si la entidad se crea sin errores, las validaciones pasaron
            expect(articles[0]).toBeInstanceOf(Article);
            expect(() => {
                new Article({
                    id: articles[0].id,
                    slug: articles[0].slug,
                    name: articles[0].name,
                    info: articles[0].info,
                    htmlRoute: articles[0].htmlRoute,
                    topicId: articles[0].topicId,
                    createdAt: articles[0].createdAt,
                });
            }).not.toThrow();
        });
    });

    describe('Casos Edge', () => {
        it('debe manejar correctamente múltiples llamadas concurrentes', async () => {
            // Arrange
            await prisma.article.create({
                data: {
                    name: 'Test',
                    slug: 'test',
                    info: null,
                    htmlRoute: '/test.html',
                    topicId: testTopicId,
                },
            });

            // Act - Múltiples llamadas simultáneas
            const [result1, result2, result3] = await Promise.all([
                repository.findBySlug('test'),
                repository.findAll(),
                repository.findByTopicId(testTopicId),
            ]);

            // Assert
            expect(result1).not.toBeNull();
            expect(result2).toHaveLength(1);
            expect(result3).toHaveLength(1);
        });

        it('debe manejar slugs con caracteres especiales', async () => {
            // Arrange
            await prisma.article.create({
                data: {
                    name: 'Test',
                    slug: 'test-con-guiones_y_underscores',
                    info: null,
                    htmlRoute: '/test.html',
                    topicId: testTopicId,
                },
            });

            // Act
            const article = await repository.findBySlug('test-con-guiones_y_underscores');

            // Assert
            expect(article).not.toBeNull();
            expect(article!.slug).toBe('test-con-guiones_y_underscores');
        });

        it('debe manejar correctamente artículos con fechas muy antiguas', async () => {
            // Arrange
            const oldDate = new Date('1900-01-01');
            await prisma.article.create({
                data: {
                    name: 'Artículo Antiguo',
                    slug: 'muy-antiguo',
                    info: null,
                    htmlRoute: '/antiguo.html',
                    topicId: testTopicId,
                    createdAt: oldDate,
                },
            });

            // Act
            const articles = await repository.findAll();

            // Assert
            expect(articles[0].createdAt).toEqual(oldDate);
        });
    });
});
