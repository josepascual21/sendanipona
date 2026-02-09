'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

// ============================================================================
// TIPOS
// ============================================================================

export type CardVariant = 'standard' | 'reveal' | 'wide';

import { AccentColor as PillAccentColor } from './NavigationPill';

export type CardAccentColor = PillAccentColor | 'slate' | 'stone';

export interface ContentCardProps {
    /** Título principal de la tarjeta */
    title: string;
    /** Subtítulo o etiqueta pequeña (opcional) */
    subtitle?: string;
    /** Descripción o contenido principal */
    children?: React.ReactNode;
    /** URL de la imagen */
    image: string;
    /** Índice para animaciones escalonadas (stagger) */
    index?: number;
    /** Variante de diseño (default: 'standard') */
    variant?: CardVariant;
    /** Color de acento para bordes y texto */
    accentColor?: CardAccentColor;
    /** Icono opcional junto al título */
    icon?: React.ReactNode;
    /** Elemento extra para renderizar (ej: años, stats) */
    extraContent?: React.ReactNode;
    /** Alineación forzada para cards 'wide' (si no se pasa, usa index para alternar) */
    align?: 'left' | 'right';
    /** Clase opcional para el contenedor */
    className?: string;
}

// ============================================================================
// MAPEO DE COLORES
// ============================================================================

const COLOR_VARIANTS: Record<CardAccentColor, {
    borderHover: string;
    textTitle: string;
    textSubtitle: string;
    shadow: string;
}> = {
    amber: {
        borderHover: 'hover:border-amber-700/50',
        textTitle: 'text-amber-400',
        textSubtitle: 'text-amber-400',
        shadow: 'shadow-amber-900/10'
    },
    indigo: {
        borderHover: 'hover:border-indigo-400/50',
        textTitle: 'text-indigo-400',
        textSubtitle: 'text-indigo-400',
        shadow: 'shadow-indigo-900/10'
    },
    cyan: {
        borderHover: 'hover:border-cyan-500/50',
        textTitle: 'text-cyan-400',
        textSubtitle: 'text-cyan-500',
        shadow: 'shadow-cyan-900/10'
    },
    red: {
        borderHover: 'hover:border-red-600/50',
        textTitle: 'text-red-500',
        textSubtitle: 'text-red-500',
        shadow: 'shadow-red-900/10'
    },
    violet: {
        borderHover: 'hover:border-violet-500/50',
        textTitle: 'text-violet-400',
        textSubtitle: 'text-violet-400',
        shadow: 'shadow-violet-900/10'
    },
    emerald: {
        borderHover: 'hover:border-emerald-500/50',
        textTitle: 'text-emerald-400',
        textSubtitle: 'text-emerald-500',
        shadow: 'shadow-emerald-900/10'
    },
    orange: {
        borderHover: 'hover:border-orange-500/50',
        textTitle: 'text-orange-400',
        textSubtitle: 'text-orange-400',
        shadow: 'shadow-orange-900/10'
    },
    stone: {
        borderHover: 'hover:border-stone-500/50',
        textTitle: 'text-stone-300',
        textSubtitle: 'text-stone-400',
        shadow: 'shadow-stone-900/10'
    },
    slate: {
        borderHover: 'hover:border-slate-500/50',
        textTitle: 'text-slate-300',
        textSubtitle: 'text-slate-400',
        shadow: 'shadow-slate-900/10'
    }
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export const ContentCard: React.FC<ContentCardProps> = ({
    title,
    subtitle,
    children,
    image,
    index = 0,
    variant = 'standard',
    accentColor = 'slate',
    icon,
    extraContent,
    align,
    className = ''
}) => {
    const colors = COLOR_VARIANTS[accentColor] || COLOR_VARIANTS['slate'];

    // ------------------------------------------------------------------------
    // VARIANTE: STANDARD (Vertical, Imagen arriba)
    // Usado en: Pasado, Personajes
    // ------------------------------------------------------------------------
    if (variant === 'standard') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`group bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700/50 overflow-hidden ${colors.borderHover} transition-all duration-300 ${className}`}
            >
                <div className="h-64 relative overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                    {/* Contenido sobre la imagen (opcional) */}
                    {(subtitle || extraContent) && (
                        <div className="absolute bottom-0 left-0 p-5 w-full">
                            <h3 className="text-white font-bold text-xl drop-shadow-md truncate">{title}</h3>
                            {subtitle && (
                                <p className={`${colors.textSubtitle} text-xs font-bold uppercase tracking-wider mt-1`}>
                                    {subtitle}
                                </p>
                            )}
                            {extraContent}
                        </div>
                    )}
                </div>

                {/* Cuerpo del card (Solo si hay children) */}
                {children && (
                    <div className="p-6">
                        {/* Si no hay subtítulo/overlap, mostramos título aquí */}
                        {!(subtitle || extraContent) && (
                            <h3 className={`text-xl font-bold mb-3 flex items-center gap-2 ${colors.textTitle}`}>
                                {icon && <span>{icon}</span>}
                                {title}
                            </h3>
                        )}
                        <div className="text-slate-300 text-base leading-relaxed">
                            {children}
                        </div>
                    </div>
                )}
            </motion.div>
        );
    }

    // ------------------------------------------------------------------------
    // VARIANTE: REVEAL (Hover para ver texto)
    // Usado en: JDM
    // ------------------------------------------------------------------------
    if (variant === 'reveal') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`group relative h-[400px] overflow-hidden bg-slate-800 rounded-lg border border-slate-800 ${colors.borderHover} ${className}`}
            >
                {/* Imagen de fondo completa */}
                <div className="absolute inset-0">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                    <div className="overflow-hidden mb-2">
                        <h3 className="text-3xl font-black text-white uppercase transform translate-y-0 transition-transform duration-300">
                            {title}
                        </h3>
                    </div>
                    {subtitle && (
                        <div className={`flex items-center gap-2 ${colors.textSubtitle} font-mono font-bold mb-4`}>
                            {icon}
                            <span>{subtitle}</span>
                        </div>
                    )}

                    {/* Texto que se revela */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-out">
                        <div className="overflow-hidden">
                            <div className="text-slate-300 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 ease-out leading-relaxed max-w-md pb-2">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    // ------------------------------------------------------------------------
    // VARIANTE: WIDE (Horizontal / Staggered)
    // Usado en: Osaka, Presente
    // ------------------------------------------------------------------------
    if (variant === 'wide') {
        // Determinar orden basado en index o prop align
        const isRightAligned = align === 'right' || (align === undefined && index % 2 === 1);

        return (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`group bg-slate-800/80 backdrop-blur rounded-3xl overflow-hidden shadow-xl border border-slate-700 ${colors.borderHover} transition-all duration-500 ${className}`}
            >
                <div className="grid md:grid-cols-2 items-center h-full">
                    {/* Image Side */}
                    <div className={`relative h-[300px] md:h-full min-h-[300px] w-full overflow-hidden ${isRightAligned ? 'md:order-2' : ''}`}>
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:bg-transparent" />
                    </div>

                    {/* Content Side */}
                    <div className={`p-8 md:p-12 ${isRightAligned ? 'md:order-1' : ''} flex flex-col justify-center`}>
                        <div className="flex items-center gap-4 mb-4">
                            {/* Número opcional si se quiere estilo Osaka, se puede pasar en extraContent o subtitle */}
                            {subtitle && <span className={`text-4xl font-black opacity-30 font-serif ${colors.textTitle}`}>{subtitle}</span>}
                            <h3 className={`text-2xl md:text-3xl font-bold text-white uppercase tracking-tight flex items-center gap-3`}>
                                {icon && <span className={colors.textTitle}>{icon}</span>}
                                {title}
                            </h3>
                        </div>
                        <div className="text-lg text-slate-300 leading-relaxed font-light">
                            {children}
                        </div>
                        {extraContent && <div className="mt-6">{extraContent}</div>}
                    </div>
                </div>
            </motion.div>
        );
    }

    return null;
};

export default ContentCard;
