'use client';

import React from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import {
    Utensils,
    Building2,
    Castle,
    Smile,
    ArrowUp,
    Radio,
    Zap,
    Users
} from 'lucide-react';
import { NavigationPill, NavigationItem, SectionTitle, SectionSubtitle, HeroSection } from '@/components/articles';

// ============================================================================
// DATOS & CONSTANTES
// ============================================================================

const SECTIONS: NavigationItem[] = [
    { id: '#intro', label: 'El Espíritu', icon: <Smile size={20} /> },
    { id: '#gastronomia', label: 'Kuidaore', icon: <Utensils size={20} /> },
    { id: '#shinsekai', label: 'Retro-Futuro', icon: <Radio size={20} /> },
    { id: '#historia', label: 'Castillo', icon: <Castle size={20} /> },
    { id: '#curiosidades', label: 'Secretos', icon: <Zap size={20} /> },
];

const IMAGES = {
    banner: "/images/articulos/osaka/banner.jpg",
    intro: "/images/articulos/osaka/intro.jpg",
    comidas: {
        takoyaki: "/images/articulos/osaka/comidas/takoyaki.jpg",
        okonomiyaki: "/images/articulos/osaka/comidas/okonomiyaki.jpg",
        kushikatsu: "/images/articulos/osaka/comidas/kushikatsu.jpg"
    },
    lugares: {
        shinsekai: "/images/articulos/osaka/lugares/shinsekai.jpg",
        castillo: "/images/articulos/osaka/lugares/castillo.jpg"
    }
}

const CURIOSITIES = [
    {
        icon: <ArrowUp className="w-6 h-6" />,
        title: "Escaleras Mecánicas",
        text: "En Osaka, la gente se coloca a la DERECHA en las escaleras mecánicas, al contrario que en el resto de Japón (izquierda)."
    },
    {
        icon: <Smile className="w-6 h-6" />,
        title: "Kansai-ben",
        text: "Tienen su propio dialecto. Es más melódico, directo y considerado el 'idioma de la comedia' en Japón."
    },
    {
        icon: <Utensils className="w-6 h-6" />,
        title: "Harina Power",
        text: "Takoyaki, Okonomiyaki, Kushikatsu... Si está hecho de harina y salsa, es de Osaka."
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: "La Gente: Obachan",
        text: "Las 'tías de Osaka' son famosas por su ropa de leopardo, llevar caramelos siempre en el bolso y su franqueza."
    },
    {
        icon: <Building2 className="w-6 h-6" />,
        title: "Umeda Maze",
        text: "La estación de Umeda es un laberinto subterráneo tan complejo que se le llama 'la mazmorra de Umeda'."
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Glico Man",
        text: "El cartel del corredor de Glico en Dotonbori lleva iluminando el canal desde 1935 (con renovaciones, claro)."
    },
];

const FOODS = [
    {
        id: 'takoyaki',
        name: 'Takoyaki',
        desc: 'Pequeñas bolas de masa rellenas de pulpo, jengibre y cebolleta. Se cocinan en moldes de hierro especiales y se comen ardiendo. El alma de la comida callejera.',
        img: IMAGES.comidas.takoyaki
    },
    {
        id: 'okonomiyaki',
        name: 'Okonomiyaki',
        desc: 'Literalmente "a tu gusto". Una tortilla sabrosa de repollo, ñame, huevo y dashi, cubierta con panceta, marisco o lo que desees, y bañada en salsa dulce.',
        img: IMAGES.comidas.okonomiyaki
    },
    {
        id: 'kushikatsu',
        name: 'Kushikatsu',
        desc: 'Brochetas de carne, verdura o queso empanadas y fritas a la perfección. La regla de oro en los bares de Shinsekai es sagrada: "Prohibido mojar dos veces" en la salsa comunal.',
        img: IMAGES.comidas.kushikatsu
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

export default function OsakaPage() {
    return (
        <div className="bg-stone-900 text-stone-200 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
            <NavigationPill sections={SECTIONS} accentColor="orange" />

            {/* ========== HERO SECTION (100vh) ========== */}
            {/* ========== HERO SECTION (100vh) ========== */}
            <HeroSection
                backgroundImage={IMAGES.banner}
                title="OSAKA"
                subtitle="La Cocina de Japón"
                scrollText="Descubre"
                accentColor="text-orange-200"
                scrollLineColor="bg-orange-500"
                overlayOpacity={0.7}
                backgroundChildren={
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-stone-900/90" />
                }
            />

            {/* ========== INTRO (Dark Tone B: stone-950) ========== */}
            <section id="intro" className="py-24 md:py-32 bg-stone-950 relative">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <SectionTitle accentColor="bg-orange-500" glowEffect="shadow-[0_0_15px_rgba(249,115,22,0.4)]">Alma Rebelde</SectionTitle>
                        <div className="space-y-6 text-lg leading-relaxed text-stone-300 text-justify">
                            <p>
                                Si Tokyo es el cerebro de Japón, <strong className="text-orange-400">Osaka es el corazón (y el estómago)</strong>. Aquí, la rigidez social se relaja. La gente habla más alto, ríe con más ganas y no tiene miedo de cruzar un semáforo en rojo si no vienen coches.
                            </p>
                            <p>
                                Históricamente una ciudad de mercaderes, Osaka valora el pragmatismo, el humor y, sobre todo, la comida. Es una ciudad honesta, ruidosa y abrumadoramente cálida.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-stone-800 shadow-2xl group"
                    >
                        <Image
                            src={IMAGES.intro}
                            alt="Osaka Streets"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />

                        <div className="absolute top-6 right-6 bg-orange-600 text-white font-bold py-1 px-4 rounded-full text-sm tracking-widest uppercase shadow-lg rotate-3">
                            Kansai Spirit
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ========== GASTRONOMÍA (Dark Tone A: stone-900) - STAGGERED CARDS ========== */}
            <section id="gastronomia" className="py-24 md:py-32 bg-stone-900">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <SectionTitle accentColor="bg-orange-500" glowEffect="shadow-[0_0_15px_rgba(249,115,22,0.4)]" align="center">Kuidaore</SectionTitle>
                        <SectionSubtitle align="center">
                            "Arruinarse comiendo". El lema no oficial de la ciudad. En Osaka, la comida no es solo combustible, es una religión.
                        </SectionSubtitle>
                    </motion.div>

                    <div className="flex flex-col gap-24">
                        {FOODS.map((food, index) => (
                            <motion.div
                                key={food.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="group bg-stone-800 rounded-3xl overflow-hidden shadow-2xl border border-stone-700 hover:border-orange-500/30 transition-all duration-500"
                            >
                                <div className={`grid md:grid-cols-2 items-center`}>
                                    {/* Image Side */}
                                    <div className={`relative h-[400px] md:h-full min-h-[400px] w-full overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                        <Image
                                            src={food.img}
                                            alt={food.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-stone-800 via-transparent to-transparent md:bg-gradient-to-r" />
                                    </div>

                                    {/* Content Side */}
                                    <div className={`p-10 md:p-16 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="text-5xl font-black text-stone-700 opacity-50 font-serif">0{index + 1}</span>
                                            <h3 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">{food.name}</h3>
                                        </div>
                                        <p className="text-xl text-stone-300 leading-relaxed font-light">
                                            {food.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== SHINSEKAI (Dark Tone B: stone-950) - RETRO NEON CARD (Refined) ========== */}
            <section id="shinsekai" className="py-24 md:py-32 bg-stone-950 relative overflow-hidden">
                {/* Neon Glow Background */}
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7 relative"
                    >
                        {/* Retro-Neon Image Container */}
                        <div className="relative h-[500px] rounded-sm overflow-hidden border-4 border-stone-800 shadow-[0_0_40px_rgba(249,115,22,0.2)] group">
                            <Image
                                src={IMAGES.lugares.shinsekai}
                                alt="Shinsekai Tower"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Vintage Overlay */}
                            <div className="absolute inset-0 bg-orange-500/10 mix-blend-overlay" />
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                            {/* Neon Border Effect on Hover */}
                            <div className="absolute inset-0 border border-transparent group-hover:border-orange-500/50 transition-colors duration-500" />
                        </div>

                        {/* Decorative Japanese Vertical Text */}
                        <div className="absolute -right-8 top-10 font-black text-6xl text-stone-800 hidden lg:block opacity-50 writing-vertical-rl select-none">
                            新世界
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 relative bg-stone-900/80 backdrop-blur-md p-8 md:p-12 -ml-0 lg:-ml-20 rounded-xl border border-stone-800 shadow-xl"
                    >
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-4 text-orange-500">
                                <Radio size={28} />
                                <span className="uppercase tracking-widest font-bold">Retro-Futuro</span>
                            </div>
                            <h2 className="text-4xl font-black text-white tracking-tight">
                                SHINSEKAI
                            </h2>
                        </div>

                        <p className="text-lg text-stone-300 leading-relaxed mb-6">
                            El &quot;Nuevo Mundo&quot; que se quedó congelado en 1912. Un laberinto de luces de neón vintage, salas de juego ruidosas y carteles coloridos.
                        </p>
                        <p className="text-lg text-stone-300 leading-relaxed">
                            Es la esencia de la nostalgia Showa. Aquí el tiempo se detiene entre brochetas fritas y la imponente torre Tsutenkaku.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ========== CASTILLO (Dark Tone A: stone-900) - CINEMATIC WIDE (Refined) ========== */}
            <section id="historia" className="py-24 md:py-32 bg-stone-900 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <SectionTitle accentColor="bg-orange-500" glowEffect="shadow-[0_0_15px_rgba(249,115,22,0.4)]">El Guardián</SectionTitle>
                    </motion.div>

                    {/* Full Width Image Top */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative w-full h-[60vh] rounded-3xl overflow-hidden mb-12 shadow-2xl"
                    >
                        <Image
                            src={IMAGES.lugares.castillo}
                            alt="Osaka Castle Wide"
                            fill
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-90" />
                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-3xl md:text-5xl font-black text-white drop-shadow-md">Osaka-jo</h3>
                            <p className="text-orange-300 text-sm tracking-widest uppercase">Símbolo de Unificación</p>
                        </div>
                    </motion.div>

                    {/* Text Columns Bottom */}
                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h4 className="text-2xl font-bold text-white mb-4">Poder y Resistencia</h4>
                            <p className="text-lg text-stone-300 leading-relaxed text-justify">
                                Construido por Toyotomi Hideyoshi para ser el centro de un nuevo Japón unificado, el castillo ha sobrevivido a guerras, incendios y prohibiciones. Sus muros de granito y sus detalles dorados imponen respeto desde kilómetros de distancia.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            <h4 className="text-2xl font-bold text-white mb-4">Contrastes Modernos</h4>
                            <p className="text-lg text-stone-300 leading-relaxed text-justify">
                                Hoy, el castillo se alza en medio de un parque de negocios ultramoderno. Ver sus tejados tradicionales recortados contra los rascacielos de cristal (OBP) es la imagen definitiva de la identidad de Osaka: respeto por el pasado, pero siempre mirando hacia adelante.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ========== CURIOSIDADES (Darkest Tone - STANDARD) ========== */}
            <section id="curiosidades" className="py-32 bg-stone-950 relative border-t border-stone-900">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-black mb-16 text-white border-b border-stone-800 pb-8">
                        SECRETOS DE <span className="text-orange-500">OSAKA</span>
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
                                <div className="mb-6 bg-stone-900 text-orange-500 w-14 h-14 rounded-2xl 
                                              flex items-center justify-center 
                                              group-hover:bg-orange-900/20 transition-colors 
                                              border border-stone-800">
                                    {item.icon}
                                </div>

                                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-orange-400 transition-colors">{item.title}</h3>
                                <p className="text-stone-400 leading-relaxed text-lg 
                                            border-l-2 border-stone-800 pl-4 
                                            group-hover:border-orange-600 transition-colors">
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
