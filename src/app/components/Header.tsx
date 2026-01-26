import Link from 'next/link';
import Image from 'next/image';

/**
 * Header Component - Navegación principal del sitio
 * 
 * Incluye:
 * - Logo con link a home
 * - Dropdown de "Apartado Informativo" con artículos por topic
 * - Placeholders para Login/Registro
 */
export default function Header() {
    return (
        <>
            {/* Título principal */}
            <section>
                <h1 className="display-3 m-0 pt-3 text-center fw-bold text-uppercase font-ai-love bg-gradient-to-r from-cyan-400 to-emerald-300">
                    Senda Nipona
                </h1>
            </section>

            {/* Navegación sticky */}
            <header className="sticky top-0 z-50">
                <nav className="navbar-custom backdrop-blur-sm bg-cyan-300/50">
                    <div className="container mx-auto px-8 py-3">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <Link href="/" className="flex-shrink-0">
                                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                    SN
                                </div>
                            </Link>

                            {/* Navegación desktop */}
                            <div className="hidden md:flex items-center space-x-6">
                                {/* Dropdown Apartado Informativo */}
                                <div className="relative group">
                                    <button className="nav-button px-6 py-2 rounded-lg bg-orange-500 text-black font-semibold hover:bg-orange-700 hover:text-white transition-all duration-300">
                                        Apartado informativo
                                        <svg
                                            className="inline-block ml-2 w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Dropdown menu */}
                                    <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                        <div className="bg-orange-500 rounded-lg shadow-lg overflow-hidden">
                                            <Link
                                                href="/articulos/pasado"
                                                className="block px-4 py-3 text-black hover:bg-orange-700 hover:text-white transition-colors duration-200"
                                            >
                                                Estudia su Pasado
                                            </Link>
                                            <Link
                                                href="/articulos/presente"
                                                className="block px-4 py-3 text-black hover:bg-orange-700 hover:text-white transition-colors duration-200"
                                            >
                                                Comprende su Presente
                                            </Link>
                                            <Link
                                                href="/articulos/futuro"
                                                className="block px-4 py-3 text-black hover:bg-orange-700 hover:text-white transition-colors duration-200"
                                            >
                                                Deduce su Futuro
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Login/Registro placeholders */}
                                <Link
                                    href="/login"
                                    className="px-6 py-2 rounded-lg bg-orange-500 text-black font-semibold hover:bg-orange-700 hover:text-white transition-all duration-300"
                                >
                                    Entrar
                                </Link>
                                <Link
                                    href="/registro"
                                    className="px-6 py-2 rounded-lg bg-orange-500 text-black font-semibold hover:bg-orange-700 hover:text-white transition-all duration-300"
                                >
                                    Registrarse
                                </Link>
                            </div>

                            {/* Menú móvil - Toggle button */}
                            <button className="md:hidden p-2 rounded-lg bg-orange-500 text-black hover:bg-orange-700 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        {/* Menú móvil desplegable (se puede implementar estado con Client Component más adelante) */}
                        <div className="md:hidden mt-4 space-y-2 hidden">
                            <div className="bg-orange-500 rounded-lg p-3">
                                <p className="font-semibold mb-2">Apartado informativo</p>
                                <Link href="/articulos/pasado" className="block px-3 py-2 rounded hover:bg-orange-700 hover:text-white">
                                    Estudia su Pasado
                                </Link>
                                <Link href="/articulos/presente" className="block px-3 py-2 rounded hover:bg-orange-700 hover:text-white">
                                    Comprende su Presente
                                </Link>
                                <Link href="/articulos/futuro" className="block px-3 py-2 rounded hover:bg-orange-700 hover:text-white">
                                    Deduce su Futuro
                                </Link>
                            </div>
                            <Link href="/login" className="block px-6 py-2 rounded-lg bg-orange-500 text-center hover:bg-orange-700 hover:text-white">
                                Entrar
                            </Link>
                            <Link href="/registro" className="block px-6 py-2 rounded-lg bg-orange-500 text-center hover:bg-orange-700 hover:text-white">
                                Registrarse
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}
