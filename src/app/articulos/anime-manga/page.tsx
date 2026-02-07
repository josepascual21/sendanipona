'use client';

import React from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import {
    BookOpen,
    Tv,
    Globe,
    Zap,
    Heart,
    Sword,
    Skull,
    Smile,
    PenTool,
    Film,
    Users,
    Layers
} from 'lucide-react';
import { NavigationPill, NavigationItem } from '@/components/articles';

// ============================================================================
// CONSTANTES Y DATOS
// ============================================================================

/** Rutas de imágenes (Placeholders) */
const IMAGES = {
    banner: "/images/articulos/anime/banner.jpg",
    intro: "/images/articulos/anime/intro.jpg",
    ghibli: "/images/articulos/anime/ghibli.jpg",
    akira: "/images/articulos/anime/akira.jpg",
    genre_shonen: "/images/articulos/anime/shonen.jpg",
    genre_shojo: "/images/articulos/anime/shojo.jpg",
    genre_seinen: "/images/articulos/anime/seinen.jpg",
    genre_josei: "/images/articulos/anime/josei.jpg"
};

/** Datos de Géneros */
const GENRES = [
    {
        id: "shonen",
        title: "Shōnen",
        desc: "Dirigido a jóvenes adolescentes. Acción, amistad y superación personal son sus pilares fundamentales.",
        color: "text-blue-400",
        icon: <Sword className="w-6 h-6" />,
        img: IMAGES.genre_shonen
    },
    {
        id: "shojo",
        title: "Shōjo",
        desc: "Enfocado en el público femenino joven. Prioriza las relaciones humanas, el romance y el drama emocional.",
        color: "text-pink-400",
        icon: <Heart className="w-6 h-6" />,
        img: IMAGES.genre_shojo
    },
    {
        id: "seinen",
        title: "Seinen",
        desc: "Manga para adultos jóvenes. Temas más complejos, realismo, política y violencia psicológica.",
        color: "text-stone-400",
        icon: <Skull className="w-6 h-6" />,
        img: IMAGES.genre_seinen
    },
    {
        id: "josei",
        title: "Josei",
        desc: "El equivalente adulto del Shōjo. Historias de vida cotidiana, romances realistas y desafíos laborales.",
        color: "text-violet-400",
        icon: <Smile className="w-6 h-6" />,
        img: IMAGES.genre_josei
    }
];

/** Curiosidades Anime/Manga */
const CURIOSITIES = [
    {
        icon: <Layers className="w-6 h-6" />,
        title: "Consumo de Papel",
        text: "En Japón se usa más papel para imprimir manga que para fabricar papel higiénico. Una industria masiva."
    },
    {
        icon: <Film className="w-6 h-6" />,
        title: "Sazae-san",
        text: "El anime más largo de la historia, en emisión desde 1969 con más de 7500 episodios, superando a Los Simpson."
    },
    {
        icon: <PenTool className="w-6 h-6" />,
        title: "Trabajo Artesanal",
        text: "A pesar de la tecnología, muchos mangakas siguen dibujando a mano con plumilla G y tinta negra tradicional."
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: "Comiket",
        text: "La convención de cómics más grande del mundo se celebra en Tokio, reuniendo a más de medio millón de personas."
    },
    {
        icon: <Globe className="w-6 h-6" />,
        title: "Soft Power",
        text: "El gobierno japonés considera al anime una herramienta clave de diplomacia cultural y 'Cool Japan'."
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Astro Boy",
        text: "La serie de 1963 de Osamu Tezuka estableció el estándar estético de los 'ojos grandes' y la animación limitada."
    }
];

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

/** Secciones de navegación */
const SECTIONS: NavigationItem[] = [
    { id: '#intro', label: 'Historia', icon: <BookOpen size={20} /> },
    { id: '#generos', label: 'Géneros', icon: <Layers size={20} /> },
    { id: '#impacto', label: 'Impacto Global', icon: <Globe size={20} /> },
    { id: '#curiosidades', label: 'Curiosidades', icon: <Zap size={20} /> },
];

// NavigationPill ahora importado desde @/components/articles

const SectionTitle = ({ children, align = "left" }: { children: React.ReactNode, align?: "left" | "center" | "right" }) => (
    <h2 className={`text-4xl md:text-5xl font-black mb-12 relative inline-block tracking-tight text-white
        ${align === "center" ? "mx-auto" : ""}
    `}>
        {children}
        <span className={`absolute -bottom-2 ${align === "right" ? "right-0" : "left-0"} w-24 h-2 bg-violet-600`} />
    </h2>
);

// ============================================================================
// PÁGINA PRINCIPAL
// ============================================================================

export default function AnimePage() {
    return (
        <div className="bg-slate-900 text-slate-300 font-sans selection:bg-violet-600 selection:text-white overflow-x-hidden">
            <NavigationPill sections={SECTIONS} accentColor="violet" />

            {/* ========== HERO SECTION (100vh) ========== */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900" />
                    {/* Placeholder de fondo - Idealmente una imagen vibrante tipo cyberpunk o collage manga */}
                    <div className="w-full h-full opacity-50 bg-[url('/images/articulos/anime/banner.jpg')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-violet-900/20 mix-blend-overlay" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 className="text-7xl md:text-[10rem] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b drop-shadow-2xl">
                            ANIME
                            <span className="block text-4xl md:text-7xl stroke-text text-violet-500 mt-2 font-serif italic">
                                &
                            </span>
                            MANGA
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl md:text-3xl font-light mt-8 tracking-[0.3em] text-violet-200 uppercase"
                    >
                        El Arte de la Narrativa Japonesa
                    </motion.p>
                </div>

                {/* Indicador de scroll */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-widest">Explora</span>
                    <div className="w-[1px] h-16 bg-violet-600 shadow-[0_0_10px_#7c3aed]" />
                </motion.div>
            </section>

            {/* ========== INTRO: HISTORIA (OSCURO TONO B) ========== */}
            <section id="intro" className="py-24 md:py-32 px-6 bg-slate-950 flex items-center">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <SectionTitle>Del Pergamino<br />a la Pantalla</SectionTitle>
                        <p className="text-lg text-slate-300 leading-relaxed text-justify mb-6">
                            Las raíces del manga se hunden en el siglo XII con los <em>Chōjū-giga</em>, rollos de animales antropomórficos. Sin embargo, fue tras la Segunda Guerra Mundial cuando <strong className="text-violet-400">Osamu Tezuka</strong>, el "Dios del Manga", revolucionó el medio inspirándose en el cine occidental.
                        </p>
                        <p className="text-lg text-slate-300 leading-relaxed text-justify">
                            Tezuka introdujo técnicas cinematográficas (planos, ángulos, ritmo) en el papel, creando el lenguaje visual dinámico que hoy reconocemos universalmente. De ahí nació el anime, llevando esas historias estáticas al movimiento fluido de la animación televisiva.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[500px] w-full bg-slate-900 rounded-sm overflow-hidden shadow-2xl border border-slate-800 group"
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-bold text-2xl uppercase opacity-20">
                            Intro Image (Tezuka/History)
                        </div>
                        <Image
                            src={IMAGES.intro}
                            alt="Historia del Manga"
                            fill
                            className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    </motion.div>
                </div>
            </section>

            {/* ========== GÉNEROS (OSCURO TONO A) ========== */}
            <section id="generos" className="py-24 md:py-32 bg-slate-900">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <SectionTitle align="center">Demografía y Género</SectionTitle>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto mt-6">
                            A diferencia del cómic occidental, el manga se segmenta principalmente por la demografía del lector, no solo por el contenido temático.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {GENRES.map((genre, index) => (
                            <motion.div
                                key={genre.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 hover:border-violet-500/50 transition-all duration-300 group"
                            >
                                <div className="h-48 relative overflow-hidden bg-slate-900">
                                    <Image
                                        src={genre.img}
                                        alt={genre.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-800 to-transparent" />
                                    <div className="absolute top-4 right-4 bg-slate-900/80 p-2 rounded-full text-white backdrop-blur-sm">
                                        {genre.icon}
                                    </div>
                                </div>
                                <div className="p-6 relative">
                                    <h3 className={`text-2xl font-bold mb-3 ${genre.color}`}>{genre.title}</h3>
                                    <p className="text-slate-300 text-base leading-relaxed">
                                        {genre.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== IMPACTO GLOBAL (OSCURO TONO B) ========== */}
            <section id="impacto" className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative h-[600px] rounded-lg overflow-hidden shadow-2xl border-2 border-slate-800"
                        >
                            <Image
                                src={IMAGES.akira}
                                alt="Akira Neo Tokyo"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-violet-900/20 mix-blend-multiply" />
                            <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black via-black/70 to-transparent">
                                <h3 className="text-3xl font-black text-white px-2 border-l-4 border-violet-500">
                                    NEO TOKYO
                                </h3>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <SectionTitle>Explosión Global</SectionTitle>
                            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                                En los años 80 y 90, obras como <strong className="text-white">Akira</strong> y <strong className="text-white">Ghost in the Shell</strong> rompieron la percepción occidental de que la animación era "solo para niños".
                            </p>
                            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                                Simultáneamente, <strong>Studio Ghibli</strong> elevó el medio a la categoría de bellas artes, ganando el Óscar con <em>El Viaje de Chihiro</em>. Hoy, el anime es una industria multimillonaria y la puerta de entrada principal a la cultura japonesa para millones de personas.
                            </p>
                            <blockquote className="border-l-4 border-violet-600 pl-6 italic text-slate-400 text-xl my-8">
                                "El anime no es un género, es un medio capaz de contar cualquier historia."
                            </blockquote>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ========== CURIOSIDADES (FINAL stone-950) ========== */}
            <section id="curiosidades" className="py-32 bg-stone-950 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black mb-16 text-white text-center"
                    >
                        CURIOSIDADES OTAKU
                        <span className="block w-24 h-1 bg-violet-600 mx-auto mt-4" />
                    </motion.h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {CURIOSITIES.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group bg-stone-900/40 backdrop-blur-md border border-stone-800 p-8 rounded-2xl hover:bg-stone-800 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/20"
                            >
                                <div className="mb-6 bg-stone-950 text-violet-500 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-stone-800 shadow-inner">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-stone-100 group-hover:text-violet-300 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-stone-400 leading-relaxed text-lg border-l-2 border-stone-800 pl-4 group-hover:border-violet-600 transition-colors">
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
