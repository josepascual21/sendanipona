import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

/**
 * Singleton de PrismaClient para Next.js con soporte híbrido:
 * - Desarrollo: SQLite local (dev.db)
 * - Producción: Turso (LibSQL)
 */

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const prismaClientSingleton = () => {
    // Si estamos en Vercel y tenemos las credenciales, usamos Turso
    // Esto asegura que el build local (npm run build) use SQLite aunque NODE_ENV sea production
    if (process.env.NODE_ENV === 'production' && process.env.VERCEL && process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
        const url = process.env.TURSO_DATABASE_URL;
        const authToken = process.env.TURSO_AUTH_TOKEN;

        const libsql = createClient({
            url,
            authToken,
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const adapter = new PrismaLibSql(libsql as unknown as any);

        return new PrismaClient({
            adapter,
            log: ['error'],
        });
    }

    // En desarrollo, usamos SQLite local estándar
    return new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
