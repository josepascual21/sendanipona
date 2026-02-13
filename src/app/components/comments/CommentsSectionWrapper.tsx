'use client';

import { useEffect, useState, useCallback } from 'react';
import { getArticleIdBySlug, checkIfUserCommented } from '@/app/lib/actions';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { useSession } from 'next-auth/react';

export default function CommentsSectionWrapper({ slug }: { slug: string }) {
    const { data: session, status } = useSession();
    const [articleId, setArticleId] = useState<string | null>(null);
    const [hasCommented, setHasCommented] = useState(false);
    const [loading, setLoading] = useState(true);
    // Contador que se incrementa cada vez que se crea un comentario,
    // usado como dependencia en CommentList para forzar recarga
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        // Mientras NextAuth aún está verificando la sesión, no hacemos nada
        if (status === 'loading') return;

        async function init() {
            setLoading(true);

            // 1. Obtener ID del artículo por su slug
            const articleResult = await getArticleIdBySlug(slug);
            if (articleResult.success && articleResult.articleId) {
                setArticleId(articleResult.articleId);

                // 2. Si hay sesión activa, verificar si el usuario ya comentó
                if (session?.user?.id) {
                    const statusResult = await checkIfUserCommented(session.user.id, articleResult.articleId);
                    setHasCommented(statusResult.hasCommented);
                } else {
                    // 3. Si no hay sesión (logout), resetear estado de comentario
                    setHasCommented(false);
                }
            }

            setLoading(false);
        }

        init();
    }, [slug, session, status]);

    /**
     * Callback que ejecuta CommentForm tras publicar un comentario con éxito.
     * Incrementa el trigger para que CommentList recargue la lista y marca
     * que el usuario ya ha comentado para ocultar el formulario.
     */
    const handleCommentCreated = useCallback(() => {
        setHasCommented(true);
        setRefreshTrigger(prev => prev + 1);
    }, []);

    /**
     * Callback para resetear el estado cuando se elimina un comentario.
     * Esto hace reaparecer el formulario inmediatamente.
     */
    const handleCommentDeleted = useCallback(() => {
        setHasCommented(false);
        // Opcional: refrescar lista si fuera necesario, aunque CommentList ya lo actualiza localmente
    }, []);

    if (loading) {
        return <div className="py-12 text-center text-zinc-500 animate-pulse">Cargando comentarios...</div>;
    }

    if (!articleId) {
        return null;
    }

    const userId = session?.user?.id;
    const currentUser = userId ? { id: userId, role: 'user' } : null;

    return (
        <section id="comentarios" className="max-w-3xl mx-auto px-6 py-12 border-t border-zinc-800">
            <CommentForm
                articleId={articleId}
                userId={session?.user?.id}
                hasCommented={hasCommented}
                onCommentCreated={handleCommentCreated}
            />
            <CommentList
                articleId={articleId}
                currentUser={currentUser}
                refreshTrigger={refreshTrigger}
                onCommentDeleted={handleCommentDeleted}
            />
        </section>
    );
}

