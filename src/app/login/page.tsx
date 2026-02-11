'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import Link from 'next/link';

/**
 * Página de Login - Permite a los usuarios autenticarse.
 * Diseño oscuro premium consistente con el tema de la aplicación.
 */
export default function LoginPage() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
            <div className="w-full max-w-md space-y-8 bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-2xl">
                {/* Encabezado */}
                <div className="text-center">
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-white font-ai-love">
                        Iniciar Sesión
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Bienvenido de nuevo
                    </p>
                </div>

                {/* Formulario */}
                <form action={dispatch} className="mt-8 space-y-6">
                    <div className="space-y-4 rounded-md shadow-sm">
                        {/* Campo de email */}
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full rounded-lg border-0 bg-white/5 py-3 px-4 text-white ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 transition-all"
                                placeholder="Correo electrónico"
                            />
                        </div>
                        {/* Campo de contraseña */}
                        <div>
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                minLength={6}
                                className="relative block w-full rounded-lg border-0 bg-white/5 py-3 px-4 text-white ring-1 ring-inset ring-white/10 placeholder:text-slate-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 transition-all"
                                placeholder="Contraseña"
                            />
                        </div>
                    </div>

                    {/* Mensaje de error */}
                    {errorMessage && (
                        <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                            <p className="text-sm text-red-500 font-medium bg-red-500/10 px-3 py-1 rounded-md border border-red-500/20 w-full text-center">
                                {errorMessage}
                            </p>
                        </div>
                    )}

                    <LoginButton />
                </form>

                {/* Enlace a registro */}
                <div className="text-center text-sm">
                    <span className="text-slate-400">¿No tienes cuenta? </span>
                    <Link href="/registro" className="font-medium text-orange-500 hover:text-orange-400 transition-colors">
                        Regístrate aquí
                    </Link>
                </div>
            </div>
        </div>
    );
}

/**
 * Botón de login con estado de carga y spinner animado.
 * Se deshabilita durante el envío para evitar submits múltiples.
 */
function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className="group relative flex w-full justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:from-orange-400 hover:to-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 transition-all duration-300 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            aria-disabled={pending}
            disabled={pending}
        >
            {pending ? (
                <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Entrando...
                </div>
            ) : (
                'Entrar'
            )}
        </button>
    );
}
