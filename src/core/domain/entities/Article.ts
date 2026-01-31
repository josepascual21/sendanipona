/**
 * Entidad Article - Representa un artículo informativo sobre Japón
 */
export class Article {
    /**
     * Identificador único del artículo
     */
    readonly id: string;

    /**
     * Slug único para URLs
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
        topicId: number;
        createdAt: Date;
    }) {
        // Validaciones básicas
        if (!props.id || props.id.trim() === '') {
            throw new Error('El ID del articulo no puede estar vacio');
        }
        if (!props.slug || props.slug.trim() === '') {
            throw new Error('El slug del articulo no puede estar vacio');
        }
        if (!props.name || props.name.trim() === '') {
            throw new Error('El nombre del articulo no puede estar vacio');
        }
        if (props.topicId <= 0) {
            throw new Error('El ID del topic debe ser positivo');
        }

        this.id = props.id;
        this.slug = props.slug;
        this.name = props.name;
        this.info = props.info;
        this.topicId = props.topicId;
        this.createdAt = props.createdAt;
    }
}
