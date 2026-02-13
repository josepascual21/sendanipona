'use client';

import { useState, useEffect, useCallback } from 'react';
import { getArticleComments, deleteComment } from '@/app/lib/actions';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { CommentDTO } from '@/core/application/dtos/CommentDTO';

interface CommentListProps {
    articleId: string;
    currentUser: { id: string; role?: string } | null;
}



export default function CommentList({ articleId, currentUser }: CommentListProps) {
    const [comments, setComments] = useState<CommentDTO[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    const loadComments = useCallback(async (pageNum: number, reset: boolean = false) => {
        setLoading(true);
        const result = await getArticleComments(articleId, pageNum);

        if (result.success && result.comments) {
            if (reset) {
                setComments(result.comments);
            } else {
                setComments(prev => [...prev, ...result.comments]);
            }

            // Si devuelve menos de 4, no hay más páginas (tamaño de página hardcodeado en repo por ahora)
            if (result.comments.length < 4) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        }
        setLoading(false);
    }, [articleId]);

    useEffect(() => {
        loadComments(1, true);
    }, [loadComments]);

    async function handleDelete(commentId: string) {
        if (!confirm('¿Estás seguro de que quieres eliminar este comentario?')) return;

        const result = await deleteComment(commentId, currentUser!.id, `/articulos/${articleId}`); // Path para revalidate

        if (result.success) {
            // Eliminar de la lista localmente
            setComments(prev => prev.filter(c => c.id !== commentId));
        } else {
            alert(result.error);
        }
    }

    function handleLoadMore() {
        const nextPage = page + 1;
        setPage(nextPage);
        loadComments(nextPage);
    }

    return (
        <div className="space-y-6 mt-8">
            <h3 className="text-2xl font-ai-love text-white border-b border-zinc-800 pb-2">
                Comentarios
            </h3>

            {comments.length === 0 && !loading ? (
                <p className="text-zinc-500 italic">Sé el primero en comentar.</p>
            ) : (
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-zinc-900/30 p-4 rounded-lg border border-zinc-800/50 group hover:border-zinc-700 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center text-white text-xs font-bold">
                                        {/* Inicial del nombre del autor */}
                                        {(comment.user?.name ?? 'A').charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-zinc-300 text-sm font-medium">{comment.user?.name ?? 'Anónimo'}</span>
                                        <span className="text-zinc-600 text-xs">
                                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: es })}
                                        </span>
                                    </div>
                                </div>

                                {currentUser && currentUser.id === comment.userId && (
                                    <button
                                        onClick={() => handleDelete(comment.id)}
                                        className="text-zinc-600 hover:text-red-500 transition-colors p-1"
                                        title="Eliminar comentario"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            <p className="text-zinc-300 text-sm leading-relaxed pl-10">
                                {comment.textComment}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {loading && (
                <div className="flex justify-center py-4">
                    <div className="animate-pulse flex space-x-2">
                        <div className="h-2 w-2 bg-zinc-600 rounded-full"></div>
                        <div className="h-2 w-2 bg-zinc-600 rounded-full"></div>
                        <div className="h-2 w-2 bg-zinc-600 rounded-full"></div>
                    </div>
                </div>
            )}

            {!loading && hasMore && comments.length > 0 && (
                <div className="text-center pt-2">
                    <button
                        onClick={handleLoadMore}
                        className="text-zinc-400 hover:text-orange-500 text-sm font-medium transition-colors"
                    >
                        Cargar más comentarios
                    </button>
                </div>
            )}
        </div>
    );
}
