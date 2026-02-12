import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { container } from '../di/container';
import { LoginSchema } from '../../app/lib/schemas';

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                try {
                    // Validar credenciales con schema Zod (capa de adaptador)
                    const parsed = LoginSchema.safeParse({
                        email: credentials?.email,
                        password: credentials?.password,
                    });

                    if (!parsed.success) return null;

                    const loginUseCase = container.getLoginUseCase();
                    const user = await loginUseCase.execute(parsed.data);
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
