'use client';

import React from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import {
    MapPin,
    Zap,
    Smartphone,
    Utensils,
    Train,
    Landmark,
    Terminal,
    Camera,
    Moon
} from 'lucide-react';
import { NavigationPill, NavigationItem, SectionTitle, SectionSubtitle, HeroSection } from '@/components/articles';

// ============================================================================
// DATOS & CONSTANTES
// ============================================================================

const SECTIONS: NavigationItem[] = [
    { id: '#intro', label: 'Contraste', icon: <Zap size={20} /> },
    { id: '#distritos', label: 'Distritos', icon: <MapPin size={20} /> },
    { id: '#tech', label: 'Cyberpunk', icon: <Terminal size={20} /> },
    { id: '#tradicion', label: 'Tradición', icon: <Landmark size={20} /> },
    { id: '#curiosidades', label: 'Curiosidades', icon: <Moon size={20} /> },
];

const IMAGES = {
    banner: '/images/articulos/tokyo/banner.jpg',
    intro: '/images/articulos/tokyo/intro.jpg',
    distritos: {
        shibuya: '/images/articulos/tokyo/distritos/shibuya.jpg',
        akihabara: '/images/articulos/tokyo/distritos/akihabara.jpg',
        shinjuku: '/images/articulos/tokyo/distritos/shinjuku.jpg',
        asakusa: '/images/articulos/tokyo/distritos/asakusa.jpg',
    },
    cyberpunk: '/images/articulos/tokyo/cyberpunk.jpg',
    tradicion: '/images/articulos/tokyo/tradicion.jpg',
}

const CURIOSITIES = [
    {
        icon: <Train className="w-6 h-6" />,
        title: "Puntualidad Absoluta",
        text: "El retraso medio anual de los trenes bala (Shinkansen) es de menos de 1 minuto. Si llegan tarde, emiten un certificado para tu jefe."
    },
    {
        icon: <Utensils className="w-6 h-6" />,
        title: "Capital Michelin",
        text: "Tokyo tiene más estrellas Michelin que cualquier otra ciudad en el mundo, superando a París y Nueva York."
    },
    {
        icon: <Smartphone className="w-6 h-6" />,
        title: "Silencio Digital",
        text: "Hablar por teléfono en el transporte público está mal visto. La gente envía mensajes o duerme, creando un silencio surrealista."
    },
    {
        icon: <Camera className="w-6 h-6" />,
        title: "Máquinas Expendedoras",
        text: "Hay una máquina expendedora por cada 23 personas. Puedes comprar desde caldo caliente hasta corbatas o figuras coleccionables."
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Neón Infinito",
        text: "La factura eléctrica de los carteles de neón de Shinjuku y Shibuya rivaliza con la de ciudades pequeñas enteras."
    },
    {
        icon: <Landmark className="w-6 h-6" />,
        title: "Tradición Viva",
        text: "Es común ver gente vestida con Kimono tradicional paseando entre rascacielos futuristas y tiendas de electrónica."
    },
];

const DISTRICTS = [
    {
        id: 'shibuya',
        name: 'Shibuya',
        desc: 'El corazón joven. Famoso por su cruce peatonal, moda callejera y pantallas gigantes.',
        image: IMAGES.distritos.shibuya,
    },
    {
        id: 'akihabara',
        name: 'Akihabara',
        desc: 'La meca otaku y eléctrica. El hogar del anime, manga, maid cafés y componentes electrónicos.',
        image: IMAGES.distritos.akihabara,
    },
    {
        id: 'shinjuku',
        name: 'Shinjuku',
        desc: 'El distrito que nunca duerme. Rascacielos de oficinas de día, vida nocturna y neón de noche.',
        image: IMAGES.distritos.shinjuku,
    },
    {
        id: 'asakusa',
        name: 'Asakusa',
        desc: 'El alma antigua. Hogar del templo Sensō-ji y calles tradicionales llenas de historia.',
        image: IMAGES.distritos.asakusa,
    }
];

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

// NavigationPill ahora importado desde @/components/articles

// SectionTitle ahora importado desde @/components/articles

// ============================================================================
// PÁGINA PRINCIPAL
// ============================================================================

export default function TokyoPage() {
    return (
        <div className="bg-slate-900 text-slate-200 font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden">
            <NavigationPill sections={SECTIONS} accentColor="cyan" />

            {/* ========== HERO SECTION (100vh) ========== */}
            {/* ========== HERO SECTION (100vh) ========== */}
            <HeroSection
                backgroundImage={IMAGES.banner}
                title={
                    <div className="relative">
                        <h1 className="text-7xl md:text-[10rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tighter drop-shadow-2xl">
                            TOKYO
                        </h1>
                        <div className="absolute -inset-4 bg-cyan-500/20 blur-3xl rounded-full -z-10 animate-pulse" />
                    </div>
                }
                subtitle="La ciudad de los contrastes"
                scrollText="Explora"
                accentColor="text-cyan-300"
                scrollLineColor="bg-gradient-to-b from-cyan-400 to-transparent"
                overlayOpacity={0.7}
                backgroundChildren={
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-slate-900/90" />
                }
            />

            {/* ========== INTRO (Dark Tone B: slate-950) ========== */}
            <section id="intro" className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <SectionTitle accentColor="bg-cyan-500" glowEffect="shadow-[0_0_15px_rgba(0,255,255,0.5)]" align="right">Caos Organizado</SectionTitle>
                        <div className="space-y-6 text-lg md:text-xl leading-relaxed text-slate-300 text-justify">
                            <p>
                                Tokyo no es una ciudad; es un <strong className="text-cyan-400">organismo vivo</strong>. Es la metrópolis más poblada del mundo, un laberinto infinito de hormigón y luz donde 37 millones de personas conviven en una danza coreografiada de eficiencia imposible.
                            </p>
                            <p>
                                Aquí, el futuro se estrella contra el pasado. Un tren magnético puede pasar zumbando junto a un santuario sintoísta de madera que lleva siglos en pie. Es el lugar donde la tecnología más puntera sirve para preservar las tradiciones más antiguas.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="relative h-[600px] w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl group"
                    >
                        <Image
                            src={IMAGES.intro}
                            alt="Tokyo Streets"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                        {/* Quote overlay */}
                        <div className="absolute bottom-10 left-10 right-10">
                            <p className="text-2xl font-light italic text-slate-200 border-l-4 border-cyan-500 pl-6">
                                &quot;En Tokyo, la noche no es el final del día, sino el comienzo de otra vida.&quot;
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ========== DISTRITOS (Dark Tone A: slate-900) ========== */}
            <section id="distritos" className="py-24 md:py-32 bg-slate-900">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <SectionTitle accentColor="bg-cyan-500" glowEffect="shadow-[0_0_15px_rgba(0,255,255,0.5)]" align="right">Micro-Mundos</SectionTitle>
                        <SectionSubtitle align="center">
                            Cada estación de la línea Yamanote es una puerta a un universo diferente. Cruza la calle y cambiarás de era.
                        </SectionSubtitle>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {DISTRICTS.map((district, index) => (
                            <motion.div
                                key={district.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group relative h-[400px] rounded-xl overflow-hidden cursor-pointer"
                            >
                                <Image
                                    src={district.image}
                                    alt={district.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-cyan-900/30 transition-colors duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <h3 className="text-4xl font-black text-white mb-2 uppercase tracking-tight">{district.name}</h3>
                                    <div className="w-12 h-1 bg-cyan-500 mb-4 transition-all duration-300 group-hover:w-full" />
                                    <p className="text-lg text-slate-200 opacity-90">{district.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== TECH vs TRADICIÓN (Dark Tone B: slate-950) ========== */}
            <section className="py-24 md:py-32 bg-slate-950 relative">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Upper Part: Cyberpunk */}
                    <div id="tech" className="grid lg:grid-cols-2 gap-16 mb-32 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            <div className="relative h-[500px] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                                <Image
                                    src="/images/articulos/tokyo/cyberpunk.jpg" // Placeholder
                                    alt="Cyberpunk Aesthetic"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/40 to-slate-900/40 mix-blend-overlay" />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2"
                        >
                            <h3 className="text-3xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
                                <Terminal className="w-8 h-8" />
                                <span className="uppercase tracking-widest">Futuro Inmediato</span>
                            </h3>
                            <p className="text-lg text-slate-300 leading-relaxed mb-6">
                                Tokyo es la inspiración visual del género Cyberpunk por una razón. Caminar por Kabukicho bajo la lluvia, iluminado solo por neones holográficos y pantallas LED gigantes, es sentirse dentro de Blade Runner.
                            </p>
                            <p className="text-lg text-slate-300 leading-relaxed">
                                La tecnología aquí no es una herramienta, es el ambiente. Desde robots que sirven café hasta baños inteligentes que te saludan, la ciudad abraza la automatización con una naturalidad pasmosa.
                            </p>
                        </motion.div>
                    </div>

                    {/* Lower Part: Tradition */}
                    <div id="tradicion" className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-3xl font-bold text-slate-200 mb-6 flex items-center gap-3">
                                <Landmark className="w-8 h-8 text-cyan-500" />
                                <span className="uppercase tracking-widest">Eternidad Zen</span>
                            </h3>
                            <p className="text-lg text-slate-300 leading-relaxed mb-6">
                                Y sin embargo, el silencio existe. Cruzar la puerta Torii del santuario Meiji es como activar un interruptor de cancelación de ruido. El bosque reclama el espacio y el asfalto desaparece.
                            </p>
                            <p className="text-lg text-slate-300 leading-relaxed">
                                La ceremonia del té, los jardines de rocas y la arquitectura de madera de Asakusa nos recuerdan que antes de los microchips, aquí reinaban los samuráis y los poetas.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative h-[500px] rounded-2xl overflow-hidden border border-slate-700/50 grayscale hover:grayscale-0 transition-all duration-700">
                                <Image
                                    src={IMAGES.tradicion}
                                    alt="Meiji Shrine"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ========== CURIOSIDADES (Darkest Tone: black) ========== */}
            <section id="curiosidades" className="py-32 bg-black relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-900 via-black to-black opacity-50" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20 border-b border-gray-800 pb-10"
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
                            Datos <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">Curiosos</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {CURIOSITIES.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group bg-slate-900/40 border border-slate-800 p-8 rounded-2xl hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all duration-300"
                            >
                                <div className="mb-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300 ring-1 ring-slate-700 group-hover:ring-cyan-500/50">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-cyan-200 transition-colors">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-lg group-hover:text-slate-300 transition-colors">
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
