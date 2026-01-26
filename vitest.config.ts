import { defineConfig } from 'vitest/config';
import path from 'path';

/**
 * Configuración de Vitest para el proyecto Senda Nipona
 * 
 * Incluye:
 * - Soporte para alias de rutas (@/)
 * - Configuración de cobertura de tests
 * - Environment Node para tests de backend
 */
export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                '__tests__/',
                '*.config.*',
                '.next/',
                'prisma/',
            ],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@core': path.resolve(__dirname, './src/core'),
            '@infra': path.resolve(__dirname, './src/infrastructure'),
        },
    },
});
