/**
 * DTO para transferir datos de comentarios entre capas
 * 
 * Usado por los componentes de UI para tipar la respuesta serializada
 * de las Server Actions. Las fechas se serializan como string al cruzar
 * la frontera Server → Client.
 */
export interface CommentDTO {
    /** Identificador único del comentario */
    id: string;
    /** Contenido del comentario */
    textComment: string;
    /** Fecha de creación serializada como ISO string */
    createdAt: string;
    /** ID del usuario autor del comentario */
    userId: string;
    /** Datos del usuario (opcional, si el repo hace include) */
    user?: {
        name?: string;
        image?: string;
    };
}
