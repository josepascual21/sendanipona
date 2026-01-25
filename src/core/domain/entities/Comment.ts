/**
 * Entidad Comment - Representa un comentario de usuario en un artículo
 */
export class Comment {
    /**
     * Identificador único del comentario
     */
    readonly id: string;
    /**
     * Contenido del comentario
     */
    readonly textComment: string;
    /**
     * ID del usuario que creó el comentario
     */
    readonly userId: string;
    /**
     * ID del artículo al que pertenece el comentario
     */
    readonly articleId: string;
    /**
     * Fecha de creación del comentario
     */
    readonly createdAt: Date;
    constructor(props: {
        id: string;
        textComment: string;
        userId: string;
        articleId: string;
        createdAt: Date;
    }) {
        // Validaciones básicas
        if (!props.id || props.id.trim() === '') {
            throw new Error('Comment ID no puede estar vacio');
        }
        if (!props.textComment || props.textComment.trim() === '') {
            throw new Error('Comment text no puede estar vacio');
        }
        if (props.textComment.length < 10) {
            throw new Error('Comment text debe tener al menos 10 caracteres');
        }
        if (props.textComment.length > 500) {
            throw new Error('Comment text no puede exceder 500 caracteres');
        }
        if (!props.userId || props.userId.trim() === '') {
            throw new Error('Comment userId no puede estar vacio');
        }
        if (!props.articleId || props.articleId.trim() === '') {
            throw new Error('Comment articleId no puede estar vacio');
        }
        this.id = props.id;
        this.textComment = props.textComment;
        this.userId = props.userId;
        this.articleId = props.articleId;
        this.createdAt = props.createdAt;
    }
}