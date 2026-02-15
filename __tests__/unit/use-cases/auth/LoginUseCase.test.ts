import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginUseCase } from '@/core/application/use-cases/auth/LoginUseCase';
import { User } from '@/core/domain/entities/User';
import type { IUserRepository } from '@/core/domain/repositories/IUserRepository';
import type { IPasswordService } from '@/core/domain/services/IPasswordService';

/**
 * Tests para LoginUseCase
 *
 * Verificamos:
 * - Login exitoso: retorna el User autenticado
 * - Retorna null si el usuario no existe
 * - Retorna null si la contraseña es incorrecta
 * - Retorna null si la cuenta del usuario está inactiva
 * - Retorna null si el usuario no tiene password (ej: OAuth)
 */
describe('LoginUseCase', () => {
    // --- Mocks de dependencias ---
    let mockUserRepository: IUserRepository;
    let mockPasswordService: IPasswordService;
    let loginUseCase: LoginUseCase;

    /** Usuario válido reutilizable en los tests */
    const validUser = new User({
        id: 'user_123',
        email: 'usuario@example.com',
        username: 'usuario_test',
        password: 'hashed_password',
        isActive: true,
        createdAt: new Date('2024-01-01'),
    });

    beforeEach(() => {
        mockUserRepository = {
            findById: vi.fn(),
            findByEmail: vi.fn(),
            save: vi.fn(),
        };

        mockPasswordService = {
            hash: vi.fn(),
            compare: vi.fn(),
        };

        loginUseCase = new LoginUseCase(mockUserRepository, mockPasswordService);
    });

    // ====================================================================
    // Login exitoso
    // ====================================================================
    describe('Login exitoso', () => {
        it('debe retornar el usuario cuando las credenciales son correctas', async () => {
            // Arrange
            vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(validUser);
            vi.mocked(mockPasswordService.compare).mockResolvedValue(true);

            const dto = { email: 'usuario@example.com', password: 'mi_password' };

            // Act
            const result = await loginUseCase.execute(dto);

            // Assert
            expect(result).toBe(validUser);
            expect(result?.email).toBe('usuario@example.com');
        });

        it('debe buscar al usuario por email', async () => {
            // Arrange
            vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(validUser);
            vi.mocked(mockPasswordService.compare).mockResolvedValue(true);

            // Act
            await loginUseCase.execute({ email: 'usuario@example.com', password: 'pass' });

            // Assert
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('usuario@example.com');
        });

        it('debe comparar la contraseña con el hash almacenado', async () => {
            // Arrange
            vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(validUser);
            vi.mocked(mockPasswordService.compare).mockResolvedValue(true);

            // Act
            await loginUseCase.execute({ email: 'usuario@example.com', password: 'mi_password' });

            // Assert
            expect(mockPasswordService.compare).toHaveBeenCalledWith('mi_password', 'hashed_password');
        });
    });

    // ====================================================================
    // Casos de fallo (retorna null)
    // ====================================================================
    describe('Casos de fallo', () => {
        it('debe retornar null si el usuario no existe', async () => {
            // Arrange — findByEmail devuelve null
            vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(null);

            // Act
            const result = await loginUseCase.execute({ email: 'noexiste@test.com', password: 'pass' });

            // Assert
            expect(result).toBeNull();
            expect(mockPasswordService.compare).not.toHaveBeenCalled();
        });

        it('debe retornar null si la contraseña es incorrecta', async () => {
            // Arrange
            vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(validUser);
            vi.mocked(mockPasswordService.compare).mockResolvedValue(false);

            // Act
            const result = await loginUseCase.execute({ email: 'usuario@example.com', password: 'wrong' });

            // Assert
            expect(result).toBeNull();
        });

        it('debe retornar null si la cuenta del usuario está inactiva', async () => {
            // Arrange — Usuario inactivo
            const inactiveUser = new User({
                id: 'user_inactive',
                email: 'inactivo@example.com',
                username: 'inactivo',
                password: 'hashed',
                isActive: false,
                createdAt: new Date(),
            });
            vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(inactiveUser);

            // Act
            const result = await loginUseCase.execute({ email: 'inactivo@example.com', password: 'pass' });

            // Assert
            expect(result).toBeNull();
            // No se debe verificar la contraseña si la cuenta está inactiva
            expect(mockPasswordService.compare).not.toHaveBeenCalled();
        });

        it('debe retornar null si el usuario no tiene password (ej: OAuth)', async () => {
            // Arrange — Usuario sin password
            const oauthUser = new User({
                id: 'user_oauth',
                email: 'oauth@example.com',
                username: 'oauth_user',
                isActive: true,
                createdAt: new Date(),
                // Sin password
            });
            vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(oauthUser);

            // Act
            const result = await loginUseCase.execute({ email: 'oauth@example.com', password: 'pass' });

            // Assert
            expect(result).toBeNull();
            expect(mockPasswordService.compare).not.toHaveBeenCalled();
        });
    });
});
