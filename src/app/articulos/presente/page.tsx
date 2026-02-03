'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import {
    Users,
    Gamepad2,
    Music,
    Ticket,
    Coffee,
    Waves,
    ShoppingBag,
    Map,
    TrainFront,
    Building2,
    Radio
} from 'lucide-react';

// ============================================================================
// DATOS
// ============================================================================

const CURIOSITIES = [
    {
        icon: <Coffee className="w-6 h-6" />,
        title: "Cafés de Gatos",
        text: "Japón es famoso por sus 'neko cafés' y otros donde puedes pasar tiempo con animales como búhos o erizos."
    },
    {
        icon: <Waves className="w-6 h-6" />,
        title: "Onsen",
        text: "Baños termales naturales con propiedades curativas, fundamentales para la relajacin y socialización."
    },
    {
        icon: <ShoppingBag className="w-6 h-6" />,
        title: "Vending Machines",
        text: "Máquinas que venden de todo: desde paraguas y ropa interior hasta ramen caliente y kits de origami."
    },
    {
        icon: <Map className="w-6 h-6" />,
        title: "Islas de Animales",
        text: "Lugares únicos como 'Rabbit Island' o Nara, donde ciervos y conejos deambulan libremente entre la gente."
    },
    {
        icon: <Building2 className="w-6 h-6" />,
        title: "Calles sin Nombre",
        text: "Muchas calles no tienen nombre; las direcciones se basan en bloques y números, un reto para los visitantes."
    },
    {
        icon: <TrainFront className="w-6 h-6" />,
        title: "Puntualidad Extrema",
        text: "El sistema ferroviario es famoso mundialmente por su limpieza y una puntualidad medida en segundos."
    },
];

// ============================================================================
// COMPONENTES
// ============================================================================

/** Navegación lateral */
const NavigationPill = () => (
    <nav className="hidden xl:flex flex-col gap-4 fixed left-10 top-1/2 -translate-y-1/2 z-50">
        {[
            { id: '#sociedad', label: 'Sociedad', icon: <Users size={20} /> },
            { id: '#cultura-pop', label: 'Cultura Pop', icon: <Gamepad2 size={20} /> },
            { id: '#curiosidades', label: 'Curiosidades', icon: <Radio size={20} /> },
        ].map((item) => (
            <Link
                key={item.id}
                href={item.id}
                className="group flex items-center gap-3 bg-white/80 backdrop-blur-md p-3 rounded-full 
                         hover:bg-indigo-700 hover:text-white transition-all duration-300 
                         w-12 hover:w-40 overflow-hidden whitespace-nowrap 
                         border border-slate-200/50 shadow-lg text-slate-700"
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
const SectionTitle = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
    <h2 className={`text-4xl md:text-5xl font-black mb-12 relative inline-block tracking-tight ${light ? 'text-indigo-50' : 'text-slate-900'
        }`}>
        {children}
        <span className={`absolute -bottom-2 right-0 w-24 h-2 ${light ? 'bg-indigo-400' : 'bg-indigo-600'}`} />
    </h2>
);

// ============================================================================
// PÁGINA
// ============================================================================

export default function PresentePage() {
    return (
        <div className="bg-slate-50 text-slate-800 font-sans selection:bg-indigo-500 selection:text-white">
            <NavigationPill />

            {/* ========== HERO SECTION ========== */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
                {/* Imagen de fondo con overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/articulos/presente/banner.png"
                        alt="Banner Presente de Japón"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900" />
                </div>

                {/* Título */}
                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-7xl md:text-[10rem] leading-none font-black text-white tracking-tighter font-ai-love drop-shadow-2xl"
                    >
                        PRESENTE
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl md:text-3xl font-light tracking-[0.3em] text-indigo-200 uppercase mt-4"
                    >
                        Comprende su Realidad
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-widest text-slate-400">Explora</span>
                    <div className="w-[1px] h-16 bg-indigo-500" />
                </motion.div>
            </section>

            <div className="relative z-10">

                {/* ========== SECCIÓN SOCIEDAD ========== */}
                <section id="sociedad" className="py-32 bg-[#fdfbf7]">
                    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <SectionTitle>Sociedad Estoica</SectionTitle>
                            <div className="text-lg leading-relaxed text-slate-700 space-y-6 text-justify">
                                <p>
                                    En este apartado es esencial empezar dando un breve resumen sobre la sociedad japonesa. Lo más básico que podríamos exponer es que es conocida por su enfoque en la
                                    <span className="text-indigo-700 font-bold"> armonía, el respeto por la jerarquía y la colectividad</span>.
                                    La estructura social tradicional está influenciada por el Confucianismo y el Budismo, donde el respeto por los mayores,
                                    el trabajo en equipo y la modestia son valores fundamentales.
                                </p>
                                <p>
                                    La educación es altamente prioritaria y competitiva, con un énfasis en la excelencia académica y la disciplina.
                                    La sociedad japonesa tiende a valorar la homogeneidad y la conformidad, aunque también ha habido un aumento en la apertura a la diversidad.
                                    Podría parecer una sociedad ideal para los amantes de la calma y la serenidad, donde prevalece el orden frente al caos y prima el respeto mutuo.
                                </p>
                                <p>
                                    Sin embargo, debe ser mostrada la <span className="text-indigo-700 font-bold">"cara B"</span>.
                                    Debido al exceso de homogeneidad, a veces se rechaza lo extraño o diferente. La violencia puede manifestarse
                                    no física, sino como falta de respeto y abuso hacia el más débil o de menor rango en la jerarquía.
                                    Aun con esto, hay esperanza en la constante integración que el país vive con otras culturas.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[70vh] w-full"
                        >
                            {/* Imagen Sociedad */}
                            <div className="absolute inset-0 bg-stone-200 rounded-t-full border-8 border-double border-stone-300 shadow-2xl overflow-hidden">
                                <Image
                                    src="/images/articulos/presente/society.jpg"
                                    alt="Sociedad de Tokio en Shibuya"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 w-3/5 h-3/5 bg-indigo-900 z-10 mix-blend-multiply opacity-20 rounded-lg pointer-events-none" />
                        </motion.div>
                    </div>
                </section>

                {/* ========== SECCIÓN CULTURA POP ========== */}
                <section id="cultura-pop" className="py-32 bg-slate-900 text-slate-200">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-20">
                            <motion.h2
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-black text-white mb-6"
                            >
                                CULTURA POP
                            </motion.h2>
                            <div className="w-24 h-1 bg-indigo-500 mx-auto mb-6"></div>
                            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                                Anime, videojuegos y tecnología: el rostro moderno de Japón.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Card 1: Anime/Manga */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
                            >
                                {/* Imagen Anime */}
                                <div className="h-64 relative border-b border-slate-600">
                                    <Image
                                        src="/images/articulos/presente/anime.png"
                                        alt="Akihabara Electric Town"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
                                        <Ticket /> Anime y Manga
                                    </h3>
                                    <p className="text-slate-300 leading-relaxed">
                                        Fenómeno cultural surgido en los 80. Hoy día, el concepto "otaku" se ha normalizado
                                        y es una de las mayores exportaciones culturales del país, influyendo en la moda, cine y arte global.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Card 2: Videojuegos */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
                            >
                                {/* Imagen Videojuegos */}
                                <div className="h-64 relative border-b border-slate-600">
                                    <Image
                                        src="/images/articulos/presente/videojuegos.png"
                                        alt="Arcade Japonés"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                                        <Gamepad2 /> Videojuegos
                                    </h3>
                                    <p className="text-slate-300 leading-relaxed">
                                        Hogar de gigantes como Nintendo y Sony. Franquicias como Mario, Zelda y Final Fantasy
                                        no son solo entretenimiento, sino pilares fundamentales de la identidad moderna japonesa.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Card 3: Música (Full Width en MD o tercera columna si hubiera) */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 md:col-span-2"
                            >
                                <div className="grid md:grid-cols-2">
                                    <div className="h-64 md:h-auto relative border-r border-slate-600">
                                        <Image
                                            src="/images/articulos/presente/music.png"
                                            alt="Concierto J-Pop"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                    <div className="p-8 flex flex-col justify-center">
                                        <h3 className="text-2xl font-bold text-pink-400 mb-4 flex items-center gap-2">
                                            <Music /> J-Pop y Música
                                        </h3>
                                        <p className="text-slate-300 leading-relaxed">
                                            Desde ídolos virtuales hasta bandas sonoras épicas. La música pop japonesa acompaña
                                            a animes y videojuegos, creando una atmósfera única que resuena en todo el mundo.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ========== SECCIÓN CURIOSIDADES ========== */}
                <section id="curiosidades" className="py-32 bg-stone-900 text-stone-300">
                    <div className="max-w-7xl mx-auto px-6">
                        <SectionTitle light>Curiosidades</SectionTitle>

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
                                    <div className="mb-6 bg-stone-800 text-indigo-400 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-indigo-900/30 group-hover:text-indigo-300 transition-colors shadow-inner">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-stone-100">{item.title}</h3>
                                    <p className="text-stone-400 leading-relaxed text-lg border-l-2 border-stone-800 pl-4 group-hover:border-indigo-600 transition-colors">
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
