/**
 * Error de dominio para validaciones de entidades.
 * 
 * Se lanza cuando una entidad recibe datos inválidos en su constructor.
 * Permite identificar el nombre de la entidad y el motivo del fallo.
 */
export class InvalidEntityError extends Error {
    /** Nombre de la entidad que falló la validación */
    readonly entityName: string;

    constructor(entityName: string, reason: string) {
        super(reason);
        this.name = 'InvalidEntityError';
        this.entityName = entityName;
    }
}
