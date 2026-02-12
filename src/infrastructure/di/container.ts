import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { BcryptPasswordService } from "../services/BcryptPasswordService";
import { PrismaCommentRepository } from "../repositories/PrismaCommentRepository";
import { PrismaArticleRepository } from "../repositories/PrismaArticleRepository";
import { PrismaArticleTopicRepository } from "../repositories/PrismaArticleTopicRepository";
import { prisma } from "../database/prisma";

// Use cases de autenticación
import { LoginUseCase } from "../../core/application/use-cases/auth/LoginUseCase";
import { RegisterUseCase } from "../../core/application/use-cases/auth/RegisterUseCase";

// Use cases de comentarios
import { CreateCommentUseCase } from "../../core/application/use-cases/comments/CreateCommentUseCase";
import { GetArticleCommentsUseCase } from "../../core/application/use-cases/comments/GetArticleCommentsUseCase";
import { DeleteCommentUseCase } from "../../core/application/use-cases/comments/DeleteCommentUseCase";
import { CheckUserCommentUseCase } from "../../core/application/use-cases/comments/CheckUserCommentUseCase";

// Use cases de artículos
import { GetArticleBySlug } from "../../core/application/use-cases/articles/GetArticleBySlug";
import { GetNavigationData } from "../../core/application/use-cases/articles/GetNavigationData";

/**
 * Contenedor de Inyección de Dependencias
 * 
 * Centraliza la creación de instancias para evitar acoplamiento en los controladores/actions.
 * Si en el futuro cambiamos Prisma por TypeORM o Bcrypt por Argon2, solo tocamos aquí.
 */
class DIContainer {
    // --- Repositorios ---
    private static _userRepository = new PrismaUserRepository();
    private static _commentRepository = new PrismaCommentRepository(prisma);
    private static _articleRepository = new PrismaArticleRepository();
    private static _articleTopicRepository = new PrismaArticleTopicRepository();

    // --- Servicios ---
    private static _passwordService = new BcryptPasswordService();

    // --- Getters de Repositorios ---

    static getUserRepository() {
        return this._userRepository;
    }

    static getCommentRepository() {
        return this._commentRepository;
    }

    static getArticleRepository() {
        return this._articleRepository;
    }

    static getArticleTopicRepository() {
        return this._articleTopicRepository;
    }

    // --- Getters de Servicios ---

    static getPasswordService() {
        return this._passwordService;
    }

    // --- Use Cases de Autenticación ---

    static getLoginUseCase() {
        return new LoginUseCase(this._userRepository, this._passwordService);
    }

    static getRegisterUseCase() {
        return new RegisterUseCase(this._userRepository, this._passwordService);
    }

    // --- Use Cases de Comentarios ---

    static getCreateCommentUseCase() {
        return new CreateCommentUseCase(this._commentRepository);
    }

    static getArticleCommentsUseCase() {
        return new GetArticleCommentsUseCase(this._commentRepository);
    }

    static getDeleteCommentUseCase() {
        return new DeleteCommentUseCase(this._commentRepository);
    }

    static getCheckUserCommentUseCase() {
        return new CheckUserCommentUseCase(this._commentRepository);
    }

    // --- Use Cases de Artículos ---

    static getArticleBySlugUseCase() {
        return new GetArticleBySlug(this._articleRepository);
    }

    static getNavigationDataUseCase() {
        return new GetNavigationData(this._articleTopicRepository);
    }
}

export const container = DIContainer;
