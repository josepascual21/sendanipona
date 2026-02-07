'use client';

import React from 'react';

// ============================================================================
// TIPOS
// ============================================================================

/** Colores de acento disponibles para el SectionTitle */
export type SectionAccentColor =
    | 'amber'      // pasado, kioto
    | 'indigo'     // presente
    | 'cyan'       // futuro, tokyo
    | 'red'        // jdm, shodo
    | 'violet'     // anime-manga
    | 'emerald'    // videojuegos
    | 'orange';    // osaka

/** Alineación del título */
export type TitleAlignment = 'left' | 'center' | 'right';

/** Props del componente SectionTitle */
export interface SectionTitleProps {
    /** Contenido del título */
    children: React.ReactNode;
    /** Alineación del título (por defecto: 'left') */
    align?: TitleAlignment;
    /** Color de acento para la barra decorativa (por defecto: 'amber') */
    accentColor?: SectionAccentColor;
    /** Mostrar efecto glow en la barra decorativa (por defecto: false) */
    hasGlow?: boolean;
    /** 
     * Fuente personalizada a aplicar. 
     * Puede ser:
     * - Una variable CSS de Next.js font (ej: 'var(--font-ai-love)')
     * - Nombre de fuente de Google Fonts (ej: 'Playfair Display')
     * - Cualquier valor CSS válido para font-family
     */
    fontFamily?: string;
    /** Usar gradiente en la barra decorativa (por defecto: false) */
    useGradient?: boolean;
    /** Color secundario para el gradiente (si useGradient es true) */
    gradientToColor?: SectionAccentColor;
    /** Texto oscuro en lugar de blanco (por defecto: false) */
    darkText?: boolean;
}

// ============================================================================
// MAPEO DE COLORES
// ============================================================================

/**
 * Mapeo de colores de acento a clases de Tailwind para la barra decorativa.
 */
const ACCENT_BAR_CLASSES: Record<SectionAccentColor, string> = {
    amber: 'bg-amber-600',
    indigo: 'bg-indigo-600',
    cyan: 'bg-cyan-500',
    red: 'bg-red-600',
    violet: 'bg-violet-600',
    emerald: 'bg-emerald-600',
    orange: 'bg-orange-500',
};

/**
 * Mapeo de colores de acento a clases de glow (box-shadow).
 */
const ACCENT_GLOW_CLASSES: Record<SectionAccentColor, string> = {
    amber: 'shadow-[0_0_15px_rgba(217,119,6,0.4)]',
    indigo: 'shadow-[0_0_15px_rgba(79,70,229,0.4)]',
    cyan: 'shadow-[0_0_15px_rgba(0,255,255,0.5)]',
    red: 'shadow-[0_0_15px_rgba(220,38,38,0.4)]',
    violet: 'shadow-[0_0_15px_rgba(139,92,246,0.4)]',
    emerald: 'shadow-[0_0_15px_rgba(16,185,129,0.4)]',
    orange: 'shadow-[0_0_15px_rgba(249,115,22,0.4)]',
};

/**
 * Mapeo de colores para gradientes (clases from-).
 */
const GRADIENT_FROM_CLASSES: Record<SectionAccentColor, string> = {
    amber: 'from-amber-600',
    indigo: 'from-indigo-600',
    cyan: 'from-cyan-500',
    red: 'from-red-600',
    violet: 'from-violet-600',
    emerald: 'from-emerald-600',
    orange: 'from-orange-500',
};

/**
 * Mapeo de colores para gradientes (clases to-).
 */
const GRADIENT_TO_CLASSES: Record<SectionAccentColor, string> = {
    amber: 'to-amber-400',
    indigo: 'to-indigo-400',
    cyan: 'to-cyan-300',
    red: 'to-red-400',
    violet: 'to-violet-400',
    emerald: 'to-lime-500',
    orange: 'to-yellow-400',
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * SectionTitle - Título de sección estilizado para artículos scrollytelling.
 * 
 * Incluye una barra decorativa animada debajo del texto con soporte para
 * múltiples colores de acento, efectos glow, gradientes y fuentes personalizadas.
 * 
 * @example
 * ```tsx
 * // Uso básico
 * <SectionTitle accentColor="amber">El Pasado de Japón</SectionTitle>
 * 
 * // Con glow y centrado
 * <SectionTitle accentColor="cyan" align="center" hasGlow>
 *   Tokyo Cyberpunk
 * </SectionTitle>
 * 
 * // Con fuente personalizada (variable CSS de Next.js)
 * <SectionTitle fontFamily="var(--font-ai-love)" accentColor="amber">
 *   Título Decorativo
 * </SectionTitle>
 * 
 * // Con fuente de Google (ya cargada en el proyecto)
 * <SectionTitle fontFamily="'Playfair Display', serif" accentColor="violet">
 *   Título Elegante
 * </SectionTitle>
 * 
 * // Con gradiente
 * <SectionTitle accentColor="emerald" useGradient gradientToColor="cyan">
 *   Videojuegos
 * </SectionTitle>
 * ```
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({
    children,
    align = 'left',
    accentColor = 'amber',
    hasGlow = false,
    fontFamily,
    useGradient = false,
    gradientToColor,
    darkText = false,
}) => {
    // Clases de alineación para el contenedor
    const alignmentClasses = {
        left: '',
        center: 'mx-auto text-center',
        right: 'ml-auto text-right',
    };

    // Posición de la barra decorativa según alineación
    const barPositionClasses = {
        left: 'left-0',
        center: 'left-1/2 -translate-x-1/2',
        right: 'right-0',
    };

    // Construir clases de la barra decorativa
    const getBarClasses = () => {
        let classes = 'absolute -bottom-2 w-24 h-2 ';

        // Posición
        classes += barPositionClasses[align] + ' ';

        // Color o gradiente
        if (useGradient) {
            const toColor = gradientToColor || accentColor;
            classes += `bg-gradient-to-r ${GRADIENT_FROM_CLASSES[accentColor]} ${GRADIENT_TO_CLASSES[toColor]} `;
        } else {
            classes += ACCENT_BAR_CLASSES[accentColor] + ' ';
        }

        // Glow opcional
        if (hasGlow) {
            classes += ACCENT_GLOW_CLASSES[accentColor];
        }

        return classes;
    };

    // Estilos inline para la fuente personalizada
    const titleStyle: React.CSSProperties = fontFamily
        ? { fontFamily }
        : {};

    return (
        <h2
            className={`
                text-4xl md:text-5xl font-black mb-12 relative inline-block tracking-tight
                ${darkText ? 'text-slate-900' : 'text-white'}
                ${alignmentClasses[align]}
                drop-shadow-md
            `}
            style={titleStyle}
        >
            {children}
            <span className={getBarClasses()} />
        </h2>
    );
};

export default SectionTitle;
