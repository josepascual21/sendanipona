import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../../core/domain/repositories/IUserRepository";
import { User } from "../../core/domain/entities/User";

export class PrismaUserRepository implements IUserRepository {
    constructor(private prisma: PrismaClient) { }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
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
        const user = await this.prisma.user.findUnique({
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

    async save(user: User): Promise<void> {
        await this.prisma.user.upsert({
            where: { id: user.id },
            update: {
                email: user.email,
                username: user.username,
                password: user.password,
                isActive: user.isActive,
            },
            create: {
                id: user.id,
                email: user.email,
                username: user.username,
                password: user.password || '', // Password es opcional en entidad pero requerido en BD para auth
                isActive: user.isActive,
                createdAt: user.createdAt,
            },
        });
    }
}

