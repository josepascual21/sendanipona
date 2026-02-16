import { describe, it, expect } from 'vitest';
import { BcryptPasswordService } from '@/infrastructure/services/BcryptPasswordService';

/**
 * Tests de integración para BcryptPasswordService
 *
 * Estos son tests de integración porque usan la librería bcryptjs real,
 * no un mock. Verificamos:
 * - Hash genera un string diferente al password original
 * - Compare retorna true para password + hash correcto (round-trip)
 * - Compare retorna false para password incorrecto
 * - Dos hashes del mismo password son diferentes (por el salt)
 */
describe('BcryptPasswordService', () => {
    const service = new BcryptPasswordService();

    // ====================================================================
    // Método hash
    // ====================================================================
    describe('hash', () => {
        it('debe generar un hash diferente al password original', async () => {
            // Arrange
            const password = 'mi_password_secreta';

            // Act
            const hash = await service.hash(password);

            // Assert
            expect(hash).not.toBe(password);
            expect(hash).toBeTruthy();
            expect(typeof hash).toBe('string');
        });

        it('debe generar un hash con formato bcrypt válido', async () => {
            // Arrange
            const password = 'test123';

            // Act
            const hash = await service.hash(password);

            // Assert — Los hashes bcrypt empiezan con $2a$ o $2b$
            expect(hash).toMatch(/^\$2[ab]\$/);
        });

        it('debe generar hashes diferentes para el mismo password (salt aleatorio)', async () => {
            // Arrange
            const password = 'mismo_password';

            // Act
            const hash1 = await service.hash(password);
            const hash2 = await service.hash(password);

            // Assert — Diferentes hashes por el salt aleatorio
            expect(hash1).not.toBe(hash2);
        });
    });

    // ====================================================================
    // Método compare
    // ====================================================================
    describe('compare', () => {
        it('debe retornar true cuando el password coincide con el hash (round-trip)', async () => {
            // Arrange
            const password = 'password_correcto';
            const hash = await service.hash(password);

            // Act
            const result = await service.compare(password, hash);

            // Assert
            expect(result).toBe(true);
        });

        it('debe retornar false cuando el password no coincide con el hash', async () => {
            // Arrange
            const password = 'password_original';
            const hash = await service.hash(password);

            // Act
            const result = await service.compare('password_incorrecto', hash);

            // Assert
            expect(result).toBe(false);
        });

        it('debe funcionar con passwords largos', async () => {
            // Arrange
            const longPassword = 'A'.repeat(72); // bcrypt soporta hasta 72 bytes
            const hash = await service.hash(longPassword);

            // Act
            const result = await service.compare(longPassword, hash);

            // Assert
            expect(result).toBe(true);
        });
    });
});

