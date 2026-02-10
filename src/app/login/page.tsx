'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';

export default function LoginPage() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
                <h1 className="mb-6 text-2xl font-bold text-gray-900">Iniciar Sesión</h1>
                <form action={dispatch} className="space-y-4">
                    <div>
                        <label
                            className="mb-2 block text-sm font-medium text-gray-900"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="tu@email.com"
                            required
                        />
                    </div>
                    <div>
                        <label
                            className="mb-2 block text-sm font-medium text-gray-900"
                            htmlFor="password"
                        >
                            Contraseña
                        </label>
                        <input
                            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                            id="password"
                            type="password"
                            name="password"
                            required
                            minLength={6}
                        />
                    </div>
                    <LoginButton />
                    <div
                        className="flex h-8 items-end space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {errorMessage && (
                            <>
                                <p className="text-sm text-red-500">{errorMessage}</p>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            type="submit"
            aria-disabled={pending}
        >
            {pending ? 'Entrando...' : 'Entrar'}
        </button>
    );
}
