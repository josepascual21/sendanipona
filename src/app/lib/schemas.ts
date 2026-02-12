import { z } from 'zod';

/**
 * Schemas de validación Zod para la frontera de entrada (Server Actions)
 * 
 * Estos schemas validan el input del usuario ANTES de que llegue a los use cases.
 * La validación de formato/esquema pertenece a la capa de presentación (adaptadores),
 * mientras que las reglas de negocio permanecen en el dominio.
 */

/** Schema de validación para el formulario de registro */
export const RegisterSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirmar contraseña debe tener al menos 6 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

/** Tipo inferido del schema de registro */
export type RegisterDTO = z.infer<typeof RegisterSchema>;

/** Schema de validación para el formulario de login */
export const LoginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(1, "La contraseña es requerida"),
});

/** Tipo inferido del schema de login */
export type LoginDTO = z.infer<typeof LoginSchema>;
