import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { container } from '../di/container';

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                try {
                    const loginUseCase = container.getLoginUseCase();

                    // La validación Zod se delega al LoginUseCase para evitar duplicidad
                    const email = credentials?.email as string;
                    const password = credentials?.password as string;

                    if (!email || !password) return null;

                    const user = await loginUseCase.execute({ email, password });
                    if (!user) return null;

                    // Devolver objeto de usuario compatible con NextAuth User type
                    return {
                        id: user.id,
                        name: user.username,
                        email: user.email,
                    };
                } catch (error) {
                    console.error('Error de autenticación:', error);
                    return null;
                }
            },
        }),
    ],
});
