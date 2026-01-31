'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { APP_METADATA, UI_CONSTANTS } from '@/core/constants/app-constants';

const AUTH_LINKS = [
    { href: '/login', label: 'Entrar' },
    { href: '/registro', label: 'Registrarse' },
] as const;

// Estilos reutilizables
const NAV_LINK_STYLE = "flex items-center gap-1 font-medium text-slate-800 hover:text-orange-600 transition-colors px-3 py-2 rounded-md hover:bg-black/5";
const BUTTON_PRIMARY = "px-5 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5";
const DROPDOWN_LINK = "block px-4 py-2 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200";

const MOBILE_LINK = "block px-4 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors border-b border-transparent hover:border-orange-100";

/**
 * Header Component - Navegación principal del sitio
 * 
 * Incluye:
 * - Logo con link a home
 * - Dropdowns para los 3 primeros topics
 * - Dropdown "Otros temas" para el resto
 * - Placeholders para Login/Registro
 * - Menú móvil funcional con estado
 */
export default function Header({ topics = [] }: { topics?: any[] }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Separar topics: primeros 3 vs el resto
    const mainTopics = topics.slice(0, 3);
    const otherTopics = topics.slice(3);

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
            {/* Navegación sticky */}
            <header className="sticky top-0 z-50 w-full">
                <nav className="backdrop-blur-md bg-cyan-200/80 border-b border-cyan-300/50 shadow-sm transition-all duration-300">
                    <div className="container mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
                                <Image
                                    src={UI_CONSTANTS.logo.src}
                                    alt={UI_CONSTANTS.logo.alt}
                                    width={UI_CONSTANTS.logo.width}
                                    height={UI_CONSTANTS.logo.height}
                                    className="transition-transform group-hover:scale-105"
                                />
                                <span className="font-ai-love text-2xl font-bold text-cyan-950 group-hover:text-orange-600 transition-colors uppercase pt-1">
                                    {APP_METADATA.title}
                                </span>
                            </Link>

                            {/* Navegación desktop */}
                            <div className="hidden md:flex items-center gap-10">
                                {/* Main Topics (primeros 3) */}
                                {mainTopics.map((topic) => (
                                    <div key={topic.id} className="relative group">
                                        <button className={NAV_LINK_STYLE}>
                                            {topic.name}
                                            <svg
                                                className="w-4 h-4 transition-transform group-hover:rotate-180 text-orange-500/70"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {/* Dropdown menu */}
                                        <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pt-2">
                                            <div className="bg-white rounded-xl shadow-xl ring-1 ring-black/5 overflow-hidden py-1">
                                                {topic.articles.map((article: any) => (
                                                    <Link
                                                        key={article.id}
                                                        href={`/articulos/${article.slug}`}
                                                        className={DROPDOWN_LINK}
                                                    >
                                                        {article.name}
                                                    </Link>
                                                ))}
                                                {topic.articles.length === 0 && (
                                                    <span className="block px-4 py-3 text-slate-400 italic text-sm">
                                                        Sin artículos
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Otros Temas (si existen) */}
                                {otherTopics.length > 0 && (
                                    <div className="relative group">
                                        <button className={NAV_LINK_STYLE}>
                                            Otros artículos
                                            <svg
                                                className="w-4 h-4 transition-transform group-hover:rotate-180 text-orange-500/70"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {/* Dropdown menu para Otros Temas */}
                                        <div className="absolute left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pt-2">
                                            <div className="bg-white rounded-xl shadow-xl ring-1 ring-black/5 py-1">
                                                {otherTopics.map((topic) => (
                                                    <div key={topic.id} className="relative group/topic">
                                                        <button className="w-full text-left flex items-center justify-between px-4 py-2 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 rounded-xl">
                                                            <span className="font-medium">{topic.name}</span>
                                                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </button>

                                                        {/* Nested Articles Dropdown (Sub-menu) */}
                                                        <div className="absolute left-full top-0 w-56 opacity-0 invisible group-hover/topic:opacity-100 group-hover/topic:visible transition-all duration-300 pl-1">
                                                            <div className="bg-white rounded-xl shadow-xl ring-1 ring-black/5 overflow-hidden py-1">
                                                                {topic.articles.map((article: any) => (
                                                                    <Link
                                                                        key={article.id}
                                                                        href={`/articulos/${article.slug}`}
                                                                        className={DROPDOWN_LINK}
                                                                    >
                                                                        {article.name}
                                                                    </Link>
                                                                ))}
                                                                {topic.articles.length === 0 && (
                                                                    <span className="block px-4 py-2 text-slate-400 italic text-sm">
                                                                        Sin artículos
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

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
                                className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
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

                        {/* Menú móvil desplegable Moderno */}
                        {isMobileMenuOpen && (
                            <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl overflow-hidden transition-all duration-300 animate-in slide-in-from-top-5">
                                <div className="p-4 space-y-4 max-h-[85vh] overflow-y-auto">
                                    {/* Main Topics Mobile */}
                                    <div className="space-y-1">
                                        {mainTopics.map((topic) => (
                                            <div key={topic.id} className="space-y-1">
                                                <div className="px-4 py-2 font-semibold text-slate-800 bg-slate-50 rounded-lg">
                                                    {topic.name}
                                                </div>
                                                <div className="pl-4 border-l-2 border-slate-100 ml-4 space-y-1">
                                                    {topic.articles.map((article: any) => (
                                                        <Link
                                                            key={article.id}
                                                            href={`/articulos/${article.slug}`}
                                                            className={MOBILE_LINK}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {article.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Other Topics Mobile */}
                                    {otherTopics.length > 0 && (
                                        <div className="pt-2 border-t border-slate-100">
                                            <p className="px-4 py-2 font-bold text-slate-400 text-xs uppercase tracking-wider">Otros temas</p>
                                            {otherTopics.map((topic) => (
                                                <div key={topic.id} className="mb-3">
                                                    <p className="px-4 text-sm font-medium text-slate-600 mb-1">{topic.name}</p>
                                                    <div className="pl-4 border-l-2 border-orange-100 ml-4">
                                                        {topic.articles.map((article: any) => (
                                                            <Link
                                                                key={article.id}
                                                                href={`/articulos/${article.slug}`}
                                                                className="block px-4 py-2 text-sm text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-r-md transition-colors"
                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                            >
                                                                {article.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Auth Links Mobile */}
                                    <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                                        {AUTH_LINKS.map(link => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className="flex items-center justify-center px-4 py-2.5 rounded-lg font-medium transition-all text-sm first:bg-slate-100 first:text-slate-700 first:hover:bg-slate-200 last:bg-orange-500 last:text-white last:hover:bg-orange-600"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </header>
        </>
    );
}

