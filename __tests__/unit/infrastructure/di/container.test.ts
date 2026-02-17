import { describe, it, expect } from 'vitest';
import { container } from '@/infrastructure/di/container';
import { PrismaUserRepository } from '@/infrastructure/repositories/PrismaUserRepository';
import { PrismaCommentRepository } from '@/infrastructure/repositories/PrismaCommentRepository';
import { PrismaArticleRepository } from '@/infrastructure/repositories/PrismaArticleRepository';
import { PrismaArticleTopicRepository } from '@/infrastructure/repositories/PrismaArticleTopicRepository';
import { BcryptPasswordService } from '@/infrastructure/services/BcryptPasswordService';
import { LoginUseCase } from '@/core/application/use-cases/auth/LoginUseCase';
import { RegisterUseCase } from '@/core/application/use-cases/auth/RegisterUseCase';
import { CreateCommentUseCase } from '@/core/application/use-cases/comments/CreateCommentUseCase';
import { GetArticleCommentsUseCase } from '@/core/application/use-cases/comments/GetArticleCommentsUseCase';
import { DeleteCommentUseCase } from '@/core/application/use-cases/comments/DeleteCommentUseCase';
import { CheckUserCommentUseCase } from '@/core/application/use-cases/comments/CheckUserCommentUseCase';
import { GetArticleBySlug } from '@/core/application/use-cases/articles/GetArticleBySlug';
import { GetNavigationData } from '@/core/application/use-cases/articles/GetNavigationData';

/**
 * Tests para DIContainer
 * 
 * Verificamos:
 * - Resolución correcta de repositorios
 * - Resolución correcta de servicios
 * - Resolución correcta de use cases con sus dependencias
 * - Singleton de repositorios y servicios (misma instancia)
 * - Nuevas instancias de use cases en cada llamada
 */
describe('DIContainer', () => {
    describe('Resolución de Repositorios', () => {
        it('debe retornar instancia de PrismaUserRepository', () => {
            // Act
            const repository = container.getUserRepository();

            // Assert
            expect(repository).toBeInstanceOf(PrismaUserRepository);
        });

        it('debe retornar instancia de PrismaCommentRepository', () => {
            // Act
            const repository = container.getCommentRepository();

            // Assert
            expect(repository).toBeInstanceOf(PrismaCommentRepository);
        });

        it('debe retornar instancia de PrismaArticleRepository', () => {
            // Act
            const repository = container.getArticleRepository();

            // Assert
            expect(repository).toBeInstanceOf(PrismaArticleRepository);
        });

        it('debe retornar instancia de PrismaArticleTopicRepository', () => {
            // Act
            const repository = container.getArticleTopicRepository();

            // Assert
            expect(repository).toBeInstanceOf(PrismaArticleTopicRepository);
        });

        it('debe retornar la misma instancia de UserRepository (singleton)', () => {
            // Act
            const repo1 = container.getUserRepository();
            const repo2 = container.getUserRepository();

            // Assert
            expect(repo1).toBe(repo2);
        });

        it('debe retornar la misma instancia de CommentRepository (singleton)', () => {
            // Act
            const repo1 = container.getCommentRepository();
            const repo2 = container.getCommentRepository();

            // Assert
            expect(repo1).toBe(repo2);
        });
    });

    describe('Resolución de Servicios', () => {
        it('debe retornar instancia de BcryptPasswordService', () => {
            // Act
            const service = container.getPasswordService();

            // Assert
            expect(service).toBeInstanceOf(BcryptPasswordService);
        });

        it('debe retornar la misma instancia de PasswordService (singleton)', () => {
            // Act
            const service1 = container.getPasswordService();
            const service2 = container.getPasswordService();

            // Assert
            expect(service1).toBe(service2);
        });
    });

    describe('Resolución de Use Cases de Autenticación', () => {
        it('debe retornar instancia de LoginUseCase', () => {
            // Act
            const useCase = container.getLoginUseCase();

            // Assert
            expect(useCase).toBeInstanceOf(LoginUseCase);
        });

        it('debe retornar instancia de RegisterUseCase', () => {
            // Act
            const useCase = container.getRegisterUseCase();

            // Assert
            expect(useCase).toBeInstanceOf(RegisterUseCase);
        });

        it('debe crear nueva instancia de LoginUseCase en cada llamada', () => {
            // Act
            const useCase1 = container.getLoginUseCase();
            const useCase2 = container.getLoginUseCase();

            // Assert
            expect(useCase1).not.toBe(useCase2);
        });

        it('debe crear nueva instancia de RegisterUseCase en cada llamada', () => {
            // Act
            const useCase1 = container.getRegisterUseCase();
            const useCase2 = container.getRegisterUseCase();

            // Assert
            expect(useCase1).not.toBe(useCase2);
        });
    });

    describe('Resolución de Use Cases de Comentarios', () => {
        it('debe retornar instancia de CreateCommentUseCase', () => {
            // Act
            const useCase = container.getCreateCommentUseCase();

            // Assert
            expect(useCase).toBeInstanceOf(CreateCommentUseCase);
        });

        it('debe retornar instancia de GetArticleCommentsUseCase', () => {
            // Act
            const useCase = container.getArticleCommentsUseCase();

            // Assert
            expect(useCase).toBeInstanceOf(GetArticleCommentsUseCase);
        });

        it('debe retornar instancia de DeleteCommentUseCase', () => {
            // Act
            const useCase = container.getDeleteCommentUseCase();

            // Assert
            expect(useCase).toBeInstanceOf(DeleteCommentUseCase);
        });

        it('debe retornar instancia de CheckUserCommentUseCase', () => {
            // Act
            const useCase = container.getCheckUserCommentUseCase();

            // Assert
            expect(useCase).toBeInstanceOf(CheckUserCommentUseCase);
        });

        it('debe crear nueva instancia de CreateCommentUseCase en cada llamada', () => {
            // Act
            const useCase1 = container.getCreateCommentUseCase();
            const useCase2 = container.getCreateCommentUseCase();

            // Assert
            expect(useCase1).not.toBe(useCase2);
        });
    });

    describe('Resolución de Use Cases de Artículos', () => {
        it('debe retornar instancia de GetArticleBySlug', () => {
            // Act
            const useCase = container.getArticleBySlugUseCase();

            // Assert
            expect(useCase).toBeInstanceOf(GetArticleBySlug);
        });

        it('debe retornar instancia de GetNavigationData', () => {
            // Act
            const useCase = container.getNavigationDataUseCase();

            // Assert
            expect(useCase).toBeInstanceOf(GetNavigationData);
        });

        it('debe crear nueva instancia de GetArticleBySlug en cada llamada', () => {
            // Act
            const useCase1 = container.getArticleBySlugUseCase();
            const useCase2 = container.getArticleBySlugUseCase();

            // Assert
            expect(useCase1).not.toBe(useCase2);
        });

        it('debe crear nueva instancia de GetNavigationData en cada llamada', () => {
            // Act
            const useCase1 = container.getNavigationDataUseCase();
            const useCase2 = container.getNavigationDataUseCase();

            // Assert
            expect(useCase1).not.toBe(useCase2);
        });
    });

    describe('Inyección de Dependencias en Use Cases', () => {
        it('LoginUseCase debe recibir UserRepository y PasswordService', () => {
            // Act
            const useCase = container.getLoginUseCase();
            const userRepo = container.getUserRepository();
            const passwordService = container.getPasswordService();

            // Assert - Verificar que el use case tiene las dependencias correctas
            // Accedemos a las propiedades privadas mediante reflexión para verificar
            expect(useCase).toHaveProperty('userRepository');
            expect(useCase).toHaveProperty('passwordService');
        });

        it('RegisterUseCase debe recibir UserRepository y PasswordService', () => {
            // Act
            const useCase = container.getRegisterUseCase();

            // Assert
            expect(useCase).toHaveProperty('userRepository');
            expect(useCase).toHaveProperty('passwordService');
        });

        it('CreateCommentUseCase debe recibir CommentRepository', () => {
            // Act
            const useCase = container.getCreateCommentUseCase();

            // Assert
            expect(useCase).toHaveProperty('commentRepository');
        });

        it('GetArticleBySlug debe recibir ArticleRepository', () => {
            // Act
            const useCase = container.getArticleBySlugUseCase();

            // Assert
            expect(useCase).toHaveProperty('articleRepository');
        });

        it('GetNavigationData debe recibir ArticleTopicRepository', () => {
            // Act
            const useCase = container.getNavigationDataUseCase();

            // Assert
            expect(useCase).toHaveProperty('articleTopicRepository');
        });
    });
});

