import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '@/infrastructure/repositories/PrismaUserRepository';
import { User } from '@/core/domain/entities/User';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Tests de integración para PrismaUserRepository
 *
 * Usa una base de datos SQLite temporal para tests aislados
 * Se crea antes de todos los tests y se limpia entre cada test
 */
describe('PrismaUserRepository - Integration Tests', () => {
    let prisma: PrismaClient;
    let repository: PrismaUserRepository;
    const testDbPath = path.join(__dirname, 'test-user.db');
    const testDbUrl = `file:${testDbPath}`;

    // Setup — Crear BD y ejecutar migraciones una sola vez
    beforeAll(async () => {
        // Eliminar BD de test si existe
        if (fs.existsSync(testDbPath)) {
            fs.unlinkSync(testDbPath);
        }

        // Crear cliente Prisma con BD de test
        prisma = new PrismaClient({
            datasources: {
                db: {
                    url: testDbUrl
                }
            }
        });

        // Crear tablas manualmente
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

        repository = new PrismaUserRepository(prisma);
    });

    // Limpiar datos entre tests
    beforeEach(async () => {
        await prisma.user.deleteMany();
    });

    // Cleanup después de todos los tests
    afterAll(async () => {
        await prisma.$disconnect();
        if (fs.existsSync(testDbPath)) {
            fs.unlinkSync(testDbPath);
        }
    });

    describe('save', () => {
        it('debe crear un nuevo usuario en la base de datos', async () => {
            // Arrange
            const user = new User({
                id: 'user-123',
                email: 'test@example.com',
                username: 'Test User',
                password: 'hashed_password',
                isActive: true,
                createdAt: new Date()
            });

            // Act
            await repository.save(user);

            // Assert — Verificar que se guardó en BD
            const savedUser = await prisma.user.findUnique({
                where: { id: 'user-123' }
            });

            expect(savedUser).not.toBeNull();
            expect(savedUser?.email).toBe('test@example.com');
            expect(savedUser?.username).toBe('Test User');
            expect(savedUser?.password).toBe('hashed_password');
            expect(savedUser?.isActive).toBe(true);
        });

        it('debe actualizar un usuario existente (upsert)', async () => {
            // Arrange — Crear usuario inicial
            const user = new User({
                id: 'user-456',
                email: 'original@example.com',
                username: 'Original Name',
                password: 'original_password',
                isActive: true,
                createdAt: new Date()
            });

            await repository.save(user);

            // Act — Actualizar el mismo usuario
            const updatedUser = new User({
                id: 'user-456',
                email: 'updated@example.com',
                username: 'Updated Name',
                password: 'new_password',
                isActive: false,
                createdAt: user.createdAt
            });

            await repository.save(updatedUser);

            // Assert — Verificar que se actualizó
            const savedUser = await prisma.user.findUnique({
                where: { id: 'user-456' }
            });

            expect(savedUser?.email).toBe('updated@example.com');
            expect(savedUser?.username).toBe('Updated Name');
            expect(savedUser?.password).toBe('new_password');
            expect(savedUser?.isActive).toBe(false);
        });

        it('debe manejar password opcional (vacío) al crear usuario', async () => {
            // Arrange — Usuario sin password (OAuth por ejemplo)
            const user = new User({
                id: 'user-789',
                email: 'oauth@example.com',
                username: 'OAuth User',
                isActive: true,
                createdAt: new Date()
            });

            // Act
            await repository.save(user);

            // Assert — Password debe ser string vacío en BD
            const savedUser = await prisma.user.findUnique({
                where: { id: 'user-789' }
            });

            expect(savedUser?.password).toBe('');
        });
    });

    describe('findByEmail', () => {
        it('debe retornar un usuario cuando existe el email', async () => {
            // Arrange — Crear usuario en BD
            await prisma.user.create({
                data: {
                    id: 'user-abc',
                    email: 'find@example.com',
                    username: 'Find User',
                    password: 'hashed',
                    isActive: true,
                    createdAt: new Date()
                }
            });

            // Act
            const user = await repository.findByEmail('find@example.com');

            // Assert
            expect(user).not.toBeNull();
            expect(user).toBeInstanceOf(User);
            expect(user?.id).toBe('user-abc');
            expect(user?.email).toBe('find@example.com');
            expect(user?.username).toBe('Find User');
            expect(user?.isActive).toBe(true);
        });

        it('debe retornar null cuando el email no existe', async () => {
            // Act
            const user = await repository.findByEmail('nonexistent@example.com');

            // Assert
            expect(user).toBeNull();
        });
    });

    describe('findById', () => {
        it('debe retornar un usuario cuando existe el ID', async () => {
            // Arrange
            await prisma.user.create({
                data: {
                    id: 'user-xyz',
                    email: 'findbyid@example.com',
                    username: 'FindById User',
                    password: 'hashed',
                    isActive: true,
                    createdAt: new Date()
                }
            });

            // Act
            const user = await repository.findById('user-xyz');

            // Assert
            expect(user).not.toBeNull();
            expect(user).toBeInstanceOf(User);
            expect(user?.id).toBe('user-xyz');
            expect(user?.email).toBe('findbyid@example.com');
        });

        it('debe retornar null cuando el ID no existe', async () => {
            // Act
            const user = await repository.findById('nonexistent-id');

            // Assert
            expect(user).toBeNull();
        });
    });
});

