'use client';

import React from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import {
    Ghost,
    Wind,
    Sun,
    Moon,
    Fan,
    Flower2,
    Mountain,
    ScrollText,
    Star,
    MessageCircle
} from 'lucide-react';
import { NavigationPill, NavigationItem, SectionTitle, SectionSubtitle, HeroSection, CuriositiesSection } from '@/components/articles';
import CommentsSectionWrapper from '@/app/components/comments/CommentsSectionWrapper';

// ============================================================================
// DATOS & CONSTANTES
// ============================================================================

const SECTIONS: NavigationItem[] = [
    { id: '#intro', label: 'Eternidad', icon: <ScrollText size={20} /> },
    { id: '#gion', label: 'Gion', icon: <Fan size={20} /> },
    { id: '#arashiyama', label: 'Naturaleza', icon: <Wind size={20} /> },
    { id: '#kinkakuji', label: 'Perfección', icon: <Sun size={20} /> },
    { id: '#curiosidades', label: 'Curiosidades', icon: <Star size={20} /> },
    { id: '#comentarios', label: 'Comentarios', icon: <MessageCircle size={20} /> },
];

const IMAGES = {
    banner: "/images/articulos/kioto/banner.jpg",
    intro: "/images/articulos/kioto/intro.jpg",
    gion: "/images/articulos/kioto/gion.jpg",
    bamboo: "/images/articulos/kioto/bamboo.jpg",
    kinkakuji: "/images/articulos/kioto/kinkakuji.jpg",
}

const CURIOSITIES = [
    {
        icon: <Ghost className="w-6 h-6" />,
        title: "No Fotos a Geishas",
        text: "Desde 2019, está prohibido fotografiar a las Geishas y Maikos en las calles privadas de Gion bajo multa."
    },
    {
        icon: <Fan className="w-6 h-6" />,
        title: "Omotenashi",
        text: "La hospitalidad llevada al extremo. Anticiparse a las necesidades del invitado antes de que él mismo las sepa."
    },
    {
        icon: <Flower2 className="w-6 h-6" />,
        title: "Kaiseki",
        text: "La alta cocina de Kioto. Pequeños platos de temporada servidos en un orden específico, valorando tanto la estética como el sabor."
    },
    {
        icon: <ScrollText className="w-6 h-6" />,
        title: "Kioto-ben",
        text: "El dialecto de Kioto es suave, elegante y cortés, herencia de su pasado como sede de la corte imperial."
    },
    {
        icon: <Mountain className="w-6 h-6" />,
        title: "1600 Templos",
        text: "La ciudad alberga más de 1600 templos budistas y 400 santuarios sintoístas. Una vida no basta para verlos todos."
    },
    {
        icon: <Moon className="w-6 h-6" />,
        title: "Machiya",
        text: "Las casas tradicionales de madera, estrechas y profundas, conocidas como 'nidos de anguilas', definen el paisaje urbano."
    },
];

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

// NavigationPill ahora importado desde @/components/articles

// SectionTitle ahora importado desde @/components/articles

// ============================================================================
// PÁGINA PRINCIPAL
// ============================================================================

export default function KyotoPage() {
    return (
        <div className="bg-slate-900 text-slate-200 font-sans selection:bg-amber-700 selection:text-white overflow-x-hidden">
            <NavigationPill sections={SECTIONS} accentColor="amber" />

            {/* ========== HERO SECTION (100vh) ========== */}
            {/* ========== HERO SECTION (100vh) ========== */}
            <HeroSection
                backgroundImage={IMAGES.banner}
                title="KIOTO"
                titleFont="font-serif"
                subtitle="La Capital Eterna"
                scrollText="Silencio"
                accentColor="text-amber-200"
                backgroundChildren={
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-slate-900/90" />
                }
            />

            <div className="relative z-10">

                {/* ========== INTRO (Dark Tone B: slate-950) ========== */}
                <section id="intro" className="py-24 md:py-32 bg-slate-900 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-900/5 rounded-full blur-[100px] pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <SectionTitle accentColor="bg-amber-600" glowEffect="shadow-[0_0_15px_rgba(217,119,6,0.3)]">El Tiempo Detenido</SectionTitle>
                            <div className="space-y-6 text-lg md:text-xl leading-relaxed text-slate-300 text-justify">
                                <p>
                                    Mientras Tokyo corre hacia el futuro y Osaka devora el presente, <strong className="text-amber-500">Kioto respira en la eternidad</strong>. Fue la capital imperial durante más de mil años y su alma reside en la madera vieja, el incienso y el sonido de las sandalias sobre los adoquines.
                                </p>
                                <p>
                                    No es una ciudad para ser vista, sino para ser sentida. En sus más de 2000 templos se esconde la esencia del espíritu japonés: la búsqueda de la perfección en la simplicidad.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="relative h-[500px] w-full rounded-sm overflow-hidden border border-slate-800 shadow-2xl group"
                        >
                            <Image
                                src={IMAGES.intro}
                                alt="Kyoto Alley"
                                fill
                                className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-700" />

                            {/* Decorative Stamp */}
                            <div className="absolute bottom-6 left-6 border border-white/30 p-4 backdrop-blur-sm">
                                <div className="w-8 h-8 rounded-full bg-red-700/80 mb-2" />
                                <span className="text-xs tracking-widest text-white uppercase block">Patrimonio</span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ========== CONTENT 1: GION (Dark Tone A: slate-900) - CLASSIC SPLIT ========== */}
                <section id="gion" className="py-32 bg-slate-950">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 items-center">
                        {/* Image First for visual rhythm */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="w-full lg:w-1/2 relative h-[600px] group"
                        >
                            <div className="absolute inset-0 bg-amber-900/10 transform translate-x-4 translate-y-4 border border-amber-900/30 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
                            <div className="relative h-full w-full overflow-hidden border border-slate-800 bg-black">
                                <Image
                                    src={IMAGES.gion}
                                    alt="Gion District"
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="w-full lg:w-1/2"
                        >
                            <div className="flex items-center gap-3 mb-6 text-amber-600">
                                <Fan size={24} />
                                <span className="text-sm font-bold tracking-[0.2em] uppercase">Mundo Flotante</span>
                            </div>
                            <SectionTitle accentColor="bg-amber-600" glowEffect="shadow-[0_0_15px_rgba(217,119,6,0.3)]">Gion</SectionTitle>
                            <p className="text-xl text-slate-400 mb-8 font-light italic">
                                &quot;Donde las sombras tienen más color que la luz.&quot;
                            </p>
                            <div className="space-y-6 text-lg text-slate-300 leading-relaxed text-justify">
                                <p>
                                    El distrito de las geishas es un laberinto de casas de té (ochaya) y discreción. Al atardecer, si tienes suerte, verás una fugaz silueta en kimono desapareciendo tras una puerta corredera.
                                </p>
                                <p>
                                    Gion no es un decorado; es un mundo hermético con reglas propias que han sobrevivido siglos. Aquí, la elegancia es la moneda de cambio y el misterio se cultiva como un arte.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ========== CONTENT 2: ARASHIYAMA (Dark Tone B: slate-950) - NATURE PARALLAX ========== */}
                <section id="arashiyama" className="relative py-32 bg-slate-900 overflow-hidden">
                    {/* Background Texture similar to bamboo/vertical lines */}
                    <div className="absolute inset-0 opacity-5 bg-[linear-gradient(90deg,transparent_0%,#ffffff_1%,transparent_2%)] bg-[length:40px_100%] pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <SectionTitle accentColor="bg-amber-600" glowEffect="shadow-[0_0_15px_rgba(217,119,6,0.3)]" align="center">El Susurro del Bambú</SectionTitle>
                            <SectionSubtitle align="center">
                                Arashiyama, donde la naturaleza se convierte en arquitectura.
                            </SectionSubtitle>
                        </motion.div>

                        {/* Wide Parallax Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative w-full h-[70vh] overflow-hidden rounded-sm shadow-2xl"
                        >
                            <Image
                                src={IMAGES.bamboo}
                                alt="Bamboo Grove"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                            {/* Floating Caption */}
                            <div className="absolute bottom-12 left-8 md:left-12 max-w-lg">
                                <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">El Bosque de Bambú</h3>
                                <p className="text-slate-200 text-lg leading-relaxed drop-shadow-md">
                                    Caminar aquí es escuchar el sonido del viento chocando contra los tallos huecos. Un sonido que ha sido designado como uno de los &quot;100 Paisajes Sonoros de Japón&quot;.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ========== CONTENT 3: KINKAKU-JI (Dark Tone A: slate-900) - CENTER FOCUS ========== */}
                <section id="kinkakuji" className="py-32 bg-slate-950">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <div className="inline-block p-3 rounded-full bg-amber-900/20 text-amber-500 mb-8 border border-amber-900/30">
                            <Sun size={32} />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">KINKAKU-JI</h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-12" />

                            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light mb-12">
                                El Pabellón Dorado. Un templo cubierto de pan de oro puro que se refleja en el &quot;Estanque Espejo&quot;. Es la representación física del Paraíso de la Tierra Pura.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="relative aspect-video w-full rounded-sm overflow-hidden shadow-[0_0_60px_rgba(217,119,6,0.15)] border border-slate-800"
                        >
                            <Image
                                src={IMAGES.kinkakuji}
                                alt="Golden Pavilion"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* ========== CURIOSIDADES (Darkest Tone - STANDARD) ========== */}
                <CuriositiesSection
                    curiosities={CURIOSITIES}
                    accentColor="amber"
                    title="SECRETOS DE KIOTO"
                    className="border-t border-slate-900"
                />

            </div>
            <CommentsSectionWrapper slug="kioto" />
        </div>
    );
}
