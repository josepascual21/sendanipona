import { User } from '../entities/User';

/**
 * Interface IUserRepository - Define el contrato para acceder a usuarios
 * 
 * Por ahora solo incluimos operaciones de lectura necesarias para
 * el sistema de comentarios. Se expandirá en la fase de autenticación.
 * 
 * Esta interface pertenece a la capa de dominio y NO debe tener dependencias
 * de infraestructura (Prisma, APIs, etc.).
 */
export interface IUserRepository {
    /**
     * Busca un usuario por su ID único
     * 
     * @param id - ID del usuario (CUID)
     * @returns Promise con la entidad User o null si no existe
     * @example
     * ```ts
     * const user = await repository.findById('clzzz789');
     * if (user) {
     *   console.log(user.username);
     * }
     * ```
     */
    findById(id: string): Promise<User | null>;

    /**
     * Busca un usuario por su email (único)
     * 
     * @param email - Email del usuario
     * @returns Promise con la entidad User o null si no existe
     * @example
     * ```ts
     * const user = await repository.findByEmail('usuario@example.com');
     * if (user) {
     *   console.log(user.id);
     * }
     * ```
     */
    findByEmail(email: string): Promise<User | null>;
}
