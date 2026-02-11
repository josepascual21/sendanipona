'use server';

import { signIn, signOut } from '@/infrastructure/auth/auth';
import { AuthError } from 'next-auth';
import { UserAlreadyExistsError } from '@/core/domain/errors/UserAlreadyExistsError';
import { container } from '@/infrastructure/di/container';
import { redirect } from 'next/navigation';

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

        // Login automático tras registro (opcional, o redirigir a login)
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return error.message;
        }
        if (error instanceof Error) {
            return error.message;
        }
        return 'Error desconocido al registrar usuario';
    }

    // Redirigir fuera del try-catch para evitar que Next.js capture el redirect como error
    redirect('/login?registered=true');
}
