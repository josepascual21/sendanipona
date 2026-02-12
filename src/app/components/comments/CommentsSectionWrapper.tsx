'use client';

import { useEffect, useState } from 'react';
import { getArticleIdBySlug, checkIfUserCommented } from '@/app/lib/actions';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { useSession } from 'next-auth/react';

export default function CommentsSectionWrapper({ slug }: { slug: string }) {
    const { data: session } = useSession();
    const [articleId, setArticleId] = useState<string | null>(null);
    const [hasCommented, setHasCommented] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function init() {
            setLoading(true);

            // 1. Obtener ID del artículo
            const articleResult = await getArticleIdBySlug(slug);
            if (articleResult.success && articleResult.articleId) {
                setArticleId(articleResult.articleId);

                // 2. Verificar si el usuario ya comentó (si está logueado)
                if (session?.user?.id) {
                    const statusResult = await checkIfUserCommented(session.user.id, articleResult.articleId);
                    setHasCommented(statusResult.hasCommented);
                }
            }

            setLoading(false);
        }

        init();
    }, [slug, session]);

    if (loading) {
        return <div className="py-12 text-center text-zinc-500 animate-pulse">Cargando comentarios...</div>;
    }

    if (!articleId) {
        return null; // O mostrar mensaje de error
    }

    const userId = session?.user?.id;
    const currentUser = userId ? { id: userId, role: 'user' } : null;

    return (
        <section className="max-w-3xl mx-auto px-6 py-12 border-t border-zinc-800">
            <CommentForm
                articleId={articleId}
                userId={session?.user?.id}
                hasCommented={hasCommented}
            />
            <CommentList
                articleId={articleId}
                currentUser={currentUser}
            />
        </section>
    );
}
