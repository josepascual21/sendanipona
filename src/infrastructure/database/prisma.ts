import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
};

const prismaClientSingleton = () => {
    const tursoUrl = process.env.TURSO_DATABASE_URL;
    const tursoToken = process.env.TURSO_AUTH_TOKEN;

    // Si existen variables → usar Turso
    if (tursoUrl && tursoToken) {
        const adapter = new PrismaLibSql({
            url: tursoUrl,
            authToken: tursoToken,
        });

        return new PrismaClient({
            adapter,
            log:
                process.env.NODE_ENV === 'development'
                    ? ['query', 'error', 'warn']
                    : ['error'],
        });
    }

    // Si no → usar SQLite local (dev.db)
    return new PrismaClient({
        log:
            process.env.NODE_ENV === 'development'
                ? ['query', 'error', 'warn']
                : ['error'],
    });
};

export const prisma =
    globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
