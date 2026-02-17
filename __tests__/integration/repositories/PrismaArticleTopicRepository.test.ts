import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { PrismaArticleTopicRepository } from '@/infrastructure/repositories/PrismaArticleTopicRepository';
import { ArticleTopic } from '@/core/domain/entities/ArticleTopic';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Tests de integración para PrismaArticleTopicRepository
 */
describe('PrismaArticleTopicRepository - Integration Tests', () => {
    let prisma: PrismaClient;
    let repository: PrismaArticleTopicRepository;
    const testDbPath = path.join(__dirname, 'test-topic.db');
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

        repository = new PrismaArticleTopicRepository(prisma);
    });

    beforeEach(async () => {
        await prisma.article.deleteMany();
        await prisma.articleTopic.deleteMany();
    });

    afterAll(async () => {
        await prisma.$disconnect();
        if (fs.existsSync(testDbPath)) {
            fs.unlinkSync(testDbPath);
        }
    });

    describe('findAll', () => {
        it('debe retornar todos los topics ordenados por ID ascendente', async () => {
            // Arrange
            await prisma.articleTopic.create({ data: { id: 3, name: 'Cultura' } });
            await prisma.articleTopic.create({ data: { id: 1, name: 'Historia' } });
            await prisma.articleTopic.create({ data: { id: 2, name: 'Idioma' } });

            // Act
            const topics = await repository.findAll();

            // Assert
            expect(topics).toHaveLength(3);
            expect(topics[0]).toBeInstanceOf(ArticleTopic);
            expect(topics[0].id).toBe(1);
            expect(topics[0].name).toBe('Historia');
            expect(topics[1].id).toBe(2);
            expect(topics[2].id).toBe(3);
        });

        it('debe retornar array vacío cuando no hay topics', async () => {
            // Act
            const topics = await repository.findAll();

            // Assert
            expect(topics).toEqual([]);
        });
    });

    describe('findById', () => {
        it('debe retornar un topic cuando existe el ID', async () => {
            // Arrange
            await prisma.articleTopic.create({ data: { id: 5, name: 'Gastronomía' } });

            // Act
            const topic = await repository.findById(5);

            // Assert
            expect(topic).not.toBeNull();
            expect(topic).toBeInstanceOf(ArticleTopic);
            expect(topic?.id).toBe(5);
            expect(topic?.name).toBe('Gastronomía');
        });

        it('debe retornar null cuando el ID no existe', async () => {
            // Act
            const topic = await repository.findById(999);

            // Assert
            expect(topic).toBeNull();
        });
    });

    describe('findAllWithArticles', () => {
        it('debe retornar topics con sus artículos relacionados', async () => {
            // Arrange
            await prisma.articleTopic.create({ data: { id: 1, name: 'Historia' } });
            await prisma.articleTopic.create({ data: { id: 2, name: 'Cultura' } });

            await prisma.article.create({
                data: {
                    id: 'art-1',
                    slug: 'pasado',
                    name: 'El Pasado',
                    info: 'Info pasado',
                    topicId: 1,
                    createdAt: new Date('2024-01-01')
                }
            });

            await prisma.article.create({
                data: {
                    id: 'art-2',
                    slug: 'presente',
                    name: 'El Presente',
                    info: null,
                    topicId: 1,
                    createdAt: new Date('2024-01-02')
                }
            });

            await prisma.article.create({
                data: {
                    id: 'art-3',
                    slug: 'festivales',
                    name: 'Festivales',
                    info: 'Info festivales',
                    topicId: 2,
                    createdAt: new Date('2024-01-03')
                }
            });

            // Act
            const result = await repository.findAllWithArticles();

            // Assert
            expect(result).toHaveLength(2);

            // Topic 1 — Historia con 2 artículos
            expect(result[0].topic.id).toBe(1);
            expect(result[0].topic.name).toBe('Historia');
            expect(result[0].articles).toHaveLength(2);
            expect(result[0].articles[0].slug).toBe('pasado');
            expect(result[0].articles[1].slug).toBe('presente');

            // Topic 2 — Cultura con 1 artículo
            expect(result[1].topic.id).toBe(2);
            expect(result[1].topic.name).toBe('Cultura');
            expect(result[1].articles).toHaveLength(1);
            expect(result[1].articles[0].slug).toBe('festivales');
        });

        it('debe retornar topics sin artículos cuando no tienen ninguno', async () => {
            // Arrange
            await prisma.articleTopic.create({ data: { id: 1, name: 'Vacío' } });

            // Act
            const result = await repository.findAllWithArticles();

            // Assert
            expect(result).toHaveLength(1);
            expect(result[0].topic.name).toBe('Vacío');
            expect(result[0].articles).toEqual([]);
        });
    });
});

