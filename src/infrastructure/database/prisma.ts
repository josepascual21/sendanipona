import { PrismaClient } from '@prisma/client';

/**
 * Singleton de PrismaClient para Next.js
 * 
 * En desarrollo, Next.js hace hot-reload y puede crear múltiples instancias
 * de PrismaClient. Este patrón singleton previene ese problema.
 * 
 * @see https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
 */

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

