/**
 * Entidad ArticleTopic - Representa una categoría/tema de artículos
 * 
 * Ejemplos: "Historia", "Cultura", "Tecnología"
 */
export class ArticleTopic {
    /**
     * Identificador único del topic
     */
    readonly id: number;
    /**
     * Nombre del topic (único)
     */
    readonly name: string;
    constructor(props: {
        id: number;
        name: string;
    }) {
        // Validaciones básicas
        if (props.id <= 0) {
            throw new Error('ArticleTopic ID debe ser positivo');
        }
        if (!props.name || props.name.trim() === '') {
            throw new Error('ArticleTopic name no puede estar vacio');
        }
        this.id = props.id;
        this.name = props.name;
    }
}