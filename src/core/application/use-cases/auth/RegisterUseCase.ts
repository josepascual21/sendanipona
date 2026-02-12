import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IPasswordService } from "../../../domain/services/IPasswordService";
import { User } from "../../../domain/entities/User";
import { UserAlreadyExistsError } from "../../../domain/errors/UserAlreadyExistsError";
import { createId } from '@paralleldrive/cuid2';

/**
 * DTO de entrada para el registro.
 * Los datos llegan ya validados por el schema Zod en la capa de presentación.
 */
export interface RegisterDTO {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export class RegisterUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordService: IPasswordService
    ) { }

    async execute(dto: RegisterDTO): Promise<User> {
        // 1. Verificar si el usuario ya existe (regla de negocio)
        const existingUser = await this.userRepository.findByEmail(dto.email);
        if (existingUser) {
            throw new UserAlreadyExistsError(dto.email);
        }

        // 2. Hashear contraseña
        const hashedPassword = await this.passwordService.hash(dto.password);

        // 3. Crear entidad de dominio
        const newUser = new User({
            id: createId(),
            email: dto.email,
            username: dto.name,
            password: hashedPassword,
            isActive: true,
            createdAt: new Date(),
        });

        // 4. Persistir en base de datos
        await this.userRepository.save(newUser);

        return newUser;
    }
}

