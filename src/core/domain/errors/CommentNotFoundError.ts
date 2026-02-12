/**
 * Error de dominio lanzado cuando un comentario no se encuentra.
 * 
 * Se usa en operaciones que requieren un comentario existente,
 * como la eliminación de comentarios.
 */
export class CommentNotFoundError extends Error {
    /** ID del comentario que no fue encontrado */
    readonly commentId: string;

    constructor(commentId: string) {
        super(`Comentario con ID ${commentId} no encontrado`);
        this.name = 'CommentNotFoundError';
        this.commentId = commentId;
    }
}
