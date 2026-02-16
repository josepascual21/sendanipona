import { describe, it, expect } from 'vitest';
import { RegisterSchema } from '@/app/lib/schemas';

/**
 * Tests para RegisterSchema (Zod)
 *
 * Verificamos las validaciones de la frontera de entrada del formulario de registro:
 * - Datos válidos pasan correctamente
 * - Email inválido rechazado con mensaje "Email inválido"
 * - Contraseñas que no coinciden rechazadas con "Las contraseñas no coinciden"
 * - Nombre corto rechazado con "El nombre debe tener al menos 2 caracteres"
 * - Password corta rechazada con "La contraseña debe tener al menos 6 caracteres"
 * - ConfirmPassword corta rechazada con "Confirmar contraseña debe tener al menos 6 caracteres"
 */
describe('RegisterSchema', () => {
    /** Datos válidos reutilizables */
    const validData = {
        name: 'Usuario Test',
        email: 'usuario@example.com',
        password: 'password123',
        confirmPassword: 'password123',
    };

    // ====================================================================
    // Datos válidos
    // ====================================================================
    describe('Datos válidos', () => {
        it('debe validar correctamente datos de registro válidos', () => {
            // Act
            const result = RegisterSchema.safeParse(validData);

            // Assert
            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.name).toBe('Usuario Test');
                expect(result.data.email).toBe('usuario@example.com');
                expect(result.data.password).toBe('password123');
            }
        });

        it('debe aceptar nombre con exactamente 2 caracteres', () => {
            // Arrange
            const data = { ...validData, name: 'AB' };

            // Act
            const result = RegisterSchema.safeParse(data);

            // Assert
            expect(result.success).toBe(true);
        });

        it('debe aceptar contraseña con exactamente 6 caracteres', () => {
            // Arrange
            const data = { ...validData, password: '123456', confirmPassword: '123456' };

            // Act
            const result = RegisterSchema.safeParse(data);

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
            const result = RegisterSchema.safeParse(data);

            // Assert — Verifica rechazo y mensaje personalizado del schema
            expect(result.success).toBe(false);
            if (!result.success) {
                const emailError = result.error.issues.find(i => i.path.includes('email'));
                expect(emailError?.message).toBe('Email inválido');
            }
        });
    });

    // ====================================================================
    // Validaciones de contraseñas
    // ====================================================================
    describe('Validaciones de contraseñas', () => {
        it('debe rechazar cuando las contraseñas no coinciden', () => {
            // Arrange
            const data = { ...validData, password: 'password123', confirmPassword: 'password456' };

            // Act
            const result = RegisterSchema.safeParse(data);

            // Assert
            expect(result.success).toBe(false);
            if (!result.success) {
                const confirmError = result.error.issues.find(i => i.path.includes('confirmPassword'));
                expect(confirmError?.message).toBe('Las contraseñas no coinciden');
            }
        });

        it('debe rechazar contraseña con menos de 6 caracteres', () => {
            // Arrange
            const data = { ...validData, password: '12345', confirmPassword: '12345' };

            // Act
            const result = RegisterSchema.safeParse(data);

            // Assert — Verifica mensaje personalizado de min(6) en password
            expect(result.success).toBe(false);
            if (!result.success) {
                const passwordError = result.error.issues.find(i => i.path.includes('password'));
                expect(passwordError?.message).toBe('La contraseña debe tener al menos 6 caracteres');
            }
        });

        it('debe rechazar confirmPassword con menos de 6 caracteres', () => {
            // Arrange — Password válida pero confirmPassword demasiado corta
            const data = { ...validData, confirmPassword: '12345' };

            // Act
            const result = RegisterSchema.safeParse(data);

            // Assert — Verifica mensaje personalizado de min(6) en confirmPassword
            expect(result.success).toBe(false);
            if (!result.success) {
                const confirmError = result.error.issues.find(i => i.path.includes('confirmPassword'));
                expect(confirmError?.message).toBe('Confirmar contraseña debe tener al menos 6 caracteres');
            }
        });
    });

    // ====================================================================
    // Validaciones de nombre
    // ====================================================================
    describe('Validaciones de nombre', () => {
        it('debe rechazar nombre con menos de 2 caracteres', () => {
            // Arrange
            const data = { ...validData, name: 'A' };

            // Act
            const result = RegisterSchema.safeParse(data);

            // Assert — Verifica mensaje personalizado de min(2) en name
            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find(i => i.path.includes('name'));
                expect(nameError?.message).toBe('El nombre debe tener al menos 2 caracteres');
            }
        });

        it('debe rechazar nombre vacío', () => {
            // Arrange
            const data = { ...validData, name: '' };

            // Act
            const result = RegisterSchema.safeParse(data);

            // Assert — Nombre vacío también falla min(2)
            expect(result.success).toBe(false);
            if (!result.success) {
                const nameError = result.error.issues.find(i => i.path.includes('name'));
                expect(nameError?.message).toBe('El nombre debe tener al menos 2 caracteres');
            }
        });
    });
});

