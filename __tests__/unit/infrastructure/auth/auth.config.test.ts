import { describe, it, expect } from 'vitest';
import { authConfig } from '@/infrastructure/auth/auth.config';

/**
 * Tests para auth.config.ts
 * 
 * Verificamos:
 * - Configuración de páginas (signIn)
 * - Callback authorized: protección de rutas
 * - Callback session: inyección de user.id desde token
 * - Callback jwt: almacenamiento de user.id en token
 */
describe('authConfig', () => {
    describe('Configuración de páginas', () => {
        it('debe configurar /login como página de sign in', () => {
            // Assert
            expect(authConfig.pages?.signIn).toBe('/login');
        });
    });

    describe('Callback authorized', () => {
        it('debe permitir acceso a rutas públicas sin autenticación', () => {
            // Arrange
            const auth = null; // Usuario no autenticado
            const nextUrl = new URL('http://localhost:3000/');

            // Act
            const result = authConfig.callbacks?.authorized?.({
                auth,
                request: { nextUrl } as any,
            });

            // Assert
            expect(result).toBe(true);
        });

        it('debe permitir acceso a rutas públicas con autenticación', () => {
            // Arrange
            const auth = { user: { id: 'user-123', email: 'test@example.com' } };
            const nextUrl = new URL('http://localhost:3000/articulos');

            // Act
            const result = authConfig.callbacks?.authorized?.({
                auth: auth as any,
                request: { nextUrl } as any,
            });

            // Assert
            expect(result).toBe(true);
        });

        it('debe bloquear acceso a /dashboard sin autenticación', () => {
            // Arrange
            const auth = null;
            const nextUrl = new URL('http://localhost:3000/dashboard');

            // Act
            const result = authConfig.callbacks?.authorized?.({
                auth,
                request: { nextUrl } as any,
            });

            // Assert
            expect(result).toBe(false);
        });

        it('debe bloquear acceso a /perfil sin autenticación', () => {
            // Arrange
            const auth = null;
            const nextUrl = new URL('http://localhost:3000/perfil');

            // Act
            const result = authConfig.callbacks?.authorized?.({
                auth,
                request: { nextUrl } as any,
            });

            // Assert
            expect(result).toBe(false);
        });

        it('debe bloquear acceso a /favoritos sin autenticación', () => {
            // Arrange
            const auth = null;
            const nextUrl = new URL('http://localhost:3000/favoritos');

            // Act
            const result = authConfig.callbacks?.authorized?.({
                auth,
                request: { nextUrl } as any,
            });

            // Assert
            expect(result).toBe(false);
        });

        it('debe permitir acceso a rutas protegidas con autenticación', () => {
            // Arrange
            const auth = { user: { id: 'user-123', email: 'test@example.com' } };
            const nextUrl = new URL('http://localhost:3000/dashboard');

            // Act
            const result = authConfig.callbacks?.authorized?.({
                auth: auth as any,
                request: { nextUrl } as any,
            });

            // Assert
            expect(result).toBe(true);
        });

        it('debe bloquear subrutas de rutas protegidas sin autenticación', () => {
            // Arrange
            const auth = null;
            const nextUrl = new URL('http://localhost:3000/dashboard/settings');

            // Act
            const result = authConfig.callbacks?.authorized?.({
                auth,
                request: { nextUrl } as any,
            });

            // Assert
            expect(result).toBe(false);
        });
    });

    describe('Callback session', () => {
        it('debe inyectar user.id desde token.sub en la sesión', async () => {
            // Arrange
            const session = {
                user: { name: 'Test User', email: 'test@example.com' },
                expires: '2024-12-31',
            };
            const token = { sub: 'user-abc-123' };

            // Act
            const result = await authConfig.callbacks?.session?.({
                session: session as any,
                token: token as any,
            });

            // Assert
            expect(result?.user?.id).toBe('user-abc-123');
            expect(result?.user?.email).toBe('test@example.com');
        });

        it('debe retornar sesión sin cambios si token.sub no existe', async () => {
            // Arrange
            const session = {
                user: { name: 'Test User', email: 'test@example.com' },
                expires: '2024-12-31',
            };
            const token = {}; // No sub

            // Act
            const result = await authConfig.callbacks?.session?.({
                session: session as any,
                token: token as any,
            });

            // Assert
            expect(result?.user?.id).toBeUndefined();
        });

        it('debe retornar sesión sin cambios si session.user no existe', async () => {
            // Arrange
            const session = {
                expires: '2024-12-31',
            };
            const token = { sub: 'user-abc-123' };

            // Act
            const result = await authConfig.callbacks?.session?.({
                session: session as any,
                token: token as any,
            });

            // Assert
            expect(result?.user).toBeUndefined();
        });
    });

    describe('Callback jwt', () => {
        it('debe almacenar user.id en token.sub cuando se proporciona user', async () => {
            // Arrange
            const token = { email: 'test@example.com' };
            const user = { id: 'user-xyz-789' };

            // Act
            const result = await authConfig.callbacks?.jwt?.({
                token: token as any,
                user: user as any,
            });

            // Assert
            expect(result?.sub).toBe('user-xyz-789');
        });

        it('debe retornar token sin cambios cuando no se proporciona user', async () => {
            // Arrange
            const token = { sub: 'existing-id', email: 'test@example.com' };

            // Act
            const result = await authConfig.callbacks?.jwt?.({
                token: token as any,
                user: undefined as any,
            });

            // Assert
            expect(result?.sub).toBe('existing-id');
        });

        it('debe preservar propiedades existentes del token', async () => {
            // Arrange
            const token = { email: 'test@example.com', name: 'Test User' };
            const user = { id: 'user-new-id' };

            // Act
            const result = await authConfig.callbacks?.jwt?.({
                token: token as any,
                user: user as any,
            });

            // Assert
            expect(result?.email).toBe('test@example.com');
            expect(result?.name).toBe('Test User');
            expect(result?.sub).toBe('user-new-id');
        });
    });
});
