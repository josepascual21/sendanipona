'use client';

import { useFormStatus } from 'react-dom';
import { createComment } from '@/app/lib/actions';
import { useState } from 'react';
import Link from 'next/link';
import { COMMENT_MIN_LENGTH, COMMENT_MAX_LENGTH } from '@/core/domain/entities/Comment';

interface CommentFormProps {
    articleId: string;
    userId?: string;
    hasCommented?: boolean;
    /** Callback que notifica al padre cuando se crea un comentario con éxito */
    onCommentCreated?: () => void;
}

export default function CommentForm({ articleId, userId, hasCommented = false, onCommentCreated }: CommentFormProps) {
    const [charCount, setCharCount] = useState(0);
    const [error, setError] = useState<string | null>(null);

    // Si el usuario no está logueado
    if (!userId) {
        return (
            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 text-center">
                <p className="text-zinc-400 mb-4">Inicia sesión para compartir tu opinión</p>
                <Link
                    href="/login"
                    className="inline-block bg-orange-600 hover:bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
                >
                    Iniciar Sesión
                </Link>
            </div>
        );
    }

    // Si ya comentó
    if (hasCommented) {
        return (
            <div className="bg-emerald-900/20 p-6 rounded-xl border border-emerald-900/50 text-center">
                <p className="text-emerald-400 font-medium">¡Gracias! Ya has compartido tu opinión sobre este artículo.</p>
                <p className="text-zinc-500 text-sm mt-2">Solo se permite un comentario por usuario.</p>
            </div>
        );
    }

    async function handleSubmit(formData: FormData) {
        setError(null);
        const text = formData.get('textComment') as string;

        if (text.length > COMMENT_MAX_LENGTH) {
            setError(`El comentario no puede exceder los ${COMMENT_MAX_LENGTH} caracteres`);
            return;
        }

        if (text.length < COMMENT_MIN_LENGTH) {
            setError(`El comentario debe tener al menos ${COMMENT_MIN_LENGTH} caracteres`);
            return;
        }

        const result = await createComment(userId!, articleId, text);

        if (result.success) {
            // Resetear el formulario y notificar al padre
            setCharCount(0);
            onCommentCreated?.();
        } else {
            setError(result.error || 'Error al publicar el comentario');
        }
    }

    return (
        <form action={handleSubmit} className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-yuji-mai text-white mb-4">Deja tu comentario</h3>

            <div className="relative">
                <textarea
                    name="textComment"
                    rows={4}
                    className="w-full bg-black/40 border border-zinc-700 rounded-lg p-3 text-zinc-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none transition-all placeholder:text-zinc-600"
                    placeholder="Comparte tus pensamientos sobre el artículo..."
                    onChange={(e) => {
                        setCharCount(e.target.value.length);
                        if (error) setError(null);
                    }}
                    maxLength={COMMENT_MAX_LENGTH}
                    required
                />
                <div className={`absolute bottom-3 right-3 text-xs ${charCount > COMMENT_MAX_LENGTH - 50 ? 'text-orange-500' : 'text-zinc-600'}`}>
                    {charCount}/{COMMENT_MAX_LENGTH}
                </div>
            </div>

            {error && (
                <div className="mt-3 text-red-400 text-sm bg-red-900/20 p-2 rounded border border-red-900/30">
                    {error}
                </div>
            )}

            <div className="mt-4 flex justify-end">
                <SubmitButton />
            </div>
        </form>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
            {pending ? (
                <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Publicando...
                </>
            ) : (
                'Publicar Comentario'
            )}
        </button>
    );
}
