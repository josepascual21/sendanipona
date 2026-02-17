'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CardAccentColor } from './ContentCard';

// ============================================================================
// TIPOS
// ============================================================================

export interface CuriosityItem {
    icon: React.ReactNode;
    title: string;
    text: string;
}

export interface CuriositiesSectionProps {
    /** Lista de curiosidades a mostrar */
    curiosities: CuriosityItem[];
    /** Color de acento para iconos y hovers */
    accentColor?: CardAccentColor;
    /** Título de la sección (default: "CURIOSIDADES") */
    title?: string;
    /** ID para navegación (default: "curiosidades") */
    id?: string;
    /** Clase de fondo personalizada (default: "bg-stone-950") */
    background?: string;
    /** Clases adicionales */
    className?: string;
}

//Map accent colors to specific text/border/bg classes for this component
const ACCENT_STYLES: Record<CardAccentColor, {
    text: string;
    borderNext: string;
    bgIcon: string;
    shadowHover: string;
}> = {
    amber: { text: 'text-amber-500', borderNext: 'group-hover:border-amber-600', bgIcon: 'text-amber-500', shadowHover: 'hover:shadow-amber-900/20' },
    indigo: { text: 'text-indigo-500', borderNext: 'group-hover:border-indigo-600', bgIcon: 'text-indigo-500', shadowHover: 'hover:shadow-indigo-900/20' },
    cyan: { text: 'text-cyan-500', borderNext: 'group-hover:border-cyan-600', bgIcon: 'text-cyan-500', shadowHover: 'hover:shadow-cyan-900/20' },
    red: { text: 'text-red-500', borderNext: 'group-hover:border-red-600', bgIcon: 'text-red-500', shadowHover: 'hover:shadow-red-900/20' },
    violet: { text: 'text-violet-500', borderNext: 'group-hover:border-violet-600', bgIcon: 'text-violet-500', shadowHover: 'hover:shadow-violet-900/20' },
    emerald: { text: 'text-emerald-500', borderNext: 'group-hover:border-emerald-600', bgIcon: 'text-emerald-500', shadowHover: 'hover:shadow-emerald-900/20' },
    orange: { text: 'text-orange-500', borderNext: 'group-hover:border-orange-600', bgIcon: 'text-orange-500', shadowHover: 'hover:shadow-orange-900/20' },
    stone: { text: 'text-stone-400', borderNext: 'group-hover:border-stone-500', bgIcon: 'text-stone-400', shadowHover: 'hover:shadow-stone-900/20' },
    slate: { text: 'text-slate-400', borderNext: 'group-hover:border-slate-500', bgIcon: 'text-slate-400', shadowHover: 'hover:shadow-slate-900/20' },
};

// ============================================================================
// COMPONENTE
// ============================================================================

export const CuriositiesSection: React.FC<CuriositiesSectionProps> = ({
    curiosities,
    accentColor = 'slate',
    title = 'CURIOSIDADES',
    id = 'curiosidades',
    background = 'bg-stone-950',
    className = ''
}) => {
    const styles = ACCENT_STYLES[accentColor] || ACCENT_STYLES.slate;
    const separatorColor = styles.text.replace('text-', 'bg-'); // bg-color-500 approx

    return (
        <section id={id} className={`py-32 ${background} relative overflow-hidden ${className}`}>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black mb-16 text-white text-center"
                >
                    {title}
                    <span className={`block w-24 h-1 ${separatorColor} mx-auto mt-4`} />
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {curiosities.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.2 }}
                            whileHover={{ y: -5 }}
                            className={`group bg-stone-900/40 backdrop-blur-md border border-stone-800 p-8 rounded-2xl hover:bg-stone-800 transition-all duration-300 hover:shadow-2xl ${styles.shadowHover}`}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.2 }}
                                className={`mb-6 bg-stone-950 ${styles.bgIcon} w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 border border-stone-800 shadow-inner`}
                            >
                                {item.icon}
                            </motion.div>
                            <h3 className={`text-xl font-bold mb-4 text-stone-100 group-hover:${styles.text.replace('text-', 'text-').replace('-500', '-300').replace('-400', '-300')} transition-colors`}>
                                {item.title}
                            </h3>
                            <p className={`text-stone-400 leading-relaxed text-lg border-l-2 border-stone-800 pl-4 ${styles.borderNext} transition-colors`}>
                                {item.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CuriositiesSection;
