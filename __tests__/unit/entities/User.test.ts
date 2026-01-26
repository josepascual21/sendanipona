import { describe, it, expect } from 'vitest';
import { User } from '@/core/domain/entities/User';

/**
 * Tests para la entidad User
 * 
 * Verificamos:
 * - Construcción correcta con datos válidos
 * - Validaciones de campos obligatorios
 * - Validación de formato de email
 */
describe('User Entity', () => {
    describe('Constructor - Casos válidos', () => {
        it('debe crear un usuario con todos los datos válidos', () => {
            // Arrange
            const validData = {
                id: 'clzzz123456',
                email: 'usuario@example.com',
                username: 'usuario_test',
                isActive: true,
                createdAt: new Date('2024-01-01'),
            };

            // Act
            const user = new User(validData);

            // Assert
            expect(user.id).toBe(validData.id);
            expect(user.email).toBe(validData.email);
            expect(user.username).toBe(validData.username);
            expect(user.isActive).toBe(true);
            expect(user.createdAt).toEqual(validData.createdAt);
        });

        it('debe crear un usuario inactivo', () => {
            // Arrange
            const validData = {
                id: 'clzzz123456',
                email: 'inactivo@example.com',
                username: 'usuario_inactivo',
                isActive: false,
                createdAt: new Date(),
            };

            // Act
            const user = new User(validData);

            // Assert
            expect(user.isActive).toBe(false);
        });

        it('debe aceptar diferentes formatos de email válidos', () => {
            // Arrange & Act & Assert
            const validEmails = [
                'simple@example.com',
                'nombre.apellido@example.co.uk',
                'user+tag@domain.org',
                'test_123@sub.domain.com',
            ];

            validEmails.forEach(email => {
                const userData = {
                    id: 'clzzz123456',
                    email: email,
                    username: 'test_user',
                    isActive: true,
                    createdAt: new Date(),
                };

                const user = new User(userData);
                expect(user.email).toBe(email);
            });
        });


    });

    describe('Constructor - Validaciones de campos obligatorios', () => {
        const validBase = {
            id: 'clzzz123456',
            email: 'usuario@example.com',
            username: 'usuario_test',
            isActive: true,
            createdAt: new Date(),
        };

        it('debe lanzar error si el id está vacío', () => {
            // Arrange
            const invalidData = { ...validBase, id: '' };

            // Act & Assert
            expect(() => new User(invalidData)).toThrow('ID de usuario no puede estar vacio');
        });

        it('debe lanzar error si el id es solo espacios', () => {
            // Arrange
            const invalidData = { ...validBase, id: '   ' };

            // Act & Assert
            expect(() => new User(invalidData)).toThrow('ID de usuario no puede estar vacio');
        });

        it('debe lanzar error si el email está vacío', () => {
            // Arrange
            const invalidData = { ...validBase, email: '' };

            // Act & Assert
            expect(() => new User(invalidData)).toThrow('Email de usuario no puede estar vacio');
        });

        it('debe lanzar error si el email es solo espacios', () => {
            // Arrange
            const invalidData = { ...validBase, email: '   ' };

            // Act & Assert
            expect(() => new User(invalidData)).toThrow('Email de usuario no puede estar vacio');
        });

        it('debe lanzar error si el username está vacío', () => {
            // Arrange
            const invalidData = { ...validBase, username: '' };

            // Act & Assert
            expect(() => new User(invalidData)).toThrow('Nombre de usuario no puede estar vacio');
        });

        it('debe lanzar error si el username es solo espacios', () => {
            // Arrange
            const invalidData = { ...validBase, username: '   ' };

            // Act & Assert
            expect(() => new User(invalidData)).toThrow('Nombre de usuario no puede estar vacio');
        });
    });

    describe('Constructor - Validación de email', () => {
        const validBase = {
            id: 'clzzz123456',
            email: 'usuario@example.com',
            username: 'usuario_test',
            isActive: true,
            createdAt: new Date(),
        };

        it('debe lanzar error si el email no tiene @', () => {
            // Arrange
            const invalidData = { ...validBase, email: 'usuarioexample.com' };

            // Act & Assert
            expect(() => new User(invalidData)).toThrow('Email de usuario es invalido');
        });

        it('debe lanzar error si el email no tiene dominio', () => {
            // Arrange
            const invalidData = { ...validBase, email: 'usuario@' };

            // Act & Assert
            expect(() => new User(invalidData)).toThrow('Email de usuario es invalido');
        });

        it('debe lanzar error si el email no tiene extensión de dominio', () => {
            // Arrange
            const invalidData = { ...validBase, email: 'usuario@example' };

            // Act & Assert
            expect(() => new User(invalidData)).toThrow('Email de usuario es invalido');
        });

        it('debe lanzar error si el email no tiene parte local', () => {
            // Arrange
            const invalidData = { ...validBase, email: '@example.com' };

            // Act & Assert
            expect(() => new User(invalidData)).toThrow('Email de usuario es invalido');
        });

        it('debe lanzar error si el email tiene espacios', () => {
            // Arrange
            const invalidData = { ...validBase, email: 'usuario test@example.com' };

            // Act & Assert
            expect(() => new User(invalidData)).toThrow('Email de usuario es invalido');
        });

        it('debe lanzar error si el email tiene formato inválido', () => {
            // Arrange & Act & Assert
            const invalidEmails = [
                'invalido',
                'invalido@',
                '@invalido.com',
                'invalido@com',
                'invalido @example.com',
                'invalido@example .com',
            ];

            invalidEmails.forEach(email => {
                const invalidData = { ...validBase, email: email };
                expect(() => new User(invalidData)).toThrow('Email de usuario es invalido');
            });
        });
    });
});
