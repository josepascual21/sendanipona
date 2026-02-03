'use client';

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion';
import {
    Rocket,
    Glasses,
    Bot,
    Leaf,
    Brain,
    Activity,
    Baby,
    HeartPulse,
    AlertCircle,
    Info
} from 'lucide-react';

// ============================================================================
// DATOS
// ============================================================================

const CURIOSITIES = [
    {
        icon: <Rocket className="w-6 h-6" />,
        title: "Turismo Espacial",
        text: "Japón explora activamente vuelos espaciales comerciales para un futuro cercano, desarrollando tecnología avanzada."
    },
    {
        icon: <Glasses className="w-6 h-6" />,
        title: "Realidad Aumentada",
        text: "Se espera que Japón lidere el desarrollo de AR/VR, con aplicaciones desde el entretenimiento hasta la educación y medicina."
    },
    {
        icon: <Bot className="w-6 h-6" />,
        title: "Robótica Asistencial",
        text: "Ante el envejecimiento poblacional, robots avanzados ayudarán en la movilidad, compañía y atención médica de ancianos."
    },
    {
        icon: <Leaf className="w-6 h-6" />,
        title: "Sostenibilidad",
        text: "Intensificación de esfuerzos en energías renovables y tecnologías limpias para reducir la dependencia fósil."
    },
    {
        icon: <Brain className="w-6 h-6" />,
        title: "IA Cotidiana",
        text: "La Inteligencia Artificial se integrará en la vida diaria, desde la automatización del hogar hasta servicios personalizados."
    },
];

// ============================================================================
// COMPONENTES
// ============================================================================

/** Navegación lateral */
const NavigationPill = () => (
    <nav className="hidden xl:flex flex-col gap-4 fixed left-10 top-1/2 -translate-y-1/2 z-50">
        {[
            { id: '#introduccion', label: 'Introducción', icon: <Info size={20} /> },
            { id: '#estadisticas', label: 'Estadísticas', icon: <Activity size={20} /> },
            { id: '#curiosidades', label: 'Curiosidades', icon: <Rocket size={20} /> },
        ].map((item) => (
            <Link
                key={item.id}
                href={item.id}
                className="group flex items-center gap-3 bg-slate-900/80 backdrop-blur-md p-3 rounded-full 
                         hover:bg-cyan-600 hover:text-white transition-all duration-300 
                         w-12 hover:w-40 overflow-hidden whitespace-nowrap 
                         border border-slate-700 shadow-lg text-cyan-400"
            >
                <span className="min-w-[20px] flex justify-center">{item.icon}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-sm">
                    {item.label}
                </span>
            </Link>
        ))}
    </nav>
);

/** Título de sección */
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-4xl md:text-5xl font-black mb-12 relative inline-block tracking-tight text-white">
        {children}
        <span className="absolute -bottom-2 right-0 w-24 h-2 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
    </h2>
);

// ============================================================================
// PÁGINA
// ============================================================================

export default function FuturoPage() {
    return (
        <div className="bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500 selection:text-white">
            <NavigationPill />

            {/* ========== HERO SECTION ========== */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
                {/* Placeholder del Banner (Cyberpunk Gradient) */}
                {/* Imagen Banner Futuro */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/articulos/futuro/banner.png"
                        alt="Neo-Tokyo Banner"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-black/50 to-black" />
                </div>

                {/* Título */}
                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-7xl md:text-[10rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 tracking-tighter font-ai-love"
                    >
                        FUTURO
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl md:text-3xl font-light tracking-[0.3em] text-slate-400 uppercase mt-4"
                    >
                        Desafíos, Tecnología y Esperanza
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-widest text-cyan-500/70">Descubre</span>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-500 to-transparent" />
                </motion.div>
            </section>

            <div className="relative z-10">

                {/* ========== SECCIÓN INTRODUCCIÓN ========== */}
                <section id="introduccion" className="py-32 bg-slate-900">
                    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <SectionTitle>¿Qué está por venir?</SectionTitle>
                            <div className="text-lg leading-relaxed text-slate-300 space-y-6 text-justify">
                                <p>
                                    Aunque parezca mentira, se hace difícil hablar del rumbo que está tomando Japón sin remarcar más sus debilidades que sus fortalezas.
                                    Es difícil mirar hacia el futuro de forma puramente optimista, evitando el estereotipo futurista de neones que se nos suele vender.
                                </p>
                                <p>
                                    Su futuro, aunque no se tiñe totalmente de negro, tiene pinceladas de un rumbo desfavorable para el mantenimiento de su sociedad,
                                    visible en las estadísticas de natalidad. Por otra parte, Japón sigue siendo uno de los países más desarrollados tecnológicamente y su avance es imparable.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[60vh] w-full"
                        >
                            {/* Imagen Intro */}
                            <div className="absolute inset-0 bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden">
                                <Image
                                    src="/images/articulos/futuro/intro.png"
                                    alt="Futuro de Japón"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 to-transparent opacity-50" />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ========== SECCIÓN ESTADÍSTICAS ========== */}
                <section id="estadisticas" className="py-32 bg-slate-950 relative overflow-hidden">
                    {/* Background deco */}
                    <div className="absolute top-1/4 left-0 w-full h-[500px] bg-cyan-900/10 -skew-y-6 transform origin-left" />

                    <div className="max-w-6xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-24">
                            <motion.h2
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-black text-white mb-6"
                            >
                                REALIDAD ESTADÍSTICA
                            </motion.h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 mx-auto mb-6"></div>
                        </div>

                        <div className="space-y-24">
                            {/* ESTADÍSTICA 1: NATALIDAD */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="grid md:grid-cols-2 gap-12 items-center bg-slate-900/50 p-8 rounded-3xl border border-slate-800 backdrop-blur-sm"
                            >
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-fuchsia-400 mb-4">
                                        <Baby size={32} />
                                        <h3 className="text-3xl font-bold">Natalidad en Declive</h3>
                                    </div>
                                    <p className="text-slate-300 leading-relaxed">
                                        La tasa de natalidad no ha dejado de decrecer, y los pronósticos no auguran una recuperación temprana.
                                        El índice de fecundidad ha caído por debajo del "2.1", eliminando la "fecundidad de reemplazo".
                                        La pirámide de población se invierte peligrosamente.
                                    </p>
                                </div>
                                <div className="h-64 relative border border-slate-700 rounded-xl overflow-hidden">
                                    <Image
                                        src="/images/articulos/futuro/natalidad.png"
                                        alt="Natalidad y Robótica"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/20 to-transparent" />
                                </div>
                            </motion.div>

                            {/* ESTADÍSTICA 2: ESPERANZA DE VIDA */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="grid md:grid-cols-2 gap-12 items-center bg-slate-900/50 p-8 rounded-3xl border border-slate-800 backdrop-blur-sm md:flex-row-reverse"
                            >
                                <div className="h-64 relative border border-slate-700 rounded-xl overflow-hidden md:order-1 order-2">
                                    <Image
                                        src="/images/articulos/futuro/longevidad.png"
                                        alt="Longevidad y Tecnología"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-bl from-cyan-900/20 to-transparent" />
                                </div>
                                <div className="space-y-6 md:order-2 order-1">
                                    <div className="flex items-center gap-4 text-cyan-400 mb-4">
                                        <HeartPulse size={32} />
                                        <h3 className="text-3xl font-bold">Longevidad Extrema</h3>
                                    </div>
                                    <p className="text-slate-300 leading-relaxed">
                                        Japón encabeza la esperanza de vida mundial gracias a un sistema sanitario eficaz y buenos hábitos.
                                        Sin embargo, sumado a la baja natalidad, resulta en una población cada vez más envejecida que
                                        los jóvenes no podrán sostener económicamente.
                                    </p>
                                </div>
                            </motion.div>

                            {/* ESTADÍSTICA 3: SUICIDIOS */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="grid md:grid-cols-2 gap-12 items-center bg-slate-900/50 p-8 rounded-3xl border border-slate-800 backdrop-blur-sm"
                            >
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-rose-400 mb-4">
                                        <AlertCircle size={32} />
                                        <h3 className="text-3xl font-bold">Salud Mental</h3>
                                    </div>
                                    <p className="text-slate-300 leading-relaxed">
                                        Aunque descendió hasta 2019, la tasa ha vuelto a subir recientemente. Japón se mantiene como uno
                                        de los países con mayor tasa de suicidios. De nada sirve tener la esperanza de vida más alta del mundo
                                        si esa vida no es de calidad.
                                    </p>
                                </div>
                                <div className="h-64 relative border border-slate-700 rounded-xl overflow-hidden">
                                    <Image
                                        src="/images/articulos/futuro/salud_mental.png"
                                        alt="Aislamiento Urbano"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 to-transparent" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ========== SECCIÓN CURIOSIDADES ========== */}
                <section id="curiosidades" className="py-32 bg-black text-slate-300">
                    <div className="max-w-7xl mx-auto px-6">
                        <SectionTitle>Curiosidades del Mañana</SectionTitle>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                            {CURIOSITIES.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="group"
                                >
                                    <div className="mb-6 bg-slate-900 text-cyan-400 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-cyan-900/30 group-hover:text-cyan-300 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.1)] border border-slate-800">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-200 transition-colors">{item.title}</h3>
                                    <p className="text-slate-400 leading-relaxed text-lg border-l-2 border-slate-800 pl-4 group-hover:border-cyan-500 transition-colors">
                                        {item.text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
