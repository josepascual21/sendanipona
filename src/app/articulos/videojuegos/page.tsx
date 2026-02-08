'use client';

import React from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import {
    Gamepad2,
    Trophy,
    Cpu,
    Joystick,
    Ghost,
    Zap,
    History,
    Dices,
    CircuitBoard,
    Radio
} from 'lucide-react';
import { NavigationPill, NavigationItem, SectionTitle } from '@/components/articles';

// ============================================================================
// CONSTANTES Y DATOS
// ============================================================================

const IMAGES = {
    banner: "/images/articulos/videojuegos/banner.jpg",
    intro: "/images/articulos/videojuegos/intro.jpg",
    sistemas: {
        sega: "/images/articulos/videojuegos/sistemas/sega.jpg",
        nintendo: "/images/articulos/videojuegos/sistemas/nintendo.jpg",
    },
    arcades: "/images/articulos/videojuegos/arcades.jpg",
    tecnologia: "/images/articulos/videojuegos/tecnologia.jpg",
    franquicias: {
        mario: "/images/articulos/videojuegos/franquicias/mario.jpg",
        zelda: "/images/articulos/videojuegos/franquicias/zelda.jpg",
        ff: "/images/articulos/videojuegos/franquicias/ff.jpg",
        streetfighter: "/images/articulos/videojuegos/franquicias/streetfighter.jpg",
    }
};

const FRANCHISES = [
    {
        id: "mario",
        name: "Super Mario",
        company: "Nintendo",
        desc: "El icono global que redefinió las plataformas y la industria misma tras la crisis de 1983.",
        img: IMAGES.franquicias.mario
    },
    {
        id: "zelda",
        name: "The Legend of Zelda",
        company: "Nintendo",
        desc: "La cumbre de la aventura y la exploración, empujando los límites del diseño de mundos abiertos.",
        img: IMAGES.franquicias.zelda
    },
    {
        id: "ff",
        name: "Final Fantasy",
        company: "Square Enix",
        desc: "Narrativa épica y vanguardia técnica que convirtió el RPG japonés en un fenómeno mundial.",
        img: IMAGES.franquicias.ff
    },
    {
        id: "streetfighter",
        name: "Street Fighter",
        company: " Capcom",
        desc: "El género de los combates cuerpo a cuerpo se consolidó con esta franquicia que revolucionó la industria.",
        img: IMAGES.franquicias.streetfighter
    }
];

const CURIOSITIES = [
    {
        icon: <Ghost className="w-6 h-6" />,
        title: "El origen de Pac-Man",
        text: "Inspirado por una pizza a la que le faltaba una porción, Toru Iwatani creó el personaje más reconocible del mundo."
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: "La ley Dragon Quest",
        text: "Existe el mito urbano de que el gobierno japonés prohibió lanzar Dragon Quest en días laborables por el absentismo escolar y laboral."
    },
    {
        icon: <Dices className="w-6 h-6" />,
        title: "Nintendo y las Cartas",
        text: "Antes de los píxeles, Nintendo fabricaba cartas Hanafuda (flores) desde su fundación en 1889."
    },
    {
        icon: <CircuitBoard className="w-6 h-6" />,
        title: "El efecto Famicom",
        text: "En Japón, la NES se llamó Famicom y tenía un diseño rojo y blanco inspirado en una bufanda de Hiroshi Yamauchi."
    },
    {
        icon: <History className="w-6 h-6" />,
        title: "Space Invaders",
        text: "Fue tan popular que provocó una escasez temporal de monedas de 100 yenes en todo Japón en 1978."
    },
    {
        icon: <Radio className="w-6 h-6" />,
        title: "Silent Hill",
        text: "La niebla constante no fue solo estética; era un truco técnico para ocultar las limitaciones de carga de la PlayStation."
    },
];

/** Secciones de navegación */
const SECTIONS: NavigationItem[] = [
    { id: '#intro', label: 'Origen', icon: <History size={20} /> },
    { id: '#8-16bit', label: 'Era Dorada', icon: <Gamepad2 size={20} /> },
    { id: '#arcades', label: 'Arcades', icon: <Joystick size={20} /> },
    { id: '#franquicias', label: 'Franquicias', icon: <Trophy size={20} /> },
    { id: '#tecnologia', label: 'Innovación', icon: <Cpu size={20} /> },
    { id: '#curiosidades', label: 'Curiosidades', icon: <Zap size={20} /> },
];

// NavigationPill ahora importado desde @/components/articles

// SectionTitle ahora importado desde @/components/articles

// ============================================================================
// PÁGINA PRINCIPAL
// ============================================================================

export default function VideojuegosPage() {
    return (
        <div className="bg-slate-900 text-slate-300 font-sans selection:bg-emerald-500/30 selection:text-white overflow-x-hidden">
            <NavigationPill sections={SECTIONS} accentColor="emerald" />

            {/* ========== HERO SECTION (100vh) ========== */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900" />
                    {/* Placeholder con un gradiente si no hay imagen */}
                    <div className="w-full h-full opacity-40 bg-[url('/images/articulos/videojuegos/banner.jpg')] bg-cover bg-center bg-slate-800" />
                </div>

                <div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-[9rem] lg:text-[11rem] leading-[0.85] font-black tracking-tight text-white uppercase">
                            Videojuegos
                        </h1>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl md:text-3xl font-light mt-8 tracking-[0.4em] text-emerald-200 uppercase"
                    >
                        De los Arcades a la Eternidad
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-widest text-slate-100">Iniciar Nivel</span>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-emerald-500 to-transparent" />
                </motion.div>
            </section>

            {/* ========== INTRO (OSCURO TONO B) ========== */}
            <section id="intro" className="py-24 md:py-32 px-6 min-h-[80vh] flex items-center bg-slate-950">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <SectionTitle accentColor="emerald" useGradient gradientToColor="cyan">El epicentro del<br />entretenimiento</SectionTitle>
                        <p className="text-lg text-slate-300 leading-relaxed text-justify mb-6">
                            Lo que comenzó como un experimento técnico en laboratorios se convirtió, gracias a Japón, en la industria cultural más lucrativa del planeta. Tras la crisis de 1983 que casi aniquila el sector en Occidente, <strong className="text-white">Nintendo</strong> logró lo imposible: devolver la fe en el medio con creatividad, rigor y personajes inolvidables.
                        </p>
                        <p className="text-lg text-slate-300 leading-relaxed text-justify">
                            Japón no solo fabrica consolas; crea mundos. Desde los callejones de Akihabara hasta las oficinas de Kioto, la filosofía japonesa de &quot;Monozukuri&quot; (el arte de fabricar cosas) se fusionó con la imaginación para darnos una forma de arte que hoy define a generaciones enteras.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
                    >
                        <Image
                            src={IMAGES.intro}
                            alt="Videojuegos Intro"
                            fill
                            className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    </motion.div>
                </div>
            </section>

            {/* ========== 8-16 BIT (OSCURO TONO A) ========== */}
            <section id="8-16bit" className="py-24 md:py-32 bg-slate-900 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="order-2 md:order-1"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-64 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 shadow-inner group overflow-hidden relative">
                                    <Image
                                        src={IMAGES.sistemas.sega}
                                        alt="Sega Mega Drive"
                                        fill
                                        className="object-cover opacity-80"
                                    />
                                </div>
                                <div className="h-64 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 mt-8 shadow-inner group overflow-hidden relative">
                                    <Image
                                        src={IMAGES.sistemas.nintendo}
                                        alt="Nintendo"
                                        fill
                                        className="object-cover opacity-80"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-1 md:order-2"
                        >
                            <SectionTitle accentColor="emerald" useGradient gradientToColor="cyan">La Magia del<br />Pixel Art</SectionTitle>
                            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                                Las eras de los 8 y 16 bits representan el nacimiento de los géneros que conocemos hoy. La limitación técnica obligó a los desarrolladores a perfeccionar las mecánicas, la música (el legendario chip-tune) y el diseño de niveles.
                            </p>
                            <p className="text-lg text-slate-300 leading-relaxed">
                                Mientras Nintendo dominaba con su rigor creativo, <strong className="text-lime-400">SEGA</strong> llegaba con &quot;Sega does what Nintendon&apos;t&quot;, aportando una actitud urbana, veloz y rebelde que cambió la forma en que se comercializaban los videojuegos.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ========== ARCADES (OSCURO TONO B) ========== */}
            <section id="arcades" className="py-24 md:py-32 bg-slate-950 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="flex-1">
                            <motion.div
                                initial={{ opacity: 0, scale: 1.1 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="relative h-[600px] w-full rounded-3xl overflow-hidden"
                            >
                                <Image
                                    src={IMAGES.arcades}
                                    alt="Arcades in Japan"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-950/20 to-transparent" />
                                <div className="absolute inset-0 flex items-center p-12">
                                    <div className="max-w-md">
                                        <h3 className="text-5xl font-black text-white mb-6 leading-tight italic uppercase tracking-tighter">
                                            Game Center<br />Culture
                                        </h3>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex-1"
                        >
                            <SectionTitle accentColor="emerald" useGradient gradientToColor="cyan">El corazón de<br />Akihabara</SectionTitle>
                            <div className="space-y-6 text-lg leading-relaxed text-justify text-slate-300">
                                <p>
                                    A diferencia de Occidente, donde los salones recreativos casi han desaparecido, en Japón siguen siendo templos de la habilidad social y competitiva. Los edificios de <strong className="text-red-500">GiGO</strong> (antes SEGA) y Taito son puntos de referencia inconfundibles.
                                </p>
                                <p>
                                    Desde el fenómeno de los juegos de lucha con <em className="text-white">Street Fighter</em>, hasta la locura rítmica de <em className="text-white">Dance Dance Revolution</em> y los complejos simuladores de mechas, el arcade es donde Japón experimenta con el hardware más extremo.
                                </p>
                                <p>
                                    No se trata solo de jugar; es un espacio de reunión. El sonido ensordecedor de los &apos;ufo catchers&apos;, el tintineo de las medallas y el olor a electrónica caliente forman parte del ADN nocturno de las grandes ciudades japonesas.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ========== FRANQUICIAS (OSCURO TONO A) ========== */}
            <section id="franquicias" className="py-24 md:py-32 bg-slate-900">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <SectionTitle accentColor="emerald" useGradient gradientToColor="cyan" align="center">Franquicias Legendarias</SectionTitle>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto mt-6">
                            Nombres que no necesitan traducción. Historias que han unido a jugadores de todo el mundo.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {FRANCHISES.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-300"
                            >
                                <div className="h-64 relative overflow-hidden">
                                    <Image
                                        src={item.img}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                                </div>
                                <div className="p-6">
                                    <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest mb-2 block">{item.company}</span>
                                    <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{item.name}</h3>
                                    <p className="text-slate-400 text-lg leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== TECNOLOGÍA (OSCURO TONO B) ========== */}
            <section id="tecnologia" className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-900/10 rounded-full blur-[120px] -mr-96 -mt-96" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-lime-900/10 rounded-full blur-[100px] -ml-48 -mb-48" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex-1"
                        >
                            <SectionTitle accentColor="emerald" useGradient gradientToColor="cyan">Innovación sin<br />Límites</SectionTitle>
                            <div className="space-y-6">
                                <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                                    <h4 className="text-white font-bold flex items-center gap-2 mb-2">
                                        <Zap className="text-emerald-400" size={20} /> El Salto al 3D
                                    </h4>
                                    <p className="text-slate-400 leading-relaxed">Sony y la PlayStation cambiaron el paradigma, atrayendo a un público más adulto y transformando los videojuegos en un fenómeno de masas.</p>
                                </div>
                                <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                                    <h4 className="text-white font-bold flex items-center gap-2 mb-2">
                                        <Zap className="text-lime-400" size={20} /> Portabilidad Total
                                    </h4>
                                    <p className="text-slate-400 leading-relaxed">Con la Game Boy original y la actual Switch, Japón ha demostrado que el poder no es nada sin la libertad de jugar en cualquier lugar.</p>
                                </div>
                                <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-2xl">
                                    <h4 className="text-white font-bold flex items-center gap-2 mb-2">
                                        <Zap className="text-amber-400" size={20} /> Nuevas Experiencias
                                    </h4>
                                    <p className="text-slate-400 leading-relaxed">Controles por movimiento, realidad virtual y mecánicas táctiles: la innovación japonesa siempre busca nuevas formas de interacción.</p>
                                </div>
                            </div>
                        </motion.div>
                        <div className="flex-1 w-full h-[500px] relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
                            <Image
                                src={IMAGES.tecnologia}
                                alt="Tecnología de Videojuegos"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== CURIOSIDADES (FINAL stone-950) ========== */}
            <section id="curiosidades" className="py-32 bg-stone-950">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black mb-16 text-white text-center tracking-tighter"
                    >
                        SECRETOS DEL CÓDIGO
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
                                className="group p-8 bg-stone-900 border border-stone-800 rounded-3xl hover:border-emerald-500/30 transition-all"
                            >
                                <div className="mb-6 bg-stone-950 text-emerald-500 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors shadow-lg border border-emerald-500/10">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                                <p className="text-stone-500 leading-relaxed text-lg group-hover:text-stone-300 transition-colors border-l-2 border-stone-800 pl-4">
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
