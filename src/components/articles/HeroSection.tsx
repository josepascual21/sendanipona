'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import { ScrollIndicator } from './ScrollIndicator';

// ============================================================================
// TIPOS
// ============================================================================

export interface HeroSectionProps {
    /** 
     * Ruta de la imagen o objeto importado estático.
     * Se recomienda usar imports estáticos para mejor performance.
     */
    backgroundImage: string | StaticImageData;

    /** 
     * Título principal. 
     * Debe ser un string.
     */
    title: string;

    /** Subtítulo descriptivo */
    subtitle?: string;

    /** 
     * Texto para el indicador de scroll.
     * @default "Descubre"
     */
    scrollText?: string;

    /**
     * Color de acento para el texto (ej: "text-amber-500").
     * @default "text-white"
     */
    accentColor?: string;

    /**
     * Color para la línea del scroll (ej: "bg-amber-500").
     * Si no se da, se intenta inferir del accentColor o usa blanco.
     */
    scrollLineColor?: string;

    /**
     * Opacidad de la imagen de fondo (0 a 1).
     * @default 0.6
     */
    overlayOpacity?: number;

    /**
     * Clase CSS opcional para el contenedor del título.
     */
    titleClassName?: string;

    /**
     * Clase CSS opcional para la fuente del título (ej: "font-serif", "font-ai-love").
     */
    titleFont?: string;

    /**
     * Elementos adicionales superpuestos al fondo (gradientes extra, particulas, etc).
     */
    backgroundChildren?: React.ReactNode;

    /**
     * Elementos adicionales dentro del contenedor principal (por ejemplo, debajo del subtitulo).
     */
    children?: React.ReactNode;
}

// ============================================================================
// COMPONENTE
// ============================================================================

/**
 * HeroSection - Componente estandarizado para la sección inicial de artículos.
 * 
 * Unifica la altura, animaciones de entrada y estructura del fondo, permitiendo
 * personalización del contenido y estilo visual.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
    backgroundImage,
    title,
    subtitle,
    scrollText = "Descubre",
    accentColor = "text-white",
    scrollLineColor,
    overlayOpacity = 0.6,
    titleClassName = "",
    titleFont = "",
    backgroundChildren,
    children
}) => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
            {/* 1. LAYER DE FONDO */}
            <div className="absolute inset-0 z-0">
                {/* Imagen Principal */}
                <div className={`absolute inset-0 w-full h-full`}>
                    {/* Usamos un div con opacity style para controlar la opacidad de la imagen sin afectar el contenedor */}
                    <Image
                        src={backgroundImage}
                        alt="Hero Banner"
                        fill
                        className="object-cover"
                        style={{ opacity: overlayOpacity }}
                        priority
                    />
                </div>

                {/* Gradiente base para legibilidad inferior (siempre presente para consistencia) */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/10 to-slate-900" />

                {/* Overlays personalizados extra */}
                {backgroundChildren}
            </div>

            {/* 2. CONTENIDO PRINCIPAL */}
            <div className="relative z-10 text-center px-4 max-w-7xl mx-auto w-full flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className={`relative ${titleClassName}`}
                >
                    <h1 className={`text-6xl md:text-[8rem] lg:text-[10rem] leading-none font-black text-white tracking-tighter drop-shadow-2xl ${titleFont}`}>
                        {title}
                    </h1>
                </motion.div>

                {subtitle && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        <p className={`text-xl md:text-3xl font-light tracking-[0.3em] uppercase mt-8 drop-shadow-md ${accentColor}`}>
                            {subtitle}
                        </p>
                    </motion.div>
                )}

                {/* Slot para contenido extra bajo el título/subtítulo (ej: botones, sellos) */}
                {children && (
                    <div className="mt-8">
                        {children}
                    </div>
                )}
            </div>

            {/* 3. INDICADOR DE SCROLL ESTANDARIZADO */}
            <ScrollIndicator
                label={scrollText}
                color_class={accentColor}
                delay={1.5}
            />
        </section>
    );
};
