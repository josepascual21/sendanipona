'use server';

import { signIn, signOut } from '@/infrastructure/auth/auth';
import { AuthError } from 'next-auth';
import { UserAlreadyExistsError } from '@/core/domain/errors/UserAlreadyExistsError';
import { container } from '@/infrastructure/di/container';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', { ...Object.fromEntries(formData), redirectTo: '/' });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Credenciales inválidas.';
                default:
                    return 'Algo salió mal.';
            }
        }
        throw error;
    }
}

export async function logout() {
    await signOut();
}

export async function registerUser(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const data = Object.fromEntries(formData);

        // Instanciar dependencias usando el contenedor DI
        const registerUseCase = container.getRegisterUseCase();

        await registerUseCase.execute({
            name: data.name as string,
            email: data.email as string,
            password: data.password as string,
            confirmPassword: data.confirmPassword as string,
        });

        // Login automático tras registro exitoso
        await signIn('credentials', {
            email: data.email as string,
            password: data.password as string,
            redirectTo: '/',
        });
    } catch (error) {
        // signIn lanza un error NEXT_REDIRECT internamente al redirigir,
        // necesitamos re-lanzarlo para que Next.js gestione la redirección
        if (error instanceof AuthError) {
            return 'Error al iniciar sesión automáticamente tras el registro.';
        }
        if (error instanceof UserAlreadyExistsError) {
            return error.message;
        }
        if (error instanceof Error) {
            // Dejar pasar errores de redirección de Next.js
            if (error.message.includes('NEXT_REDIRECT')) {
                throw error;
            }
            return error.message;
        }
        return 'Error desconocido al registrar usuario';
    }
}
