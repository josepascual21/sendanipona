'use server';

import { signIn, signOut } from '@/infrastructure/auth/auth';
import { AuthError } from 'next-auth';
import { UserAlreadyExistsError } from '@/core/domain/errors/UserAlreadyExistsError';
import { container } from '@/infrastructure/di/container';
import { CommentAlreadyExistsError } from '@/core/domain/errors/CommentAlreadyExistsError';
import { CommentDTO } from '@/core/application/dtos/CommentDTO';
import { revalidatePath } from 'next/cache';
import { RegisterSchema } from './schemas';

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

        // Validar datos del formulario con schema Zod (capa de presentación)
        const validatedData = RegisterSchema.parse({
            name: data.name as string,
            email: data.email as string,
            password: data.password as string,
            confirmPassword: data.confirmPassword as string,
        });

        // Ejecutar use case con datos validados
        const registerUseCase = container.getRegisterUseCase();
        await registerUseCase.execute(validatedData);

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

        // Mapper explícito Comment → CommentDTO (serializa fechas y añade datos de autor)
        const commentsDTO: CommentDTO[] = comments.map(c => ({
            id: c.id,
            textComment: c.textComment,
            createdAt: c.createdAt.toISOString(),
            userId: c.userId,
            user: c.authorName ? { name: c.authorName } : undefined,
        }));

        return { success: true, comments: commentsDTO };
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
