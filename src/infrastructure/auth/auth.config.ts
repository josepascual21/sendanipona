import type { NextAuthConfig } from 'next-auth';

/**
 * Rutas que requieren autenticación.
 * Añadir aquí nuevas rutas protegidas conforme se creen.
 */
const PROTECTED_ROUTES = ['/dashboard', '/perfil', '/favoritos'];

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        /**
         * Callback de autorización del middleware.
         * Redirige a /login si un usuario no autenticado intenta acceder a una ruta protegida.
         */
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isProtectedRoute = PROTECTED_ROUTES.some(route =>
                nextUrl.pathname.startsWith(route)
            );

            // Solo bloquear rutas protegidas a usuarios no autenticados
            if (isProtectedRoute && !isLoggedIn) {
                return false;
            }

            return true;
        },
    },
    providers: [], // Los providers se configuran en auth.ts
} satisfies NextAuthConfig;

