import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { container } from '../di/container';

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                try {
                    const loginUseCase = container.getLoginUseCase();

                    const parsedCredentials = z
                        .object({ email: z.string().email(), password: z.string().min(6) })
                        .safeParse(credentials);

                    if (parsedCredentials.success) {
                        const { email, password } = parsedCredentials.data;
                        const user = await loginUseCase.execute({ email, password });
                        if (!user) return null;

                        // Return user object compatible with NextAuth User type
                        return {
                            id: user.id,
                            name: user.username,
                            email: user.email,
                        };
                    }

                    console.log('Invalid credentials');
                    return null;
                } catch (error) {
                    console.error('Auth error:', error);
                    return null;
                }
            },
        }),
    ],
});
