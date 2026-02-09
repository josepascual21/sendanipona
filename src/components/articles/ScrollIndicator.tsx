'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface ScrollIndicatorProps {
    /** 
     * Texto a mostrar encima de la línea 
     * @default "Explora"
     */
    label?: string;

    /** 
     * Clase de Tailwind para el color del texto y la línea
     * Usar clases como 'text-amber-200', 'text-cyan-400', etc.
     * @default "text-white"
     */
    color_class?: string;

    /**
     * Delay de aparición en segundos
     * @default 2
     */
    delay?: number;
}

/**
 * Indicador de scroll animado para la sección Hero.
 * Muestra un texto vertical y una línea que crece hacia abajo.
 */
export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
    label = "Explora",
    color_class = "text-white",
    delay = 2
}) => {
    // Extraer la clase base de color (ej: text-cyan-400 -> from-cyan-400)
    // Esto es una simplificación, asume que el usuario pasa una clase de texto válida
    const gradientColorClass = color_class.replace('text-', 'from-');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        >
            <span className={`text-xs uppercase tracking-[0.3em] ${color_class} opacity-80`}>
                {label}
            </span>
            <div className={`w-[1px] h-20 bg-gradient-to-b ${gradientColorClass} to-transparent`} />
        </motion.div>
    );
};

export default ScrollIndicator;
