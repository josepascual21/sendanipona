'use client';

import React from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import {
    PenTool,
    Feather,
    Scroll,
    Droplet,
    Wind,
    Circle,
    Stamp,
    Brush,
    AlignLeft
} from 'lucide-react';
import { NavigationPill, NavigationItem } from '@/components/articles';

// ============================================================================
// CONSTANTES Y DATOS
// ============================================================================

/** Rutas de imágenes (Placeholders) */
const IMAGES = {
    banner: "/images/articulos/shodo/banner.jpg",
    intro: "/images/articulos/shodo/intro.jpg",
    treasures: {
        fude: "/images/articulos/shodo/tesoros/fude.jpg",
        sumi: "/images/articulos/shodo/tesoros/sumi.jpg",
        kami: "/images/articulos/shodo/tesoros/kami.jpg",
        suzuri: "/images/articulos/shodo/tesoros/suzuri.jpg",
    },
    performance: "/images/articulos/shodo/performance.jpg",
};

/** Los Cuatro Tesoros */
const TREASURES = [
    {
        id: "fude",
        title: "Fude (Pincel)",
        desc: "La extensión del brazo y el alma. Hecho de pelo de animal (cabra, lobo, tejón), su flexibilidad permite la infinita variedad de trazos.",
        icon: <Brush className="w-8 h-8" />,
        img: IMAGES.treasures.fude
    },
    {
        id: "sumi",
        title: "Sumi (Tinta)",
        desc: "Hollín de pino y pegamento animal. Sólida en barra, cobra vida al frotarse con agua, creando una gama de negros más profunda que la noche.",
        icon: <Droplet className="w-8 h-8" />,
        img: IMAGES.treasures.sumi
    },
    {
        id: "kami",
        title: "Kami (Papel)",
        desc: "Washi tradicional. Absorbente y vivo, no perdona errores. Cada duda en el trazo queda registrada para siempre en su fibra.",
        icon: <Scroll className="w-8 h-8" />,
        img: IMAGES.treasures.kami
    },
    {
        id: "suzuri",
        title: "Suzuri (Tintero)",
        desc: "Piedra volcánica donde se muele la tinta. Su superficie rugosa es el escenario donde el agua y el hollín se convierten en arte.",
        icon: <Circle className="w-8 h-8" />,
        img: IMAGES.treasures.suzuri
    }
];

/** Estilos de Escritura */
const STYLES = [
    {
        id: "kaisho",
        kanji: "楷書",
        title: "Kaisho",
        subtitle: "Escritura Correcta",
        desc: "Cuadrado, estático, legible. Cada trazo es definido y preciso. Es el estilo que aprenden los principiantes y la base de todo.",
        color: "text-slate-200"
    },
    {
        id: "gyosho",
        kanji: "行書",
        title: "Gyosho",
        subtitle: "Escritura que Viaja",
        desc: "Semicursiva. Los trazos empiezan a conectarse entre sí, fluyendo como el agua. Permite mayor velocidad y expresión personal.",
        color: "text-slate-300"
    },
    {
        id: "sosho",
        kanji: "草書",
        title: "Sosho",
        subtitle: "Escritura de Hierba",
        desc: "Cursiva abstracta. La forma se rompe en favor del flujo de energía (Ki). A menudo ilegible para el ojo no entrenado, es pura emoción.",
        color: "text-slate-400"
    }
];

/** Curiosidades */
const CURIOSITIES = [
    {
        icon: <Wind className="w-6 h-6" />,
        title: "Mushin (No-Mente)",
        text: "El estado ideal para caligrafiar. La mente vacía de pensamientos permite que el Ki fluya directamente al papel sin interferencias."
    },
    {
        icon: <Stamp className="w-6 h-6" />,
        title: "Hanko (El Sello)",
        text: "La firma roja (Inkan) no solo indica autoría, sino que equilibra la composición visual de la obra. Es el 'ojo del dragón'."
    },
    {
        icon: <Feather className="w-6 h-6" />,
        title: "Hitsuzendo",
        text: "El 'Zen del Pincel'. Una práctica donde la caligrafía se usa como meditación para alcanzar la iluminación, más allá de la estética."
    }
];

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

/** Secciones de navegación */
const SECTIONS: NavigationItem[] = [
    { id: '#intro', label: 'El Camino', icon: <PenTool size={20} /> },
    { id: '#tesoros', label: 'Los 4 Tesoros', icon: <AlignLeft size={20} /> },
    { id: '#estilos', label: 'Estilos', icon: <Wind size={20} /> },
    { id: '#performance', label: 'Performance', icon: <Brush size={20} /> },
];

// NavigationPill ahora importado desde @/components/articles

const SectionTitle = ({ children, align = "left", dark = false }: { children: React.ReactNode, align?: "left" | "center" | "right", dark?: boolean }) => (
    <h2 className={`text-4xl md:text-5xl font-black mb-12 relative inline-block tracking-tight 
        ${dark ? "text-slate-900" : "text-white"}
        ${align === "center" ? "mx-auto" : ""}
    `}>
        {children}
        <span className={`absolute -bottom-2 ${align === "right" ? "right-0" : "left-0"} w-24 h-2 bg-red-600`} />
    </h2>
);

// ============================================================================
// PÁGINA PRINCIPAL
// ============================================================================

export default function ShodoPage() {
    return (
        <div className="bg-slate-950 text-slate-300 font-sans selection:bg-red-700 selection:text-white overflow-x-hidden">
            <NavigationPill sections={SECTIONS} accentColor="red" />

            {/* ========== HERO SECTION (100vh) ========== */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <Image src={IMAGES.banner} alt="Banner" fill className="object-cover" />
                    {/* Efecto de tinta sutil en fondo oscuro */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.2 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-slate-800 blur-[100px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        <h1 className="text-8xl md:text-[12rem] leading-none font-black tracking-tighter text-white drop-shadow-2xl">
                            SHODŌ
                        </h1>
                        <span className="block text-5xl md:text-8xl text-red-600 font-serif italic -mt-4 md:-mt-8 z-20 relative mix-blend-screen opacity-90">
                            書道
                        </span>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-xl md:text-3xl font-light mt-12 tracking-[0.5em] text-red-200 uppercase"
                    >
                        El Alma de la Tinta
                    </motion.p>
                </div>

                {/* Sello Rojo Decorativo */}
                <motion.div
                    initial={{ opacity: 0, scale: 2 }}
                    animate={{ opacity: 0.8, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5, type: "spring" }}
                    className="absolute bottom-20 right-10 md:right-20 w-24 h-24 border-4 border-red-700 text-red-700 flex items-center justify-center font-serif font-bold text-4xl transform rotate-12 opacity-80 mix-blend-screen"
                >
                    禅
                </motion.div>

                {/* Indicador de scroll */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-widest text-slate-400">Descubre</span>
                    <div className="w-[1px] h-16 bg-red-600" />
                </motion.div>
            </section>

            {/* ========== INTRO: EL CAMINO (SLATE-950) ========== */}
            <section id="intro" className="py-24 md:py-32 px-6 bg-slate-950 flex items-center text-white">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <SectionTitle>No es solo escribir</SectionTitle>
                        <p className="text-lg text-slate-300 leading-relaxed text-justify mb-6">
                            El <strong>Shodō</strong> (el camino de la escritura) no busca simplemente la legibilidad. Es una disciplina artística y espiritual donde el calígrafo vierte su momento presente en el papel.
                        </p>
                        <p className="text-lg text-slate-300 leading-relaxed text-justify">
                            A diferencia de la pintura occidental, que permite correcciones, el trazo de tinta sobre papel de arroz es <strong className="text-white">irreversible</strong>. Un momento, una oportunidad. Es el registro físico de la energía y el estado mental del artista en ese preciso instante.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
                        whileInView={{ opacity: 1, clipPath: 'inset(0 0 0 0)' }}
                        transition={{ duration: 1, ease: "circOut" }}
                        viewport={{ once: true }}
                        className="relative h-[600px] w-full bg-slate-900 grayscale hover:grayscale-0 transition-all duration-700 rounded-xl overflow-hidden border border-slate-800"
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-bold text-2xl uppercase">
                            {/* Placeholder visual */}
                            <div className="text-center p-8">
                                <span className="block text-9xl mb-4 opacity-20">永</span>
                                <span className="text-sm tracking-widest text-red-500">ETERNIDAD</span>
                            </div>
                        </div>
                        <Image
                            src={IMAGES.intro}
                            alt="Maestro de Shodō"
                            fill
                            className="object-cover opacity-80 mix-blend-overlay"
                        />
                    </motion.div>
                </div>
            </section>

            {/* ========== LOS 4 TESOROS (SLATE-900 - Alternancia A) ========== */}
            <section id="tesoros" className="py-24 md:py-32 bg-slate-900">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <SectionTitle align="center">Bunbou Shihou</SectionTitle>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto mt-6 tracking-wide">
                            "Los Cuatro Tesoros del Estudio". Herramientas sagradas que conectan al artista con el universo.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {TREASURES.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="group relative h-[450px] bg-slate-950 border border-slate-800 overflow-hidden shadow-lg"
                            >
                                {/* Imagen de fondo sutil */}
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    fill
                                    className="object-cover opacity-50 group-hover:opacity-70 transition-all duration-700 grayscale group-hover:scale-105"
                                />

                                {/* Overlay Gradiente */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

                                {/* Contenido */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <div className="mb-4 text-slate-500 group-hover:text-red-500 transition-colors duration-300 transform group-hover:-translate-y-2">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4 border-b border-slate-800 pb-2 group-hover:border-red-600 transition-colors duration-500">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-300 leading-relaxed text-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== ESTILOS (SLATE-950 - Alternancia B) ========== */}
            <section id="estilos" className="py-24 md:py-32 bg-slate-950 relative">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="mb-16">
                        <SectionTitle align="left">Los Tres Estilos</SectionTitle>
                    </div>

                    <div className="flex flex-col gap-12">
                        {STYLES.map((style, index) => (
                            <motion.div
                                key={style.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="flex flex-col md:flex-row items-center gap-12 group p-8 rounded-2xl bg-slate-900/50 border border-slate-900 hover:border-slate-800 transition-colors"
                            >
                                {/* Kanji Grande Visual */}
                                <div className="flex-1 w-full text-center md:text-right md:pr-12 md:border-r border-slate-800 relative">
                                    <span className="text-[8rem] md:text-[12rem] leading-none font-serif text-white opacity-5 group-hover:opacity-20 transition-all duration-700">
                                        {style.kanji}
                                    </span>
                                </div>

                                {/* Texto */}
                                <div className="flex-1">
                                    <h3 className="text-4xl font-black mb-4 flex flex-col md:flex-row md:items-center gap-4 text-white">
                                        {style.title}
                                        <span className="text-sm font-normal text-red-400 font-mono tracking-wider border border-red-900/50 bg-red-900/10 px-3 py-1 rounded w-fit">
                                            {style.subtitle}
                                        </span>
                                    </h3>
                                    <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                                        {style.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== PERFORMANCE (BLACK) ========== */}
            <section id="performance" className="py-32 bg-black relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={IMAGES.performance}
                        alt="Shodo Performance"
                        fill
                        className="object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-3xl"
                    >
                        <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
                            SHODŌ<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                                PERFORMANCE
                            </span>
                        </h2>
                        <p className="text-2xl text-slate-300 leading-relaxed mb-12">
                            En la actualidad, el Shodō ha saltado del escritorio al escenario. Artistas empuñan pinceles gigantes del tamaño de escobas para escribir sobre lienzos de metros de altura, al ritmo de música Taiko o moderna.
                        </p>
                        <p className="text-lg text-slate-400 mb-8 max-w-2xl">
                            Es la fusión definitiva de cuerpo y espíritu: una danza marcial donde el resultado final es tan importante como el movimiento que lo creó.
                            <br /><br />
                            <span className="text-red-500 italic">"El pincel baila, la tinta canta."</span>
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ========== CURIOSIDADES (FINAL stone-950) ========== */}
            <section id="curiosidades" className="py-32 bg-stone-950">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-black mb-16 text-white border-b border-slate-800 pb-8">
                        SECRETOS DEL PINCEL
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                {/* Icono */}
                                <div className="mb-6 bg-slate-900 text-red-500 w-14 h-14 rounded-2xl 
                                            flex items-center justify-center 
                                            group-hover:bg-red-900/30 transition-colors 
                                            border border-slate-800">
                                    {item.icon}
                                </div>

                                {/* Texto */}
                                <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-lg 
                                            border-l-2 border-slate-800 pl-4 
                                            group-hover:border-red-600 transition-colors">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
