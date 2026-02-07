'use client';

import React from 'react';
import Link from 'next/link';

// ============================================================================
// TIPOS
// ============================================================================

/** Elemento de navegación para el pill flotante */
export interface NavigationItem {
    /** ID del anchor (ej: '#intro') */
    id: string;
    /** Etiqueta visible al expandir */
    label: string;
    /** Icono de Lucide React */
    icon: React.ReactNode;
}

/** Colores de acento disponibles para el NavigationPill */
export type AccentColor = 
    | 'amber'      // pasado, kioto
    | 'indigo'     // presente
    | 'cyan'       // futuro, tokyo
    | 'red'        // jdm, shodo
    | 'violet'     // anime-manga
    | 'emerald'    // videojuegos
    | 'orange';    // osaka

/** Props del componente NavigationPill */
export interface NavigationPillProps {
    /** Array de secciones de navegación */
    sections: NavigationItem[];
    /** Color de acento para el hover (por defecto: 'amber') */
    accentColor?: AccentColor;
}

// ============================================================================
// MAPEO DE COLORES
// ============================================================================

/**
 * Mapeo de colores de acento a clases de Tailwind para hover.
 * Se usan variantes con suficiente contraste sobre fondo blanco.
 */
const ACCENT_HOVER_CLASSES: Record<AccentColor, string> = {
    amber:   'hover:bg-amber-700',
    indigo:  'hover:bg-indigo-700',
    cyan:    'hover:bg-cyan-600',
    red:     'hover:bg-red-700',
    violet:  'hover:bg-violet-700',
    emerald: 'hover:bg-emerald-600',
    orange:  'hover:bg-orange-500',
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * NavigationPill - Navegación flotante lateral para artículos scrollytelling.
 * 
 * Se posiciona fija en el lado izquierdo de la pantalla (solo visible en XL+).
 * Cada elemento se expande al hacer hover mostrando la etiqueta.
 * 
 * @example
 * ```tsx
 * import { NavigationPill } from '@/components/articles/NavigationPill';
 * import { History, Users, BookOpen } from 'lucide-react';
 * 
 * const sections = [
 *   { id: '#intro', label: 'Introducción', icon: <History size={20} /> },
 *   { id: '#personajes', label: 'Personajes', icon: <Users size={20} /> },
 *   { id: '#curiosidades', label: 'Curiosidades', icon: <BookOpen size={20} /> },
 * ];
 * 
 * <NavigationPill sections={sections} accentColor="amber" />
 * ```
 */
export const NavigationPill: React.FC<NavigationPillProps> = ({ 
    sections, 
    accentColor = 'amber' 
}) => {
    // Obtener la clase de hover según el color de acento
    const hoverClass = ACCENT_HOVER_CLASSES[accentColor];

    return (
        <nav 
            className="hidden xl:flex flex-col gap-4 fixed left-10 top-1/2 -translate-y-1/2 z-50"
            aria-label="Navegación de secciones"
        >
            {sections.map((item) => (
                <Link
                    key={item.id}
                    href={item.id}
                    className={`
                        group flex items-center gap-3 
                        bg-white/90 backdrop-blur-md p-3 rounded-full 
                        ${hoverClass} hover:text-white 
                        transition-all duration-300 
                        w-12 hover:w-40 overflow-hidden whitespace-nowrap 
                        border border-slate-200 shadow-lg text-slate-700
                    `}
                >
                    {/* Icono siempre visible */}
                    <span className="min-w-[20px] flex justify-center">
                        {item.icon}
                    </span>
                    
                    {/* Etiqueta visible solo en hover */}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-sm">
                        {item.label}
                    </span>
                </Link>
            ))}
        </nav>
    );
};

export default NavigationPill;
