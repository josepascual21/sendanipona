import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RegisterUseCase } from '@/core/application/use-cases/auth/RegisterUseCase';
import { UserAlreadyExistsError } from '@/core/domain/errors/UserAlreadyExistsError';
import { User } from '@/core/domain/entities/User';
import type { IUserRepository } from '@/core/domain/repositories/IUserRepository';
import type { IPasswordService } from '@/core/domain/services/IPasswordService';

/**
 * Tests para RegisterUseCase
 *
 * Verificamos:
 * - Registro exitoso: hasheo de contraseña, creación de entidad, persistencia
 * - Error si el usuario ya existe (UserAlreadyExistsError)
 * - Interacción correcta con dependencias (mocks de repositorio y servicio)
 */
describe('RegisterUseCase', () => {
    // --- Mocks de dependencias ---
    let mockUserRepository: IUserRepository;
    let mockPasswordService: IPasswordService;
    let registerUseCase: RegisterUseCase;

    /**
     * Antes de cada test, creamos mocks frescos para garantizar
     * aislamiento total entre tests.
     */
    beforeEach(() => {
        mockUserRepository = {
            findById: vi.fn(),
            findByEmail: vi.fn(),
            save: vi.fn(),
        };

        mockPasswordService = {
            hash: vi.fn().mockResolvedValue('hashed_password_abc'),
            compare: vi.fn(),
        };

        registerUseCase = new RegisterUseCase(mockUserRepository, mockPasswordService);
    });

    // ====================================================================
    // Registro exitoso
    // ====================================================================
    describe('Registro exitoso', () => {
        it('debe registrar un usuario nuevo correctamente', async () => {
            // Arrange — No existe usuario con ese email
            vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(null);

            const dto = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                confirmPassword: 'password123',
            };

            // Act
            const result = await registerUseCase.execute(dto);

            // Assert — Se devuelve un User con datos correctos
            expect(result).toBeInstanceOf(User);
            expect(result.email).toBe('test@example.com');
            expect(result.username).toBe('Test User');
            expect(result.isActive).toBe(true);
            expect(result.password).toBe('hashed_password_abc');
        });

        it('debe hashear la contraseña antes de guardar', async () => {
            // Arrange
            vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(null);

            const dto = {
                name: 'User',
                email: 'user@test.com',
                password: 'mi_password_secreta',
                confirmPassword: 'mi_password_secreta',
            };

            // Act
            await registerUseCase.execute(dto);

            // Assert — Se llamó a hash con la contraseña en texto plano
            expect(mockPasswordService.hash).toHaveBeenCalledWith('mi_password_secreta');
            expect(mockPasswordService.hash).toHaveBeenCalledTimes(1);
        });

        it('debe persistir el usuario en el repositorio', async () => {
            // Arrange
            vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(null);

            const dto = {
                name: 'Nuevo Usuario',
                email: 'nuevo@example.com',
                password: 'pass123',
                confirmPassword: 'pass123',
            };

            // Act
            await registerUseCase.execute(dto);

            // Assert — Se llamó a save con un objeto User
            expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
            const savedUser = vi.mocked(mockUserRepository.save).mock.calls[0][0];
            expect(savedUser.email).toBe('nuevo@example.com');
            expect(savedUser.username).toBe('Nuevo Usuario');
        });

        it('debe verificar si el email ya está registrado', async () => {
            // Arrange
            vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(null);

            const dto = {
                name: 'User',
                email: 'check@example.com',
                password: 'pass',
                confirmPassword: 'pass',
            };

            // Act
            await registerUseCase.execute(dto);

            // Assert — Se buscó el email antes de crear
            expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('check@example.com');
            expect(mockUserRepository.findByEmail).toHaveBeenCalledTimes(1);
        });
    });

    // ====================================================================
    // Errores
    // ====================================================================
    describe('Errores', () => {
        it('debe lanzar UserAlreadyExistsError si el email ya está registrado', async () => {
            // Arrange — El usuario ya existe
            const existingUser = new User({
                id: 'existing_id',
                email: 'existente@example.com',
                username: 'existente',
                isActive: true,
                createdAt: new Date(),
            });
            vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(existingUser);

            const dto = {
                name: 'Otro User',
                email: 'existente@example.com',
                password: 'pass123',
                confirmPassword: 'pass123',
            };

            // Act & Assert
            await expect(registerUseCase.execute(dto)).rejects.toThrow(UserAlreadyExistsError);
        });

        it('no debe hashear ni guardar si el usuario ya existe', async () => {
            // Arrange
            const existingUser = new User({
                id: 'existing_id',
                email: 'ya@existe.com',
                username: 'yaexiste',
                isActive: true,
                createdAt: new Date(),
            });
            vi.mocked(mockUserRepository.findByEmail).mockResolvedValue(existingUser);

            const dto = {
                name: 'User',
                email: 'ya@existe.com',
                password: 'pass',
                confirmPassword: 'pass',
            };

            // Act & Assert
            await expect(registerUseCase.execute(dto)).rejects.toThrow();

            // No se debió llamar a hash ni a save
            expect(mockPasswordService.hash).not.toHaveBeenCalled();
            expect(mockUserRepository.save).not.toHaveBeenCalled();
        });
    });
});
