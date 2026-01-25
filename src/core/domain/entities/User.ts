/**
 * Entidad User - Representa un usuario del sistema
 * 
 * Solo incluimos propiedades relevantes para el dominio de artículos/comentarios
 */
export class User {
    /**
     * Identificador único del usuario
     */
    readonly id: string;
    /**
     * Email del usuario (único)
     */
    readonly email: string;
    /**
     * Nombre de usuario
     */
    readonly username: string;
    /**
     * Si el usuario está activo
     */
    readonly isActive: boolean;
    /**
     * Fecha de creación de la cuenta
     */
    readonly createdAt: Date;
    constructor(props: {
        id: string;
        email: string;
        username: string;
        isActive: boolean;
        createdAt: Date;
    }) {
        // Validaciones básicas
        if (!props.id || props.id.trim() === '') {
            throw new Error('ID de usuario no puede estar vacio');
        }
        if (!props.email || props.email.trim() === '') {
            throw new Error('Email de usuario no puede estar vacio');
        }
        if (!props.username || props.username.trim() === '') {
            throw new Error('Nombre de usuario no puede estar vacio');
        }
        if (!this.isValidEmail(props.email)) {
            throw new Error('Email de usuario es invalido');
        }
        this.id = props.id;
        this.email = props.email;
        this.username = props.username;
        this.isActive = props.isActive;
        this.createdAt = props.createdAt;
    }
    /**
     * Validación simple de email
     */
    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}