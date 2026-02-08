'use client';

import React from 'react';

// ============================================================================
// TIPOS
// ============================================================================

/** Props del componente SectionSubtitle */
export interface SectionSubtitleProps {
    /** Contenido del subtítulo */
    children: React.ReactNode;

    /** Alineación del texto (default: 'left') */
    align?: 'left' | 'center' | 'right';

    /** Variante de color del texto (default: 'muted') */
    variant?: 'muted' | 'light' | 'italic';

    /** Ancho máximo del contenedor (default: '2xl') */
    maxWidth?: 'lg' | 'xl' | '2xl' | '3xl' | 'full';

    /** Clases adicionales */
    className?: string;
}

// ============================================================================
// CONSTANTES
// ============================================================================

/**
 * Clases de alineación para el texto.
 */
const ALIGN_CLASSES: Record<'left' | 'center' | 'right', string> = {
    left: '',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
};

/**
 * Variantes de estilo del subtítulo.
 */
const VARIANT_CLASSES: Record<'muted' | 'light' | 'italic', string> = {
    muted: 'text-slate-400',
    light: 'text-slate-300',
    italic: 'text-slate-400 italic font-light',
};

/**
 * Clases de ancho máximo.
 */
const MAX_WIDTH_CLASSES: Record<'lg' | 'xl' | '2xl' | '3xl' | 'full', string> = {
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    full: '',
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * SectionSubtitle - Subtítulo/descripción estandarizado para acompañar a SectionTitle.
 * 
 * Componente que renderiza una descripción breve debajo del título de sección.
 * Estandariza el tamaño de texto (text-xl) y proporciona variantes de estilo.
 * 
 * @example
 * ```tsx
 * // Uso básico
 * <SectionTitle accentColor="bg-amber-600">El Pasado</SectionTitle>
 * <SectionSubtitle>
 *   Una mirada a la historia ancestral de Japón.
 * </SectionSubtitle>
 * 
 * // Centrado con estilo itálico
 * <SectionTitle align="center">Géneros</SectionTitle>
 * <SectionSubtitle align="center" variant="italic">
 *   "Cada historia encuentra su audiencia perfecta."
 * </SectionSubtitle>
 * ```
 */
export const SectionSubtitle: React.FC<SectionSubtitleProps> = ({
    children,
    align = 'left',
    variant = 'muted',
    maxWidth = '2xl',
    className = '',
}) => {
    const subtitleClasses = [
        'text-xl mt-6 leading-relaxed',
        ALIGN_CLASSES[align],
        VARIANT_CLASSES[variant],
        MAX_WIDTH_CLASSES[maxWidth],
        className,
    ].filter(Boolean).join(' ');

    return (
        <p className={subtitleClasses}>
            {children}
        </p>
    );
};

export default SectionSubtitle;
