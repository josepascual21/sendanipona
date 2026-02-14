'use client';

import React from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import {
    BookOpen,
    Globe,
    Zap,
    Heart,
    Sword,
    Skull,
    Smile,
    PenTool,
    Film,
    Users,
    Layers,
    MessageCircle
} from 'lucide-react';
import { NavigationPill, NavigationItem, SectionTitle, SectionSubtitle, HeroSection, ContentCard, CardAccentColor, CuriositiesSection } from '@/components/articles';
import CommentsSectionWrapper from '@/app/components/comments/CommentsSectionWrapper';

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

const GENRE_ACCENTS: Record<string, CardAccentColor> = {
    shonen: 'cyan',
    shojo: 'red',
    seinen: 'stone',
    josei: 'violet'
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
    { id: '#comentarios', label: 'Comentarios', icon: <MessageCircle size={20} /> },
];

// NavigationPill ahora importado desde @/components/articles

// SectionTitle ahora importado desde @/components/articles

// ============================================================================
// PÁGINA PRINCIPAL
// ============================================================================

export default function AnimePage() {
    return (
        <div className="bg-slate-900 text-slate-200 font-sans selection:bg-violet-600 selection:text-white overflow-x-hidden">
            <NavigationPill sections={SECTIONS} accentColor="violet" />

            {/* ========== HERO SECTION (100vh) ========== */}
            {/* ========== HERO SECTION (100vh) ========== */}
            <HeroSection
                backgroundImage={IMAGES.banner}
                title="ANIME & MANGA"
                titleFont="font-yuji-mai"
                subtitle="El Arte de la Narrativa Japonesa"
                scrollText="Explora"
                accentColor="text-violet-400"
                overlayOpacity={0.5}
                backgroundChildren={
                    <div className="absolute inset-0 bg-violet-900/20 mix-blend-overlay" />
                }
            />

            <div className="relative z-10">

                {/* ========== INTRO: HISTORIA (OSCURO TONO B) ========== */}
                <section id="intro" className="py-24 md:py-32 px-6 bg-slate-900 flex items-center">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <SectionTitle accentColor="bg-violet-600">Del Pergamino<br />a la Pantalla</SectionTitle>
                            <p className="text-lg text-slate-300 leading-relaxed text-justify mb-6">
                                Las raíces del manga se hunden en el siglo XII con los <em>Chōjū-giga</em>, rollos de animales antropomórficos. Sin embargo, fue tras la Segunda Guerra Mundial cuando <strong className="text-violet-400">Osamu Tezuka</strong>, el &quot;Dios del Manga&quot;, revolucionó el medio inspirándose en el cine occidental.
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
                <section id="generos" className="py-24 md:py-32 bg-slate-950">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <SectionTitle accentColor="bg-violet-600" align="center">Demografía y Género</SectionTitle>
                            <SectionSubtitle align="center">
                                A diferencia del cómic occidental, el manga se segmenta principalmente por la demografía del lector, no solo por el contenido temático.
                            </SectionSubtitle>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {GENRES.map((genre, index) => (
                                <ContentCard
                                    key={genre.id}
                                    index={index}
                                    title={genre.title}
                                    image={genre.img}
                                    variant="standard"
                                    accentColor={GENRE_ACCENTS[genre.id] || 'slate'}
                                    icon={genre.icon}
                                >
                                    {genre.desc}
                                </ContentCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== IMPACTO GLOBAL (OSCURO TONO B) ========== */}
                <section id="impacto" className="py-24 md:py-32 bg-slate-900 relative overflow-hidden">
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
                                <SectionTitle accentColor="bg-violet-600">Explosión Global</SectionTitle>
                                <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                                    En los años 80 y 90, obras como <strong className="text-white">Akira</strong> y <strong className="text-white">Ghost in the Shell</strong> rompieron la percepción occidental de que la animación era &quot;solo para niños&quot;.
                                </p>
                                <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                                    Simultáneamente, <strong>Studio Ghibli</strong> elevó el medio a la categoría de bellas artes, ganando el Óscar con <em>El Viaje de Chihiro</em>. Hoy, el anime es una industria multimillonaria y la puerta de entrada principal a la cultura japonesa para millones de personas.
                                </p>
                                <blockquote className="border-l-4 border-violet-600 pl-6 italic text-slate-400 text-xl my-8">
                                    &quot;El anime no es un género, es un medio capaz de contar cualquier historia.&quot;
                                </blockquote>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ========== CURIOSIDADES (FINAL stone-950) ========== */}
                <CuriositiesSection
                    curiosities={CURIOSITIES}
                    accentColor="violet"
                    title="CURIOSIDADES OTAKU"
                />

            </div>

            <CommentsSectionWrapper slug="anime-manga" />
        </div>
    );
}
