import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { BcryptPasswordService } from "../services/BcryptPasswordService";
import { PrismaCommentRepository } from "../repositories/PrismaCommentRepository";
import { prisma } from "../database/prisma"; // Asegurar que importamos la instancia de prisma
import { LoginUseCase } from "../../core/application/use-cases/auth/LoginUseCase";
import { RegisterUseCase } from "../../core/application/use-cases/auth/RegisterUseCase";
import { CreateCommentUseCase } from "../../core/application/use-cases/comments/CreateCommentUseCase";
import { GetArticleCommentsUseCase } from "../../core/application/use-cases/comments/GetArticleCommentsUseCase";
import { DeleteCommentUseCase } from "../../core/application/use-cases/comments/DeleteCommentUseCase";

/**
 * Contenedor de Inyección de Dependencias
 * 
 * Centraliza la creación de instancias para evitar acoplamiento en los controladores/actions.
 * Si en el futuro cambiamos Prisma por TypeORM o Bcrypt por Argon2, solo tocamos aquí.
 */
class DIContainer {
    private static _userRepository = new PrismaUserRepository();
    private static _commentRepository = new PrismaCommentRepository(prisma);
    private static _passwordService = new BcryptPasswordService();

    static getUserRepository() {
        return this._userRepository;
    }

    static getCommentRepository() {
        return this._commentRepository;
    }

    static getPasswordService() {
        return this._passwordService;
    }

    static getLoginUseCase() {
        return new LoginUseCase(this._userRepository, this._passwordService);
    }

    static getRegisterUseCase() {
        return new RegisterUseCase(this._userRepository, this._passwordService);
    }

    static getCreateCommentUseCase() {
        return new CreateCommentUseCase(this._commentRepository);
    }

    static getArticleCommentsUseCase() {
        return new GetArticleCommentsUseCase(this._commentRepository);
    }

    static getDeleteCommentUseCase() {
        return new DeleteCommentUseCase(this._commentRepository);
    }
}

export const container = DIContainer;
