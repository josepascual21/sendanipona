'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Constantes de navegación
const ARTICLE_LINKS = [
    { href: '/articulos/pasado', label: 'Estudia su Pasado' },
    { href: '/articulos/presente', label: 'Comprende su Presente' },
    { href: '/articulos/futuro', label: 'Deduce su Futuro' },
] as const;

const AUTH_LINKS = [
    { href: '/login', label: 'Entrar' },
    { href: '/registro', label: 'Registrarse' },
] as const;

const LOGO_DIMENSIONS = { width: 71, height: 79 } as const;

// Estilos reutilizables
const BUTTON_PRIMARY = "px-6 py-2 rounded-lg bg-orange-500 text-black font-semibold hover:bg-orange-700 hover:text-white transition-all duration-300";
const DROPDOWN_LINK = "block px-4 py-3 text-black hover:bg-orange-700 hover:text-white transition-colors duration-200";
const MOBILE_LINK = "block px-3 py-2 rounded hover:bg-orange-700 hover:text-white";

/**
 * Header Component - Navegación principal del sitio
 * 
 * Incluye:
 * - Logo con link a home
 * - Dropdown de "Apartado Informativo" con artículos por topic
 * - Placeholders para Login/Registro
 * - Menú móvil funcional con estado
 */
export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Cerrar menú móvil al redimensionar a desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* Título principal */}
            <section className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-300 pb-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl pt-8 text-center font-bold uppercase font-ai-love text-white drop-shadow-lg">
                    Senda Nipona
                </h1>
            </section>

            {/* Navegación sticky */}
            <header className="sticky top-0 z-50">
                <nav className="backdrop-blur-sm bg-cyan-300/50">
                    <div className="container mx-auto px-8 py-3">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="flex-shrink-0">
                                <Image
                                    src="/images/senda_nipona_logo.png"
                                    alt="Senda Nipona Logo"
                                    width={LOGO_DIMENSIONS.width}
                                    height={LOGO_DIMENSIONS.height}
                                />
                            </Link>

                            {/* Navegación desktop */}
                            <div className="hidden md:flex items-center space-x-6">
                                {/* Dropdown Apartado Informativo */}
                                <div className="relative group">
                                    <button className={BUTTON_PRIMARY + " shadow-md hover:shadow-lg hover:-translate-y-0.5"}>
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
                                            {ARTICLE_LINKS.map(link => (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    className={DROPDOWN_LINK}
                                                >
                                                    {link.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Login/Registro */}
                                {AUTH_LINKS.map(link => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={BUTTON_PRIMARY}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>

                            {/* Menú móvil - Toggle button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg bg-orange-500 text-black hover:bg-orange-700 hover:text-white transition-colors"
                                aria-label="Toggle mobile menu"
                            >
                                {isMobileMenuOpen ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Menú móvil desplegable */}
                        {isMobileMenuOpen && (
                            <div className="md:hidden mt-4 space-y-2 transition-all duration-300 ease-in-out">
                                <div className="bg-orange-500 rounded-lg p-3">
                                    <p className="font-semibold mb-2">Apartado informativo</p>
                                    {ARTICLE_LINKS.map(link => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={MOBILE_LINK}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                                {AUTH_LINKS.map(link => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="block px-6 py-2 rounded-lg bg-orange-500 text-center hover:bg-orange-700 hover:text-white transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>
            </header>
        </>
    );
}

