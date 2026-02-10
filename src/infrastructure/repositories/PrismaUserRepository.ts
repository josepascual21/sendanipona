import { prisma } from "../database/prisma";
import { IUserRepository } from "../../core/domain/repositories/IUserRepository";
import { User } from "../../core/domain/entities/User";

export class PrismaUserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) return null;

        return new User({
            id: user.id,
            email: user.email,
            username: user.username,
            isActive: user.isActive,
            password: user.password,
            createdAt: user.createdAt,
        });
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) return null;

        return new User({
            id: user.id,
            email: user.email,
            username: user.username,
            isActive: user.isActive,
            password: user.password,
            createdAt: user.createdAt,
        });
    }
}
