'use server';

import { signIn, signOut } from '@/infrastructure/auth/auth';
import { AuthError } from 'next-auth';
import { UserAlreadyExistsError } from '@/core/domain/errors/UserAlreadyExistsError';
import { container } from '@/infrastructure/di/container';
import { CommentAlreadyExistsError } from '@/core/domain/errors/CommentAlreadyExistsError';
import { revalidatePath } from 'next/cache';

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

// --- Comments Actions ---

export async function createComment(userId: string, articleId: string, textComment: string) {
    try {
        const createCommentUseCase = container.getCreateCommentUseCase();
        await createCommentUseCase.execute({ userId, articleId, textComment });

        revalidatePath(`/articulos/${articleId}`); // Revalidar la página del artículo
        return { success: true };
    } catch (error) {
        if (error instanceof CommentAlreadyExistsError) {
            return { success: false, error: 'Ya has comentado en este artículo' };
        }
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: 'Error al crear el comentario' };
    }
}

export async function getArticleComments(articleId: string, page: number = 1) {
    try {
        const getCommentsUseCase = container.getArticleCommentsUseCase();
        const comments = await getCommentsUseCase.execute(articleId, page);
        // Serializar fechas para que puedan pasar de Server a Client Component
        return { success: true, comments: JSON.parse(JSON.stringify(comments)) };
    } catch (error) {
        console.error('Error fetching comments:', error);
        return { success: false, comments: [] };
    }
}

export async function deleteComment(commentId: string, userId: string, articlePath: string) {
    try {
        const deleteCommentUseCase = container.getDeleteCommentUseCase();
        await deleteCommentUseCase.execute(commentId, userId);

        revalidatePath(articlePath);
        return { success: true };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: 'Error al eliminar el comentario' };
    }
}

export async function getArticleIdBySlug(slug: string) {
    try {
        const getArticleBySlugUseCase = container.getArticleBySlugUseCase();
        const article = await getArticleBySlugUseCase.execute(slug);

        if (!article) {
            return { success: false, error: 'Artículo no encontrado' };
        }

        return { success: true, articleId: article.id };
    } catch (error) {
        console.error('Error getting article ID:', error);
        return { success: false, error: 'Error al obtener el artículo' };
    }
}

export async function checkIfUserCommented(userId: string, articleId: string) {
    try {
        const checkUserCommentUseCase = container.getCheckUserCommentUseCase();
        const hasCommented = await checkUserCommentUseCase.execute(userId, articleId);
        return { hasCommented };
    } catch (error) {
        console.error('Error checking if user commented:', error);
        return { hasCommented: false };
    }
}
