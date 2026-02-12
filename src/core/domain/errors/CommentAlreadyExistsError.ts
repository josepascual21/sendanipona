/**
 * Error lanzado cuando un usuario intenta crear un comentario en un artículo
 * donde ya tiene uno publicado.
 */
export class CommentAlreadyExistsError extends Error {
    constructor(userId: string, articleId: string) {
        super(`El usuario ${userId} ya ha comentado en el artículo ${articleId}`);
        this.name = 'CommentAlreadyExistsError';
    }
}
