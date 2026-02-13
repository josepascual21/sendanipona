import { InvalidEntityError } from '../errors/InvalidEntityError';

/** Longitud mínima permitida para el texto de un comentario */
export const COMMENT_MIN_LENGTH = 10;

/** Longitud máxima permitida para el texto de un comentario */
export const COMMENT_MAX_LENGTH = 500;

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
    /**
     * Nombre del autor del comentario (opcional, se rellena en consultas con join)
     */
    readonly authorName?: string;

    constructor(props: {
        id: string;
        textComment: string;
        userId: string;
        articleId: string;
        createdAt: Date;
        authorName?: string;
    }) {
        // Validaciones básicas
        if (!props.id || props.id.trim() === '') {
            throw new InvalidEntityError('Comment', 'Comment ID no puede estar vacio');
        }
        if (!props.textComment || props.textComment.trim() === '') {
            throw new InvalidEntityError('Comment', 'Comment text no puede estar vacio');
        }
        if (props.textComment.length < COMMENT_MIN_LENGTH) {
            throw new InvalidEntityError('Comment', `Comment text debe tener al menos ${COMMENT_MIN_LENGTH} caracteres`);
        }
        if (props.textComment.length > COMMENT_MAX_LENGTH) {
            throw new InvalidEntityError('Comment', `Comment text no puede exceder ${COMMENT_MAX_LENGTH} caracteres`);
        }
        if (!props.userId || props.userId.trim() === '') {
            throw new InvalidEntityError('Comment', 'Comment userId no puede estar vacio');
        }
        if (!props.articleId || props.articleId.trim() === '') {
            throw new InvalidEntityError('Comment', 'Comment articleId no puede estar vacio');
        }
        this.id = props.id;
        this.textComment = props.textComment;
        this.userId = props.userId;
        this.articleId = props.articleId;
        this.createdAt = props.createdAt;
        this.authorName = props.authorName;
    }
}