'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";
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

// ============================================================================
// CONSTANTES Y DATOS
// ============================================================================

/** Rutas de las imágenes (Placeholders por ahora) */
const IMAGES = {
    banner: "/images/articulos/jdm/banner.jpg",
    intro: "/images/articulos/jdm/intro.jpg",
    drift: "/images/articulos/jdm/drift.jpg",
    quedadas: "/images/articulos/jdm/quedadas.jpg",
    clandestino: "/images/articulos/jdm/clandestino.jpg",
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

const NavigationPill = () => (
    <nav className="hidden xl:flex flex-col gap-4 fixed left-10 top-1/2 -translate-y-1/2 z-50">
        {[
            { id: '#intro', label: 'Cultura', icon: <Flag size={20} /> },
            { id: '#drift', label: 'Drift', icon: <Car size={20} /> },
            { id: '#quedadas', label: 'Quedadas', icon: <Users size={20} /> },
            { id: '#modelos', label: 'Leyendas', icon: <Zap size={20} /> },
            { id: '#clandestino', label: 'Underground', icon: <AlertTriangle size={20} /> },
            { id: '#curiosidades', label: 'Curiosidades', icon: <Flame size={20} /> },
        ].map((item) => (
            <Link
                key={item.id}
                href={item.id}
                className="group flex items-center gap-3 bg-zinc-950/90 backdrop-blur-md p-3 rounded-full 
                         hover:bg-red-600 hover:text-white transition-all duration-300 
                         w-12 hover:w-40 overflow-hidden whitespace-nowrap 
                         border border-zinc-800 shadow-xl text-zinc-100"
            >
                <span className="min-w-[20px] flex justify-center">{item.icon}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-sm">
                    {item.label}
                </span>
            </Link>
        ))}
    </nav>
);

const SectionTitle = ({ children, align = "left" }: { children: React.ReactNode, align?: "left" | "center" | "right" }) => (
    <h2 className={`text-4xl md:text-6xl font-black mb-12 tracking-tighter uppercase italic transform -skew-x-6
        ${align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"}`}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-white">
            {children}
        </span>
    </h2>
);

// ============================================================================
// PÁGINA PRINCIPAL
// ============================================================================

export default function JdmPage() {
    return (
        <div className="bg-zinc-950 text-white font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
            <NavigationPill />

            {/* ========== HERO SECTION ========== */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Video/Image Placeholder */}
                <div className="absolute inset-0 z-0 bg-zinc-900">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950" />
                    {/* TO-DO: Colocar video de fondo o imagen impactante aquí */}
                    <div className="w-full h-full opacity-30 bg-[url('/images/articulos/jdm/banner.jpg')] bg-cover bg-center" />
                </div>

                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="border-8 border-red-600 p-8 inline-block"
                    >
                        <h1 className="text-8xl md:text-[10rem] leading-none font-black tracking-tighter italic">
                            JDM
                        </h1>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl md:text-4xl font-bold mt-6 tracking-widest text-red-500 uppercase"
                    >
                        Japanese Domestic Market
                    </motion.p>
                </div>
            </section>

            {/* ========== INTRO ========== */}
            <section id="intro" className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <SectionTitle>No es solo<br />una etiqueta</SectionTitle>
                    <p className="text-xl text-zinc-400 leading-relaxed text-justify mb-6">
                        El término <strong className="text-white">JDM</strong> (Japanese Domestic Market) nació para designar a los vehículos y piezas fabricados específicamente para el mercado japonés. Sin embargo, con los años, ha trascendido su definición técnica para convertirse en una <em className="text-red-500">cultura global</em>.
                    </p>
                    <p className="text-xl text-zinc-400 leading-relaxed text-justify">
                        No se trata solo de coches; se trata de una búsqueda obsesiva de la perfección, la estética 'clean', el respeto por la ingeniería y un sentido de comunidad que une a entusiastas de todo el mundo, desde las curvas de Hakone hasta los aparcamientos de Daikoku.
                    </p>
                </div>
                <div className="relative h-[500px] w-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    {/* Placeholder img */}
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-black text-4xl uppercase">
                        Intro Image
                    </div>
                </div>
            </section>

            {/* ========== DRIFT ========== */}
            <section id="drift" className="py-24 bg-zinc-900 relative clip-path-slant">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 relative h-[400px] bg-zinc-800/50 rounded-lg overflow-hidden">
                            {/* Placeholder img */}
                            <div className="absolute inset-0 flex items-center justify-center text-zinc-600 font-bold text-2xl uppercase">
                                Drift Action
                            </div>
                        </div>
                        <div className="order-1 md:order-2 text-right">
                            <SectionTitle align="right">El Arte del<br />Descontrol</SectionTitle>
                            <p className="text-lg text-zinc-300 mb-6">
                                Nacido en las montañas (Touge) de Japón, el <strong className="text-red-500">Drift</strong> es la máxima expresión de control sobre el caos. No se busca llegar el primero, sino hacerlo con el mayor estilo y ángulo posible.
                            </p>
                            <p className="text-lg text-zinc-300">
                                Figuras como <span className="text-white font-bold">Keiichi Tsuchiya</span> (el Drift King) llevaron esta técnica de las carreteras ilegales a los circuitos profesionales, convirtiéndola en un deporte que exige una sincronización perfecta entre hombre y máquina.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== QUEDADAS (MEETS) ========== */}
            <section id="quedadas" className="py-24 bg-zinc-950 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <SectionTitle align="center">Daikoku Futo &<br />La Cultura del Parking</SectionTitle>
                    <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-12">
                        En Japón, las áreas de servicio (PA) no son solo para descansar. Son templos improvisados donde se reúnen las máquinas más increíbles de la noche.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: "Respeto", desc: "Nadie toca el coche de otro. Se admira con la mirada." },
                            { title: "Variedad", desc: "Desde Kei cars tuneados hasta Lamborghinis con neones." },
                            { title: "Silencio", desc: "A pesar de los motores, impera un orden casi religioso hasta que empieza la acción." }
                        ].map((item, i) => (
                            <div key={i} className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 hover:border-red-600/50 transition-colors">
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-zinc-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== MODELOS ICÓNICOS ========== */}
            <section id="modelos" className="py-24 bg-white text-zinc-900">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-5xl md:text-7xl font-black mb-16 text-center tracking-tighter uppercase italic text-red-500">
                        Los 4 Jinetes
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {CARS.map((car) => (
                            <div key={car.id} className="group relative h-[400px] overflow-hidden bg-zinc-100 mb-4 md:mb-0">
                                <div className="absolute inset-0 bg-zinc-300 flex items-center justify-center">
                                    <span className="text-zinc-400 font-bold text-xl">Imagen: {car.name}</span>
                                    {/* Aquí iría el Image component real */}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-300" />

                                <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-3xl font-black text-white mb-1 uppercase italic">{car.name}</h3>
                                    <div className="flex items-center gap-2 text-red-500 font-mono font-bold mb-4">
                                        <Gauge size={18} />
                                        <span>{car.engine}</span>
                                    </div>
                                    <p className="text-zinc-300 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        {car.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== CLANDESTINO / CARRERAS ========== */}
            <section id="clandestino" className="py-32 bg-zinc-950 relative overflow-hidden">
                {/* Elementos decorativos de fondo */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="border-l-4 border-red-600 pl-8 md:pl-16 py-4"
                    >
                        <h2 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase leading-[0.9]">
                            Underground<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600">Racing</span>
                        </h2>
                        <p className="text-2xl text-zinc-300 font-light mb-8 max-w-2xl">
                            Cuando cae el sol, la Wangan y el Touge cobran vida.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-16 mt-16 text-lg text-zinc-400 leading-relaxed">
                        <div>
                            <p className="mb-6">
                                El <strong className="text-white">Mid Night Club</strong> es quizás la leyenda más famosa. Un club exclusivo donde la única regla era la velocidad: para entrar, tu coche debía ser capaz de superar los 300 km/h sostenidos.
                            </p>
                            <p>
                                Sus carreras en la autopista de la bahía de Tokio (Wangan) son materia de mitos, desafiando a la policía y a la física misma en máquinas modificadas al extremo.
                            </p>
                        </div>
                        <div>
                            <p className="mb-6">
                                Mientras tanto, en las montañas, nacía la batalla del <strong className="text-white">Touge</strong>. Carreteras estrechas y reviradas donde la potencia bruta importa menos que el equilibrio, los frenos y las manos del piloto.
                            </p>
                            <p>
                                Esta dualidad entre la "velocidad máxima" de la autopista y la "técnica" de la montaña define el alma de las carreras callejeras japonesas.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== CURIOSIDADES ========== */}
            <section id="curiosidades" className="py-32 bg-zinc-950 relative overflow-hidden">
                {/* Elementos decorativos de fondo */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="mb-16 text-center">
                        <SectionTitle align="center">Curiosidades<br />Underground</SectionTitle>
                        <p className="text-xl text-zinc-400 mt-6 max-w-2xl mx-auto font-light">
                            Secretos a voces de la escena automovilística japonesa.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {CURIOSITIES.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-8 rounded-xl hover:border-red-600/50 transition-all duration-300"
                            >
                                <div className="mb-6 bg-zinc-950 text-red-500 w-14 h-14 rounded-full flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors shadow-lg border border-red-900/30">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-white italic">{item.title}</h3>
                                <p className="text-zinc-400 leading-relaxed text-sm group-hover:text-zinc-300 transition-colors">
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
