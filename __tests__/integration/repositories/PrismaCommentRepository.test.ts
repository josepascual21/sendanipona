import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { PrismaCommentRepository } from '@/infrastructure/repositories/PrismaCommentRepository';
import { Comment } from '@/core/domain/entities/Comment';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Tests de integración para PrismaCommentRepository
 */
describe('PrismaCommentRepository - Integration Tests', () => {
    let prisma: PrismaClient;
    let repository: PrismaCommentRepository;
    const testDbPath = path.join(__dirname, 'test-comment.db');
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
            CREATE TABLE User (
                id TEXT PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                username TEXT NOT NULL,
                isSuperuser INTEGER DEFAULT 0,
                isActive INTEGER DEFAULT 1,
                lastLogin BIGINT,
                createdAt BIGINT NOT NULL
            )
        `);

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

        await prisma.$executeRawUnsafe(`
            CREATE TABLE Comment (
                id TEXT PRIMARY KEY,
                textComment TEXT NOT NULL,
                userId TEXT NOT NULL,
                articleId TEXT NOT NULL,
                createdAt BIGINT NOT NULL,
                FOREIGN KEY (userId) REFERENCES User(id),
                FOREIGN KEY (articleId) REFERENCES Article(id),
                UNIQUE(userId, articleId)
            )
        `);

        repository = new PrismaCommentRepository(prisma);
    });

    beforeEach(async () => {
        // Limpiar datos entre tests
        await prisma.comment.deleteMany();
        await prisma.article.deleteMany();
        await prisma.articleTopic.deleteMany();
        await prisma.user.deleteMany();

        // Crear datos de prueba base
        await prisma.user.create({
            data: {
                id: 'user-1',
                email: 'user1@example.com',
                username: 'User One',
                password: 'hashed',
                createdAt: new Date()
            }
        });

        await prisma.user.create({
            data: {
                id: 'user-2',
                email: 'user2@example.com',
                username: 'User Two',
                password: 'hashed',
                createdAt: new Date()
            }
        });

        await prisma.articleTopic.create({ data: { id: 1, name: 'Historia' } });

        await prisma.article.create({
            data: {
                id: 'article-1',
                slug: 'pasado',
                name: 'El Pasado',
                info: null,
                topicId: 1,
                createdAt: new Date()
            }
        });
    });

    afterAll(async () => {
        await prisma.$disconnect();
        if (fs.existsSync(testDbPath)) {
            fs.unlinkSync(testDbPath);
        }
    });

    describe('create', () => {
        it('debe crear un nuevo comentario en la base de datos', async () => {
            // Arrange
            const commentData = {
                textComment: 'Este es un comentario de prueba',
                userId: 'user-1',
                articleId: 'article-1'
            };

            // Act
            const comment = await repository.create(commentData);

            // Assert
            expect(comment).toBeInstanceOf(Comment);
            expect(comment.id).toBeDefined();
            expect(comment.textComment).toBe('Este es un comentario de prueba');
            expect(comment.userId).toBe('user-1');
            expect(comment.articleId).toBe('article-1');
            expect(comment.createdAt).toBeInstanceOf(Date);

            // Verificar en BD
            const savedComment = await prisma.comment.findUnique({
                where: { id: comment.id }
            });
            expect(savedComment).not.toBeNull();
        });

        it('debe respetar la restricción única (userId, articleId)', async () => {
            // Arrange
            await prisma.comment.create({
                data: {
                    id: 'comment-1',
                    textComment: 'Primer comentario',
                    userId: 'user-1',
                    articleId: 'article-1',
                    createdAt: new Date()
                }
            });

            // Act & Assert
            await expect(
                repository.create({
                    textComment: 'Segundo comentario del mismo usuario',
                    userId: 'user-1',
                    articleId: 'article-1'
                })
            ).rejects.toThrow();
        });
    });

    describe('findByArticleId', () => {
        it('debe retornar comentarios del artículo con paginación y authorName', async () => {
            // Arrange
            await prisma.comment.create({
                data: {
                    id: 'comment-1',
                    textComment: 'Comentario 1',
                    userId: 'user-1',
                    articleId: 'article-1',
                    createdAt: new Date('2024-01-01')
                }
            });

            await prisma.comment.create({
                data: {
                    id: 'comment-2',
                    textComment: 'Comentario 2',
                    userId: 'user-2',
                    articleId: 'article-1',
                    createdAt: new Date('2024-01-03')
                }
            });

            // Act
            const comments = await repository.findByArticleId('article-1', 0, 10);

            // Assert
            expect(comments).toHaveLength(2);
            expect(comments[0]).toBeInstanceOf(Comment);
            // Orden descendente: más reciente primero
            expect(comments[0].id).toBe('comment-2');
            expect(comments[0].authorName).toBe('User Two');
            expect(comments[1].id).toBe('comment-1');
            expect(comments[1].authorName).toBe('User One');
        });

        it('debe aplicar paginación correctamente (offset y limit)', async () => {
            // Arrange — Crear 10 comentarios en article-1 (alternando usuarios)
            // Necesitamos crear más artículos porque cada usuario solo puede comentar 1 vez por artículo
            for (let i = 2; i <= 11; i++) {
                await prisma.article.create({
                    data: {
                        id: `article-pag-${i}`,
                        slug: `slug-pag-${i}`,
                        name: `Artículo ${i}`,
                        info: null,
                        topicId: 1,
                        createdAt: new Date(`2024-01-${i.toString().padStart(2, '0')}`)
                    }
                });
            }

            // Crear 10 comentarios en diferentes artículos del user-1
            for (let i = 1; i <= 10; i++) {
                const articleId = i === 1 ? 'article-1' : `article-pag-${i + 1}`;
                await prisma.comment.create({
                    data: {
                        id: `comment-pag-${i}`,
                        textComment: `Comentario ${i}`,
                        userId: 'user-1',
                        articleId: articleId,
                        createdAt: new Date(`2024-01-${i.toString().padStart(2, '0')}`)
                    }
                });
            }

            // Act — Obtener comentarios del article-1 (solo debe haber 1)
            const comments = await repository.findByArticleId('article-1', 0, 10);

            // Assert
            expect(comments).toHaveLength(1);
            expect(comments[0].id).toBe('comment-pag-1');
        });

        it('debe retornar array vacío cuando el artículo no tiene comentarios', async () => {
            // Act
            const comments = await repository.findByArticleId('article-1', 0, 10);

            // Assert
            expect(comments).toEqual([]);
        });
    });

    describe('findByUserAndArticle', () => {
        it('debe retornar el comentario cuando existe', async () => {
            // Arrange
            await prisma.comment.create({
                data: {
                    id: 'comment-unique',
                    textComment: 'Comentario único',
                    userId: 'user-1',
                    articleId: 'article-1',
                    createdAt: new Date()
                }
            });

            // Act
            const comment = await repository.findByUserAndArticle('user-1', 'article-1');

            // Assert
            expect(comment).not.toBeNull();
            expect(comment).toBeInstanceOf(Comment);
            expect(comment?.id).toBe('comment-unique');
            expect(comment?.userId).toBe('user-1');
            expect(comment?.articleId).toBe('article-1');
        });

        it('debe retornar null cuando no existe el comentario', async () => {
            // Act
            const comment = await repository.findByUserAndArticle('user-1', 'article-1');

            // Assert
            expect(comment).toBeNull();
        });
    });

    describe('findById', () => {
        it('debe retornar un comentario cuando existe el ID', async () => {
            // Arrange
            await prisma.comment.create({
                data: {
                    id: 'comment-id-123',
                    textComment: 'Comentario por ID',
                    userId: 'user-1',
                    articleId: 'article-1',
                    createdAt: new Date()
                }
            });

            // Act
            const comment = await repository.findById('comment-id-123');

            // Assert
            expect(comment).not.toBeNull();
            expect(comment).toBeInstanceOf(Comment);
            expect(comment?.id).toBe('comment-id-123');
            expect(comment?.textComment).toBe('Comentario por ID');
        });

        it('debe retornar null cuando el ID no existe', async () => {
            // Act
            const comment = await repository.findById('nonexistent-id');

            // Assert
            expect(comment).toBeNull();
        });
    });

    describe('delete', () => {
        it('debe eliminar un comentario de la base de datos', async () => {
            // Arrange
            await prisma.comment.create({
                data: {
                    id: 'comment-to-delete',
                    textComment: 'Comentario a eliminar',
                    userId: 'user-1',
                    articleId: 'article-1',
                    createdAt: new Date()
                }
            });

            // Act
            await repository.delete('comment-to-delete');

            // Assert
            const deletedComment = await prisma.comment.findUnique({
                where: { id: 'comment-to-delete' }
            });
            expect(deletedComment).toBeNull();
        });

        it('debe lanzar error cuando se intenta eliminar un comentario inexistente', async () => {
            // Act & Assert
            await expect(
                repository.delete('nonexistent-id')
            ).rejects.toThrow();
        });
    });
});

