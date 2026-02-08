'use client';

import React from 'react';

// ============================================================================
// TIPOS
// ============================================================================

/** Tamaños predefinidos para el título */
export type TitleSize = 'sm' | 'md' | 'lg' | 'xl';

/** Alineación del título */
export type TitleAlignment = 'left' | 'center' | 'right';

/** Props del componente SectionTitle */
export interface SectionTitleProps {
    /** Contenido del título */
    children: React.ReactNode;

    /** 
     * Clase(s) de Tailwind para el color de fondo de la barra decorativa.
     * Acepta cualquier clase válida de Tailwind para background.
     * @example "bg-amber-600"
     * @example "bg-gradient-to-r from-emerald-500 to-cyan-400"
     * @example "bg-red-800"
     * @default "bg-amber-600"
     */
    accentColor?: string;

    /** Alineación del título (default: 'left') */
    align?: TitleAlignment;

    /** Tamaño del título (default: 'lg') */
    size?: TitleSize;

    /** 
     * Clase(s) de Tailwind para el efecto glow/shadow de la barra.
     * @example "shadow-[0_0_15px_rgba(217,119,6,0.4)]"
     */
    glowEffect?: string;

    /** 
     * Fuente personalizada a aplicar al título.
     * Puede ser una variable CSS de Next.js font o cualquier font-family válido.
     * @example "var(--font-ai-love)"
     * @example "'Playfair Display', serif"
     */
    fontFamily?: string;

    /** Texto oscuro en lugar de blanco (default: false) */
    darkText?: boolean;

    /** Clases adicionales para el contenedor h2 */
    className?: string;
}

// ============================================================================
// CONSTANTES
// ============================================================================

/**
 * Mapeo de tamaños a clases de Tailwind.
 * Define tipografía responsive consistente para cada tamaño.
 */
const SIZE_CLASSES: Record<TitleSize, string> = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl',
    xl: 'text-5xl md:text-6xl',
};

/**
 * Mapeo de alineación a clases de Tailwind para el contenedor.
 */
const ALIGNMENT_CONTAINER_CLASSES: Record<TitleAlignment, string> = {
    left: '',
    center: 'mx-auto text-center',
    right: 'ml-auto text-right',
};

/**
 * Mapeo de alineación a posición de la barra decorativa.
 */
const BAR_POSITION_CLASSES: Record<TitleAlignment, string> = {
    left: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    right: 'right-0',
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * SectionTitle - Título de sección estilizado para artículos scrollytelling.
 * 
 * Componente reutilizable que renderiza un título con una barra decorativa
 * animada debajo. Soporta tamaños estandarizados, alineación, colores
 * personalizados mediante clases Tailwind y fuentes custom.
 * 
 * @example
 * ```tsx
 * // Uso básico
 * <SectionTitle accentColor="bg-amber-600">El Pasado de Japón</SectionTitle>
 * 
 * // Con tamaño y alineación
 * <SectionTitle size="xl" align="center" accentColor="bg-cyan-500">
 *   Tokyo
 * </SectionTitle>
 * 
 * // Con gradiente y glow
 * <SectionTitle 
 *   accentColor="bg-gradient-to-r from-emerald-500 to-lime-400"
 *   glowEffect="shadow-[0_0_15px_rgba(16,185,129,0.4)]"
 * >
 *   Videojuegos
 * </SectionTitle>
 * 
 * // Con fuente personalizada
 * <SectionTitle fontFamily="var(--font-ai-love)" accentColor="bg-violet-600">
 *   Título Artístico
 * </SectionTitle>
 * ```
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({
    children,
    accentColor = 'bg-amber-600',
    align = 'left',
    size = 'lg',
    glowEffect,
    fontFamily,
    darkText = false,
    className = '',
}) => {
    // Construir clases del título
    const titleClasses = [
        SIZE_CLASSES[size],
        'font-black mb-12 relative inline-block tracking-tight drop-shadow-md',
        darkText ? 'text-slate-900' : 'text-white',
        ALIGNMENT_CONTAINER_CLASSES[align],
        className,
    ].filter(Boolean).join(' ');

    // Construir clases de la barra decorativa
    const barClasses = [
        'absolute -bottom-2 w-24 h-2',
        BAR_POSITION_CLASSES[align],
        accentColor,
        glowEffect,
    ].filter(Boolean).join(' ');

    // Estilos inline para la fuente personalizada
    const titleStyle: React.CSSProperties = fontFamily
        ? { fontFamily }
        : {};

    return (
        <h2 className={titleClasses} style={titleStyle}>
            {children}
            <span className={barClasses} />
        </h2>
    );
};

export default SectionTitle;
