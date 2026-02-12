/**
 * Error de dominio lanzado cuando un usuario intenta eliminar
 * un comentario que no le pertenece.
 * 
 * Encapsula la regla de negocio de propiedad de comentarios.
 */
export class UnauthorizedDeleteError extends Error {
    /** ID del usuario que intentó la acción */
    readonly userId: string;

    /** ID del comentario sobre el que se intentó la acción */
    readonly commentId: string;

    constructor(userId: string, commentId: string) {
        super(`El usuario ${userId} no tiene permiso para eliminar el comentario ${commentId}`);
        this.name = 'UnauthorizedDeleteError';
        this.userId = userId;
        this.commentId = commentId;
    }
}
