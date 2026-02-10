import { IPasswordService } from "../../../domain/services/IPasswordService";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../../../domain/entities/User";
import { z } from "zod";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

type LoginDTO = z.infer<typeof LoginSchema>;

export class LoginUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordService: IPasswordService
    ) { }

    async execute(dto: LoginDTO): Promise<User | null> {
        const { email, password } = LoginSchema.parse(dto);

        const user = await this.userRepository.findByEmail(email);
        if (!user || !user.password) {
            return null;
        }

        const isValidPassword = await this.passwordService.compare(password, user.password);
        if (!isValidPassword) {
            return null;
        }

        return user;
    }
}
