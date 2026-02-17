import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { PrismaArticleRepository } from '@/infrastructure/repositories/PrismaArticleRepository';
import { Article } from '@/core/domain/entities/Article';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Tests de integración para PrismaArticleRepository
 */
describe('PrismaArticleRepository - Integration Tests', () => {
    let prisma: PrismaClient;
    let repository: PrismaArticleRepository;
    const testDbPath = path.join(__dirname, 'test-article.db');
    const testDbUrl = `file:${testDbPath}`;

    beforeAll(async () => {
        if (fs.existsSync(testDbPath)) {
            fs.unlinkSync(testDbPath);
        }

        prisma = new PrismaClient({
            datasources: {
                db: {
                    url: testDbUrl
                }
            }
        });

        await prisma.$executeRawUnsafe('PRAGMA foreign_keys = ON');

        // Crear tablas
        await prisma.$executeRawUnsafe(`
            CREATE TABLE ArticleTopic (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL
            )
        `);

        await prisma.$executeRawUnsafe(`
            CREATE TABLE Article (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                info TEXT,
                slug TEXT UNIQUE NOT NULL,
                topicId INTEGER NOT NULL,
                createdAt BIGINT NOT NULL,
                FOREIGN KEY (topicId) REFERENCES ArticleTopic(id)
            )
        `);

        repository = new PrismaArticleRepository(prisma);
    });

    beforeEach(async () => {
        await prisma.article.deleteMany();
        await prisma.articleTopic.deleteMany();
        // Crear topic para las relaciones
        await prisma.articleTopic.create({ data: { id: 1, name: 'Historia' } });
    });

    afterAll(async () => {
        await prisma.$disconnect();
        if (fs.existsSync(testDbPath)) {
            fs.unlinkSync(testDbPath);
        }
    });

    describe('findAll', () => {
        it('debe retornar todos los artículos ordenados por createdAt descendente', async () => {
            // Arrange
            await prisma.article.create({
                data: {
                    id: 'art-1',
                    slug: 'primero',
                    name: 'Primero',
                    info: 'Info 1',
                    topicId: 1,
                    createdAt: new Date('2024-01-01')
                }
            });

            await prisma.article.create({
                data: {
                    id: 'art-2',
                    slug: 'segundo',
                    name: 'Segundo',
                    info: null,
                    topicId: 1,
                    createdAt: new Date('2024-01-03')
                }
            });

            await prisma.article.create({
                data: {
                    id: 'art-3',
                    slug: 'tercero',
                    name: 'Tercero',
                    info: 'Info 3',
                    topicId: 1,
                    createdAt: new Date('2024-01-02')
                }
            });

            // Act
            const articles = await repository.findAll();

            // Assert
            expect(articles).toHaveLength(3);
            expect(articles[0]).toBeInstanceOf(Article);
            // Orden descendente: más reciente primero
            expect(articles[0].slug).toBe('segundo'); // 2024-01-03
            expect(articles[1].slug).toBe('tercero'); // 2024-01-02
            expect(articles[2].slug).toBe('primero'); // 2024-01-01
        });

        it('debe retornar array vacío cuando no hay artículos', async () => {
            // Act
            const articles = await repository.findAll();

            // Assert
            expect(articles).toEqual([]);
        });
    });

    describe('findBySlug', () => {
        it('debe retornar un artículo cuando existe el slug', async () => {
            // Arrange
            await prisma.article.create({
                data: {
                    id: 'art-slug',
                    slug: 'pasado',
                    name: 'El Pasado',
                    info: 'Información del pasado',
                    topicId: 1,
                    createdAt: new Date()
                }
            });

            // Act
            const article = await repository.findBySlug('pasado');

            // Assert
            expect(article).not.toBeNull();
            expect(article).toBeInstanceOf(Article);
            expect(article?.id).toBe('art-slug');
            expect(article?.slug).toBe('pasado');
            expect(article?.name).toBe('El Pasado');
            expect(article?.info).toBe('Información del pasado');
            expect(article?.topicId).toBe(1);
        });

        it('debe retornar null cuando el slug no existe', async () => {
            // Act
            const article = await repository.findBySlug('nonexistent');

            // Assert
            expect(article).toBeNull();
        });
    });

    describe('findById', () => {
        it('debe retornar un artículo cuando existe el ID', async () => {
            // Arrange
            await prisma.article.create({
                data: {
                    id: 'art-id-123',
                    slug: 'presente',
                    name: 'El Presente',
                    info: null,
                    topicId: 1,
                    createdAt: new Date()
                }
            });

            // Act
            const article = await repository.findById('art-id-123');

            // Assert
            expect(article).not.toBeNull();
            expect(article).toBeInstanceOf(Article);
            expect(article?.id).toBe('art-id-123');
            expect(article?.slug).toBe('presente');
            expect(article?.info).toBeNull();
        });

        it('debe retornar null cuando el ID no existe', async () => {
            // Act
            const article = await repository.findById('nonexistent-id');

            // Assert
            expect(article).toBeNull();
        });
    });

    describe('findByTopicId', () => {
        it('debe retornar artículos del topic especificado ordenados por createdAt descendente', async () => {
            // Arrange
            await prisma.articleTopic.create({ data: { id: 2, name: 'Cultura' } });

            await prisma.article.create({
                data: {
                    id: 'art-h1',
                    slug: 'historia-1',
                    name: 'Historia 1',
                    info: null,
                    topicId: 1,
                    createdAt: new Date('2024-01-01')
                }
            });

            await prisma.article.create({
                data: {
                    id: 'art-c1',
                    slug: 'cultura-1',
                    name: 'Cultura 1',
                    info: null,
                    topicId: 2,
                    createdAt: new Date('2024-01-02')
                }
            });

            await prisma.article.create({
                data: {
                    id: 'art-h2',
                    slug: 'historia-2',
                    name: 'Historia 2',
                    info: null,
                    topicId: 1,
                    createdAt: new Date('2024-01-03')
                }
            });

            // Act
            const articles = await repository.findByTopicId(1);

            // Assert
            expect(articles).toHaveLength(2);
            expect(articles[0].slug).toBe('historia-2'); // Más reciente primero
            expect(articles[1].slug).toBe('historia-1');
        });

        it('debe retornar array vacío cuando el topic no tiene artículos', async () => {
            // Arrange
            await prisma.articleTopic.create({ data: { id: 99, name: 'Vacío' } });

            // Act
            const articles = await repository.findByTopicId(99);

            // Assert
            expect(articles).toEqual([]);
        });
    });
});

