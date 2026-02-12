import { IPasswordService } from "../../../domain/services/IPasswordService";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";

/**
 * DTO de entrada para el login.
 * Los datos llegan ya validados por el schema Zod en la capa de presentación.
 */
export interface LoginDTO {
    email: string;
    password: string;
}

export class LoginUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordService: IPasswordService
    ) { }

    async execute(dto: LoginDTO): Promise<User | null> {
        const { email, password } = dto;

        const user = await this.userRepository.findByEmail(email);
        if (!user || !user.password) {
            return null;
        }

        // Verificar que la cuenta del usuario esté activa
        if (!user.isActive) {
            return null;
        }

        const isValidPassword = await this.passwordService.compare(password, user.password);
        if (!isValidPassword) {
            return null;
        }

        return user;
    }
}

