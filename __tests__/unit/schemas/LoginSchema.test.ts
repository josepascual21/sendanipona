import { describe, it, expect } from 'vitest';
import { LoginSchema } from '@/app/lib/schemas';

/**
 * Tests para LoginSchema (Zod)
 *
 * Verificamos las validaciones de la frontera de entrada del formulario de login:
 * - Datos válidos pasan correctamente
 * - Email inválido es rechazado con mensaje "Email inválido"
 * - Contraseña vacía es rechazada con mensaje "La contraseña es requerida"
 */
describe('LoginSchema', () => {
    /** Datos válidos reutilizables */
    const validData = {
        email: 'usuario@example.com',
        password: 'password123',
    };

    // ====================================================================
    // Datos válidos
    // ====================================================================
    describe('Datos válidos', () => {
        it('debe validar correctamente datos de login válidos', () => {
            // Act
            const result = LoginSchema.safeParse(validData);

            // Assert
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.email).toBe('usuario@example.com');
                expect(result.data.password).toBe('password123');
            }
        });

        it('debe aceptar contraseña con un solo carácter (mínimo 1)', () => {
            // Arrange
            const data = { ...validData, password: 'x' };

            // Act
            const result = LoginSchema.safeParse(data);

            // Assert
            expect(result.success).toBe(true);
        });
    });

    // ====================================================================
    // Validaciones de email
    // ====================================================================
    describe('Validaciones de email', () => {
        it.each([
            'email-invalido',
            'sin-arroba.com',
            '@sin-local.com',
            'usuario@',
        ])('debe rechazar email inválido: %s', (email) => {
            // Arrange
            const data = { ...validData, email };

            // Act
            const result = LoginSchema.safeParse(data);

            // Assert — Verifica rechazo y mensaje personalizado del schema
            expect(result.success).toBe(false);
            if (!result.success) {
                const emailError = result.error.issues.find(i => i.path.includes('email'));
                expect(emailError?.message).toBe('Email inválido');
            }
        });

        it('debe rechazar email vacío', () => {
            // Arrange
            const data = { ...validData, email: '' };

            // Act
            const result = LoginSchema.safeParse(data);

            // Assert — Email vacío también falla la validación .email()
            expect(result.success).toBe(false);
            if (!result.success) {
                const emailError = result.error.issues.find(i => i.path.includes('email'));
                expect(emailError?.message).toBe('Email inválido');
            }
        });
    });

    // ====================================================================
    // Validaciones de contraseña
    // ====================================================================
    describe('Validaciones de contraseña', () => {
        it('debe rechazar contraseña vacía', () => {
            // Arrange
            const data = { ...validData, password: '' };

            // Act
            const result = LoginSchema.safeParse(data);

            // Assert
            expect(result.success).toBe(false);
            if (!result.success) {
                const passwordError = result.error.issues.find(i => i.path.includes('password'));
                expect(passwordError?.message).toBe('La contraseña es requerida');
            }
        });
    });
});

