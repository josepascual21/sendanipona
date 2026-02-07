'use client';

import React from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import {
    Car,
    Flag,
    MapPin,
    Zap,
    Users,
    AlertTriangle,
    Gauge,
    Flame,
    Disc,
    Radio
} from 'lucide-react';
import { NavigationPill, NavigationItem } from '@/components/articles';

// ============================================================================
// CONSTANTES Y DATOS
// ============================================================================

/** Rutas de las imágenes (Placeholders por ahora) */
const IMAGES = {
    banner: "/images/articulos/jdm/banner.jpg",
    intro: "/images/articulos/jdm/intro.jpg",
    drift: "/images/articulos/jdm/drift.jpg",
    modelos: {
        supra: "/images/articulos/jdm/modelos/supra.jpg",
        rx7: "/images/articulos/jdm/modelos/rx7.jpg",
        skyline: "/images/articulos/jdm/modelos/skyline.jpg",
        nsx: "/images/articulos/jdm/modelos/nsx.jpg"
    }
};

/** Lista de coches icónicos */
const CARS = [
    {
        id: "supra",
        name: "Toyota Supra MK4",
        engine: "2JZ-GTE",
        desc: "El rey de las modificaciones, famoso por su motor indestructible capaz de soportar cifras de potencia absurdas.",
        img: IMAGES.modelos.supra
    },
    {
        id: "rx7",
        name: "Mazda RX-7 FD",
        engine: "13B-REW",
        desc: "La belleza del motor rotativo. Diseño atemporal y un equilibrio de chasis perfecto para las curvas.",
        img: IMAGES.modelos.rx7
    },
    {
        id: "skyline",
        name: "Nissan Skyline GT-R R34",
        engine: "RB26DETT",
        desc: "Godzilla. Tecnología punta para su época y tracción total que dominaba tanto la calle como el circuito.",
        img: IMAGES.modelos.skyline
    },
    {
        id: "nsx",
        name: "Honda NSX",
        engine: "C30A VTEC",
        desc: "El Ferrari japonés. Desarrollado con la ayuda de Ayrton Senna, demostró que un superdeportivo podía ser fiable.",
        img: IMAGES.modelos.nsx
    }
];

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

/** Curiosidades JDM */
const CURIOSITIES = [
    {
        icon: <Flame className="w-6 h-6" />,
        title: "Mid Night Club",
        text: "Una sociedad secreta con una regla de oro: la moralidad. Se disolvió tras un trágico accidente en 1999."
    },
    {
        icon: <Disc className="w-6 h-6" />,
        title: "Eurobeat",
        text: "El género musical que se convirtió en la banda sonora no oficial de las carreras de montaña (Touge) gracias a Initial D."
    },
    {
        icon: <Car className="w-6 h-6" />,
        title: "Shakotan",
        text: "Estilo de modificación exagerado: coches extremadamente bajos, escapes largos y colores estridentes."
    },
    {
        icon: <MapPin className="w-6 h-6" />,
        title: "Ruta C1",
        text: "El anillo interior de la autopista Shuto en Tokio, escenario de las carreras ilegales más legendarias."
    },
    {
        icon: <Gauge className="w-6 h-6" />,
        title: "Kei Cars",
        text: "No todo es potencia. Los pequeños coches de 660cc también tienen una vibrante escena de tuning."
    },
    {
        icon: <Radio className="w-6 h-6" />,
        title: "Kanjozoku",
        text: "Corredores de la autopista circular de Osaka, famosos por sus Honda Civic y sus máscaras de Jason."
    },
];

/** Secciones de navegación */
const SECTIONS: NavigationItem[] = [
    { id: '#intro', label: 'Cultura', icon: <Flag size={20} /> },
    { id: '#drift', label: 'Drift', icon: <Car size={20} /> },
    { id: '#quedadas', label: 'Quedadas', icon: <Users size={20} /> },
    { id: '#modelos', label: 'Leyendas', icon: <Zap size={20} /> },
    { id: '#clandestino', label: 'Underground', icon: <AlertTriangle size={20} /> },
    { id: '#curiosidades', label: 'Curiosidades', icon: <Flame size={20} /> },
];

// NavigationPill ahora importado desde @/components/articles


const SectionTitle = ({ children, align = "left" }: { children: React.ReactNode, align?: "left" | "center" | "right" }) => (
    <h2 className={`text-4xl md:text-5xl font-black mb-12 relative inline-block tracking-tight text-white
        ${align === "center" ? "mx-auto" : ""}
    `}>
        {children}
        <span className={`absolute -bottom-2 ${align === "right" ? "right-0" : "left-0"} w-24 h-2 bg-red-800`} />
    </h2>
);

// ============================================================================
// PÁGINA PRINCIPAL
// ============================================================================

export default function JdmPage() {
    return (
        <div className="bg-slate-900 text-slate-300 font-sans selection:bg-red-800 selection:text-white overflow-x-hidden">
            <NavigationPill sections={SECTIONS} accentColor="red" />

            {/* ========== HERO SECTION (100vh) ========== */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Video/Image Placeholder */}
                <div className="absolute inset-0 z-0 bg-slate-900">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900" />
                    <div className="w-full h-full opacity-50 bg-[url('/images/articulos/jdm/banner.jpg')] bg-cover bg-center" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="border-8 border-red-800 p-8 inline-block backdrop-blur-sm bg-black/20"
                    >
                        <h1 className="text-8xl md:text-[12rem] leading-none font-black tracking-tighter italic text-white">
                            JDM
                        </h1>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl md:text-3xl font-light mt-8 tracking-[0.2em] text-red-200 uppercase"
                    >
                        Japanese Domestic Market
                    </motion.p>
                </div>

                {/* Indicador de scroll */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-widest text-slate-500">Descubre</span>
                    <div className="w-[1px] h-16 bg-red-800" />
                </motion.div>
            </section>

            {/* ========== INTRO (OSCURO TONO B) ========== */}
            <section id="intro" className="py-24 md:py-32 px-6 min-h-[80vh] flex items-center bg-slate-950">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <SectionTitle>No es solo<br />una etiqueta</SectionTitle>
                        <p className="text-lg text-slate-300 leading-relaxed text-justify mb-6">
                            El término <strong className="text-white">JDM</strong> (Japanese Domestic Market) nació para designar a los vehículos y piezas fabricados específicamente para el mercado japonés. Sin embargo, con los años, ha trascendido su definición técnica para convertirse en una <em className="text-red-500 font-serif">cultura global</em>.
                        </p>
                        <p className="text-lg text-slate-300 leading-relaxed text-justify">
                            No se trata solo de coches; se trata de una búsqueda obsesiva de la perfección, la estética 'clean', el respeto por la ingeniería y un sentido de comunidad que une a entusiastas de todo el mundo, desde las curvas de Hakone hasta los aparcamientos de Daikoku.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[500px] w-full items-center justify-center flex bg-slate-900 rounded-sm overflow-hidden shadow-2xl border border-slate-800"
                    >
                        {/* Placeholder img */}
                        <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-black text-4xl uppercase opacity-20">
                            Intro Image
                        </div>
                        <Image
                            src={IMAGES.intro}
                            alt="JDM Intro"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    </motion.div>
                </div>
            </section>

            {/* ========== DRIFT (OSCURO TONO A) ========== */}
            <section id="drift" className="py-24 md:py-32 bg-slate-900 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="order-2 md:order-1 relative h-[500px] bg-slate-800 rounded-lg overflow-hidden shadow-2xl border border-slate-700"
                        >
                            <Image
                                src={IMAGES.drift}
                                alt="Drift Action"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-1 md:order-2 text-right"
                        >
                            <div className="flex flex-col items-end">
                                <SectionTitle align="right">El Arte del<br />Descontrol</SectionTitle>
                            </div>
                            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                                Nacido en las montañas (Touge) de Japón, el <strong className="text-red-500">Drift</strong> es la máxima expresión de control sobre el caos. No se busca llegar el primero, sino hacerlo con el mayor estilo y ángulo posible.
                            </p>
                            <p className="text-lg text-slate-300 leading-relaxed">
                                Figuras como <span className="text-white font-bold">Keiichi Tsuchiya</span> (el Drift King) llevaron esta técnica de las carreteras ilegales a los circuitos profesionales, convirtiéndola en un deporte que exige una sincronización perfecta entre hombre y máquina.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ========== QUEDADAS (OSCURO TONO B) ========== */}
            <section id="quedadas" className="py-24 md:py-32 bg-slate-950 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <SectionTitle align="center">Daikoku Futo &<br />La Cultura del Parking</SectionTitle>
                        <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed">
                            En Japón, las áreas de servicio (PA) no son solo para descansar. Son templos improvisados donde se reúnen las máquinas más increíbles de la noche bajo luces de neón y vapor de sodio.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Respeto", desc: "Nadie toca el coche de otro. Se admira con la mirada y se respeta el esfuerzo ajeno." },
                            { title: "Variedad", desc: "Desde Kei cars tuneados hasta Lamborghinis con neones estroboscópicos." },
                            { title: "Silencio", desc: "A pesar de los motores de 1000cv, impera un orden casi religioso hasta que empieza la acción." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-lg hover:shadow-xl hover:border-red-900/50 transition-all"
                            >
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-slate-400 text-lg leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== MODELOS ICÓNICOS (OSCURO TONO A) ========== */}
            <section id="modelos" className="py-24 md:py-32 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase inline-block relative">
                            Los 4 Jinetes
                            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-2 bg-red-800" />
                        </h2>
                        <p className="text-slate-500 mt-8 tracking-widest uppercase text-sm">Leyendas de los 90s</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {CARS.map((car, index) => (
                            <motion.div
                                key={car.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group relative h-[400px] overflow-hidden bg-slate-800 rounded-lg border border-slate-800 hover:border-red-900/40"
                            >
                                {/* Imagen de fondo */}
                                <div className="absolute inset-0">
                                    <Image
                                        src={car.img}
                                        alt={car.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-70"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                                </div>

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <div className="overflow-hidden mb-2">
                                        <h3 className="text-3xl font-black text-white uppercase transform translate-y-0 transition-transform duration-300">
                                            {car.name}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2 text-red-500 font-mono font-bold mb-4">
                                        <Gauge size={18} />
                                        <span>{car.engine}</span>
                                    </div>
                                    <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                                        <p className="text-slate-300 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 ease-out leading-relaxed max-w-md">
                                            {car.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== CLANDESTINO (OSCURO TONO B) ========== */}
            <section id="clandestino" className="py-32 bg-slate-950 relative overflow-hidden">
                {/* Elementos decorativos sutiles */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[100px]" />

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="flex-1 border-l-4 border-red-800 pl-8 md:pl-12 py-2"
                        >
                            <h2 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase leading-[0.9]">
                                Midnight<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-slate-500">Runner</span>
                            </h2>
                        </motion.div>

                        <div className="flex-1 text-lg text-slate-300 leading-relaxed space-y-6">
                            <p>
                                El <strong className="text-white">Mid Night Club</strong> es quizás la leyenda más famosa. Un club exclusivo donde la única regla era la velocidad: para entrar, tu coche debía ser capaz de superar los 300 km/h sostenidos.
                            </p>
                            <p>
                                Sus carreras en la autopista de la bahía de Tokio (Wangan) son materia de mitos, desafiando a la policía y a la física misma en máquinas modificadas al extremo.
                            </p>
                            <p>
                                Mientras tanto, en los pasos de montaña, nacía la batalla del <strong className="text-white">Touge</strong>. Carreteras estrechas y reviradas donde la potencia bruta importa menos que el equilibrio, los frenos y las manos del piloto.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== CURIOSIDADES (FINAL stone-950) ========== */}
            <section id="curiosidades" className="py-32 bg-stone-950 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black mb-16 text-stone-200 border-b border-stone-800 pb-8 inline-block"
                    >
                        CURIOSIDADES UNDERGROUND
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
                                className="group bg-stone-900/50 backdrop-blur-sm border border-stone-800 p-8 rounded-xl hover:border-red-900/50 transition-all duration-300"
                            >
                                <div className="mb-6 bg-stone-950 text-red-700 w-14 h-14 rounded-full flex items-center justify-center group-hover:bg-red-900/20 group-hover:text-red-500 transition-colors shadow-lg border border-red-900/10">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-stone-200">{item.title}</h3>
                                <p className="text-stone-400 leading-relaxed text-lg group-hover:text-stone-300 transition-colors">
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
