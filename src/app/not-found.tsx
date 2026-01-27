import Link from 'next/link';

/**
 * Página 404 personalizada
 * Se muestra cuando el usuario intenta acceder a una ruta que no existe
 */
export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center">
                {/* Código de error */}
                <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-300 mb-4">
                    404
                </h1>

                {/* Mensaje principal */}
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    Página no encontrada
                </h2>

                {/* Descripción */}
                <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                    Lo sentimos, la página que buscas no existe o ha sido movida.
                </p>

                {/* Botón de regreso */}
                <Link
                    href="/"
                    className="inline-block px-8 py-3 rounded-lg bg-orange-500 text-black font-semibold hover:bg-orange-700 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                    Volver al inicio
                </Link>

                {/* Decoración japonesa */}
                <div className="mt-12 text-6xl opacity-20">
                    🏯
                </div>
            </div>
        </div>
    );
}
