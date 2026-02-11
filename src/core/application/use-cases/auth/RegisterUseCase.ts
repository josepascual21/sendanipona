import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IPasswordService } from "../../../domain/services/IPasswordService";
import { User } from "../../../domain/entities/User";
import { UserAlreadyExistsError } from "../../../domain/errors/UserAlreadyExistsError";
import { createId } from '@paralleldrive/cuid2';
import { z } from 'zod';

export const RegisterSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirmar contraseña debe tener al menos 6 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

export type RegisterDTO = z.infer<typeof RegisterSchema>;

export class RegisterUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordService: IPasswordService
    ) { }

    async execute(dto: RegisterDTO): Promise<User> {
        // 1. Validar datos
        const validatedData = RegisterSchema.parse(dto);

        // 2. Verificar si el usuario ya existe
        const existingUser = await this.userRepository.findByEmail(validatedData.email);
        if (existingUser) {
            throw new UserAlreadyExistsError(validatedData.email);
        }

        // 3. Hashear contraseña
        const hashedPassword = await this.passwordService.hash(validatedData.password);

        // 4. Crear entidad de dominio
        const newUser = new User({
            id: createId(),
            email: validatedData.email,
            username: validatedData.name,
            password: hashedPassword,
            isActive: true,
            createdAt: new Date(),
        });

        // 5. Persistir en base de datos
        await this.userRepository.save(newUser);

        return newUser;
    }
}
