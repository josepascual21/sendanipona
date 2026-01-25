/**
 * Entidad Article - Representa un artículo informativo sobre Japón
 */
export class Article {
    /**
     * Identificador único del artículo
     */
    readonly id: string;

    /**
     * Slug único para URLs (ej: "pasado", "presente", "futuro")
     */
    readonly slug: string;

    /**
     * Título display del artículo
     */
    readonly name: string;

    /**
     * Descripción breve del artículo (opcional)
     */
    readonly info: string | null;

    /**
     * Ruta relativa al archivo HTML estático
     * Ejemplo: "/articles/pasado/pass.html"
     */
    readonly htmlRoute: string;

    /**
     * ID del topic asociado (Historia, Cultura, etc.)
     */
    readonly topicId: number;

    /**
     * Fecha de creación del artículo
     */
    readonly createdAt: Date;

    constructor(props: {
        id: string;
        slug: string;
        name: string;
        info: string | null;
        htmlRoute: string;
        topicId: number;
        createdAt: Date;
    }) {
        // Validaciones básicas
        if (!props.id || props.id.trim() === '') {
            throw new Error('Article ID cannot be empty');
        }
        if (!props.slug || props.slug.trim() === '') {
            throw new Error('Article slug cannot be empty');
        }
        if (!props.name || props.name.trim() === '') {
            throw new Error('Article name cannot be empty');
        }
        if (!props.htmlRoute || props.htmlRoute.trim() === '') {
            throw new Error('Article htmlRoute cannot be empty');
        }
        if (props.topicId <= 0) {
            throw new Error('Article topicId must be positive');
        }

        this.id = props.id;
        this.slug = props.slug;
        this.name = props.name;
        this.info = props.info;
        this.htmlRoute = props.htmlRoute;
        this.topicId = props.topicId;
        this.createdAt = props.createdAt;
    }
}
