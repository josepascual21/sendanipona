'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import {
    BookOpen,
    Clock,
    Users,
    Sparkles,
    Scroll
} from 'lucide-react';
import LegendsCarousel, { Legend } from "./LegendsCarousel";

// ============================================================================
// CONSTANTES Y DATOS
// ============================================================================

/** Rutas de las imágenes utilizadas en el artículo */
const IMAGES = {
    banner: "/images/articulos/pasado/banner.jpg",
    samurai: "/images/articulos/pasado/samurai.jpg",
    personajes: {
        hokusai: "/images/articulos/pasado/personajes/hokusai-katsushika.jpg",
        ieyasu: "/images/articulos/pasado/personajes/ieyasu.jpg",
        minamoto: "/images/articulos/pasado/personajes/minamoto-no-yoritomo.jpg",
        murasaki: "/images/articulos/pasado/personajes/murasaki-shikibu.jpg",
        miyamoto: "/images/articulos/pasado/personajes/musashi-miyamoto.jpg",
        oda: "/images/articulos/pasado/personajes/oda-nobunaga.jpg",
        ryoma: "/images/articulos/pasado/personajes/ryoma.jpg",
        shokotu: "/images/articulos/pasado/personajes/shotoku.jpg",
        toyotomi: "/images/articulos/pasado/personajes/toyotomi-hideyoshi.jpg",
    },
    leyendas: {
        izanagi: "/images/articulos/pasado/leyendas/izanami-izanagi.jpg",
        amaterasu: "/images/articulos/pasado/leyendas/amaterasu.jpg",
        tsukuyomi: "/images/articulos/pasado/leyendas/tsukuyomi.jpg",
        susanoo: "/images/articulos/pasado/leyendas/susanoo.jpg",
        kuchisake: "/images/articulos/pasado/leyendas/kuchisake-onna.jpg"
    }
};

/** Datos de las leyendas para el carrusel */
const LEGENDS_DATA: Legend[] = [
    {
        id: "izanagi-izanami",
        title: "Izanagi e Izanami",
        subtitle: "El origen del archipiélago",
        shortDesc: "El origen del archipiélago japonés según el sintoísmo.",
        fullDesc: `Izanami e Izanagi son los dioses primordiales de la religión sintoísta. 
Se relata que en el principio de los tiempos, Izanagi e Izanami fueron 
convocados por las otras deidades primordiales para crear la tierra y 
poblaciones en el mundo. Estas deidades utilizaron una lanza celestial 
para agitar las aguas primordiales, y cuando la retiraron, las gotas que 
cayeron formaron las islas de Japón. Después de crear las islas, Izanagi 
e Izanami descendieron a ellas y crearon la tierra fértil y las montañas. 
También engendraron una multitud de dioses y diosas que dieron origen a 
diferentes aspectos de la naturaleza y la vida.`,
        image: IMAGES.leyendas.izanagi
    },
    {
        id: "amaterasu",
        title: "El despertar de Amaterasu",
        subtitle: "La Diosa del Sol",
        shortDesc: "El regreso de la luz al mundo.",
        fullDesc: `Según la leyenda, Amaterasu, la diosa del sol y la principal deidad sintoísta, 
se retiró a una cueva celestial tras una disputa con su hermano, Susanoo, 
el dios de la tormenta. La ausencia de Amaterasu sumió al mundo en la oscuridad 
y el caos. Los otros dioses intentaron sin éxito convencerla de salir de la cueva. 
Finalmente, lograron atraerla con un plan elaborado que involucraba la danza y la 
música de la diosa Uzume. Intrigada por el alboroto fuera de la cueva, Amaterasu 
asomó la cabeza y, al ver su propio resplandor reflejado en un espejo sagrado, 
quedó cautivada y salió completamente de la cueva. El regreso de Amaterasu trajo 
la luz de vuelta al mundo y restauró el orden. Este episodio resalta la importancia 
de Amaterasu como fuente de luz y vida, así como el poder de la música y la alegría 
para disipar la oscuridad y restaurar la armonía.`,
        image: IMAGES.leyendas.amaterasu
    },
    {
        id: "tsukuyomi",
        title: "La ofensa de Tsukuyomi hacia Amaterasu",
        subtitle: "Dos hermanos enfrentados eternamente",
        shortDesc: "Por esta razón la Luna y el Sol nunca se encuentran.",
        fullDesc: `Tsukuyomi ascendió a los cielos mediante la escalera celestial, donde vivió con su hermana, 
Amaterasu, la diosa solar, hasta que este mató a Uke Mochi, la diosa de la comida.
Este suceso ocurrió durante una gran fiesta celebrada por Uke Mochi, en la que invitó 
a muchos dioses a su palacio. Amaterasu no pudo asistir, por lo que envió a Tsukuyomi 
en representación de ambos. Fue durante la fiesta que Tsukuyomi vio como preparaba el festín, 
pero le pareció increíblemente repulsivo al observar que Uke Mochi obtenía los alimentos
de formas repulsivas, fue en ese momento que Tsukuyomi, horrorizado por sus acciones, mató a Uke Mochi.
Desde entonces, Amaterasu se enfadó tanto que aseguró que nunca volvería a ver a Tsukuyomi, y 
se movía de un lado al otro del cielo evitando al dios. Por esta razón la Luna y el Sol nunca se encuentran.`,
        image: IMAGES.leyendas.tsukuyomi
    },
    {
        id: "susanoo",
        title: "La batalla de Susanoo contra Yamata no Orochi",
        subtitle: "El triunfo tras el destierro",
        shortDesc: "El heroico rescate mediante el ingenio, emborrachando a la bestia de 8 cabezas.",
        fullDesc: `Este relato acontece tras la expulsión de Susanoo de los cielos por parte de su hermana Amaterasu. Este se dio
por culpa de Susanoo al haber engañado a su hermana gravemente y también haber causado estragos en el cielo con
sus travesuras.

Yamata no Orochi era una serpiente de ocho cabezas y ocho colas que causaba estragos en la tierra y exigía 
sacrificios humanos. Susanoo, el dios de la tormenta y hermano de Amaterasu, se encontró con Orochi mientras 
deambulaba por la tierra. Al descubrir el sufrimiento de una familia local, Susanoo decidió enfrentarse a Orochi. 
Ofreciéndose a sí mismo como sacrificio, Susanoo emborrachó al monstruo con sake en cada una de sus cabezas. 
Una vez que Orochi estaba ebrio y dormido, Susanoo aprovechó la oportunidad para atacar, cortando cada una de 
sus cabezas. Sin embargo, cuando llegó a la última cabeza, Susanoo descubrió la espada sagrada Kusanagi 
dentro del cuerpo de Orochi. Esta espada resultó ser un arma poderosa que Susanoo luego presentó a su hermana 
Amaterasu como un símbolo de reconciliación. La victoria sobre Yamata no Orochi solidificó la posición de Susanoo 
como un héroe en la mitología japonesa y ayudó a restaurar la paz en la tierra.`,
        image: IMAGES.leyendas.susanoo
    },
    {
        id: "kuchisake",
        title: "Kuchisake-onna",
        subtitle: "Terror Urbano",
        shortDesc: "Este nombre se le atribuyó por su rasgo físico más característico, su boca cortada.",
        fullDesc: `La leyenda cuenta que esta mujer suele aparecerse con una mascarilla quirúrgica, 
lo que es normal en los japoneses que buscan cuidarse de resfriados o enfermedades. 
Sus víctimas son principalmente niños y si la llegases a encontrar te detendrá y te 
preguntará si es bella, si respondes que no, te cortará la cabeza con unas tijeras, 
pero si respondes que sí, se quitará la máscara mostrando su boca cortada y volverá 
a preguntar si es bella, si en esta ocasión respondes que no, te cortará a la mitad, 
pero si respondes que sí, se alegrará y te cortará la boca de oreja a oreja dejándote como ella.
Es imposible correr y escaparse ya que si lo intentas ella reaparecerá frente a ti y 
no se irá hasta que contestes a su pregunta. Tal ha sido el miedo por esta leyenda 
que varios colegios hacen que sus profesores acompañen a los alumnos a sus casas para que lleguen seguros.`,
        image: IMAGES.leyendas.kuchisake
    }
];

/** Periodos históricos de Japón */
const PERIODS = [
    { era: "Jomon", periodo: "14,000 a.C. - 300 a.C.", desc: "Período prehistórico, cerámica característica" },
    { era: "Yayoi", periodo: "300 a.C. - 300 d.C.", desc: "Introducción de la agricultura y el arroz" },
    { era: "Kofun", periodo: "300 - 538 d.C.", desc: "Túmulos funerarios, consolidación de la sociedad" },
    { era: "Asuka", periodo: "538 - 710 d.C.", desc: "Introducción del budismo, sistema de gobierno centralizado" },
    { era: "Nara", periodo: "710 - 794 d.C.", desc: "Establecimiento de la capital en Nara, influencia cultural china" },
    { era: "Heian", periodo: "794 - 1185 d.C.", desc: "La corte imperial, desarrollo de la cultura aristocrática" },
    { era: "Kamakura", periodo: "1185 - 1333 d.C.", desc: "Surgimiento del shogunato, samuráis y guerras civiles" },
    { era: "Muromachi", periodo: "1336 - 1573 d.C.", desc: "Gobierno feudal, auge de las artes y la cultura" },
    { era: "Azuchi-Momoyama", periodo: "1573 - 1603 d.C.", desc: "Unificación de Japón, construcción de castillos" },
    { era: "Edo", periodo: "1603 - 1868 d.C.", desc: "Shogunato Tokugawa, aislamiento del país, paz interna" },
    { era: "Meiji", periodo: "1868 - 1912 d.C.", desc: "Restauración Meiji, modernización y occidentalización" },
    { era: "Taisho", periodo: "1912 - 1926 d.C.", desc: "Democratización, crecimiento económico" },
    { era: "Showa", periodo: "1926 - 1989 d.C.", desc: "Período de guerra, reconstrucción, crecimiento" },
    { era: "Heisei", periodo: "1989 - 2019 d.C.", desc: "Estabilidad, avances tecnológicos" },
    { era: "Reiwa", periodo: "2019 - presente", desc: "Nueva era bajo el emperador Naruhito" },
];

/** Personajes históricos destacados */
const CHARACTERS = [
    { name: "Príncipe Shōtoku", years: "574-622 d.C", desc: "Líder político semi-legendario, regente durante el periodo Asuka.", img: IMAGES.personajes.shokotu },
    { name: "Oda Nobunaga", years: "1534-1582 d.C", desc: "Gran guerrero y primer unificador de Japón durante el periodo Sengoku.", img: IMAGES.personajes.oda },
    { name: "Toyotomi Hideyoshi", years: "1537-1598 d.C", desc: "Segundo unificador de Japón, conocido como 'Saru' (el mono).", img: IMAGES.personajes.toyotomi },
    { name: "Sakamoto Ryōma", years: "1836-1867 d.C", desc: "Samurái visionario crucial en la Restauración Meiji.", img: IMAGES.personajes.ryoma },
    { name: "Murasaki Shikibu", years: "973-1025 d.C", desc: "Escritora de 'Genji Monogatari', la primera novela de la historia.", img: IMAGES.personajes.murasaki },
    { name: "Minamoto No Yoritomo", years: "1147-1199 d.C", desc: "Fundador y primer shogun del shogunato Kamakura.", img: IMAGES.personajes.minamoto },
    { name: "Tokugawa Ieyasu", years: "1543-1616 d.C", desc: "Fundador del shogunato Tokugawa que trajo siglos de paz.", img: IMAGES.personajes.ieyasu },
    { name: "Katsushika Hokusai", years: "1760-1849 d.C", desc: "Maestro del Ukiyo-e, autor de 'La gran ola de Kanagawa'.", img: IMAGES.personajes.hokusai },
    { name: "Musashi Miyamoto", years: "1584-1645 d.C", desc: "Legendario espadachín invicto y autor de 'El libro de los cinco anillos'.", img: IMAGES.personajes.miyamoto },
];

/** Curiosidades históricas */
const CURIOSITIES = [
    {
        icon: <Scroll className="w-6 h-6" />,
        title: "El Código Bushido",
        text: "Los samuráis seguían un estricto código de honor que valoraba la lealtad hasta la muerte por encima de la propia vida."
    },
    {
        icon: <BookOpen className="w-6 h-6" />,
        title: "Castillo de Himeji",
        text: "Conocido como la 'Garza Blanca', su diseño es una trampa mortal laberíntica para confundir a los invasores."
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: "Ninjas (Shinobi)",
        text: "Maestros del espionaje y la guerra de guerrillas, utilizaban herramientas ingeniosas y psicología para vencer."
    },
    {
        icon: <Sparkles className="w-6 h-6" />,
        title: "Jardines Zen",
        text: "Diseñados para la meditación, representan el universo mediante la disposición minimalista de rocas y arena."
    },
    {
        icon: <Clock className="w-6 h-6" />,
        title: "Revolución Meiji",
        text: "En pocas décadas, Japón pasó de ser una sociedad feudal aislada a una potencia industrial mundial."
    },
    {
        icon: <BookOpen className="w-6 h-6" />,
        title: "La Era Heian",
        text: "Considerada la edad de oro de la literatura japonesa, donde florecieron el arte y la poesía cortesana."
    },
];

// ============================================================================
// COMPONENTES
// ============================================================================

/** Componente de navegación flotante lateral (píldora) */
const NavigationPill = () => (
    <nav className="hidden xl:flex flex-col gap-4 fixed left-10 top-1/2 -translate-y-1/2 z-50">
        {[
            { id: '#introduccion', label: 'Introducción', icon: <BookOpen size={20} /> },
            { id: '#periodos', label: 'Periodos', icon: <Clock size={20} /> },
            { id: '#personajes', label: 'Personajes', icon: <Users size={20} /> },
            { id: '#leyendas', label: 'Leyendas', icon: <Scroll size={20} /> },
            { id: '#curiosidades', label: 'Curiosidades', icon: <Sparkles size={20} /> },
        ].map((item) => (
            <Link
                key={item.id}
                href={item.id}
                className="group flex items-center gap-3 bg-white/80 backdrop-blur-md p-3 rounded-full 
                         hover:bg-amber-700 hover:text-white transition-all duration-300 
                         w-12 hover:w-48 overflow-hidden whitespace-nowrap 
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

/** Título de sección con barra decorativa */
const SectionTitle = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
    <h2 className={`text-4xl md:text-5xl font-black mb-12 relative inline-block tracking-tight ${light ? 'text-amber-50' : 'text-slate-900'
        }`}>
        {children}
        <span className={`absolute -bottom-2 right-0 w-24 h-2 ${light ? 'bg-amber-400' : 'bg-amber-600'}`} />
    </h2>
);

// ============================================================================
// PÁGINA PRINCIPAL
// ============================================================================

export default function PasadoPage() {
    return (
        <div className="bg-slate-900 text-slate-100 font-sans selection:bg-amber-600 selection:text-white">
            <NavigationPill />

            {/* ========== HERO SECTION (Visualmente igual, ajustando selección) ========== */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Imagen de fondo con overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={IMAGES.banner}
                        alt="Banner Pasado de Japón"
                        fill
                        className="object-cover opacity-70"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900" />
                </div>

                {/* Título animado centrado */}
                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-8xl md:text-[12rem] leading-none font-black text-white tracking-tighter font-ai-love"
                    >
                        PASADO
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl md:text-3xl font-light tracking-[0.3em] text-amber-200 uppercase mt-4"
                    >
                        El alma del País del Sol Naciente
                    </motion.p>
                </div>

                {/* Indicador de scroll */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-xs uppercase tracking-widest text-slate-400">Descubre</span>
                    <div className="w-[1px] h-16 bg-amber-600" />
                </motion.div>
            </section>

            <div className="relative z-10">

                {/* ========== SECCIÓN INTRODUCCIÓN (Mejor contraste) ========== */}
                <section id="introduccion" className="min-h-screen flex items-center py-24 bg-[#fdfbf7] text-slate-800">
                    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                        {/* Texto */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <SectionTitle>Filosofía y Guerras</SectionTitle>
                            <div className="text-lg leading-relaxed text-slate-700 space-y-6 text-justify">
                                <p>
                                    En este apartado vamos a profundizar en las
                                    <span className="text-amber-800 font-bold"> épocas históricas de Japón</span> y
                                    los personajes que las definieron. Expondremos primero las eras, detallando su
                                    importancia y características únicas para comprender la evolución del país.
                                </p>
                                <p>
                                    Posteriormente, conocerás a los personajes históricos que dieron forma al
                                    folclore y la política japonesa. Esta sección busca explicar por qué Japón
                                    es un país tan único, mostrando la eterna paradoja entre su
                                    <span className="text-amber-800 font-bold"> refinamiento cultural</span> casi
                                    ilimitado y la brutalidad de las guerras que han marcado la historia del sol naciente.
                                </p>
                            </div>
                        </motion.div>

                        {/* Imagen del samurái con marco creativo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[70vh] w-full"
                        >
                            <div className="absolute top-0 right-0 w-4/5 h-4/5 z-20 shadow-2xl rounded-t-full overflow-hidden border-8 border-double border-stone-200">
                                <Image
                                    src={IMAGES.samurai}
                                    alt="Samurai"
                                    fill
                                    className="object-cover sepia-[.1]"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 w-3/5 h-3/5 bg-amber-900 z-10 mix-blend-multiply opacity-80 rounded-lg" />
                            <div className="absolute top-10 left-10 w-full h-full border-2 border-stone-900/10 z-0 rounded-t-full" />
                        </motion.div>
                    </div>
                </section>

                {/* ========== SECCIÓN PERIODOS (Tipografía ajustada) ========== */}
                <section id="periodos" className="py-32 bg-slate-900 text-slate-200 overflow-hidden">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="text-center mb-20">
                            <motion.h2
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-black text-white mb-6"
                            >
                                LAS ERAS DE JAPÓN
                            </motion.h2>
                            <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
                            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                                Un viaje a través de más de 15,000 años de historia.
                            </p>
                        </div>

                        {/* Timeline vertical */}
                        <div className="space-y-12 relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-0 before:bottom-0 before:w-px before:bg-slate-700">
                            {PERIODS.map((period, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05, duration: 0.5 }}
                                    className={`flex items-center gap-8 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} relative`}
                                >
                                    {/* Lado izquierdo o derecho según índice */}
                                    <div className={`flex-1 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                        <h3 className="text-xl md:text-2xl font-bold text-amber-500">{period.era}</h3>
                                        <p className="text-sm font-mono text-slate-500 mt-1">{period.periodo}</p>
                                    </div>

                                    {/* Punto central */}
                                    <div className="w-3 h-3 bg-amber-600 rounded-full z-10 ring-4 ring-slate-900 flex-shrink-0" />

                                    {/* Descripción */}
                                    <div className={`flex-1 ${idx % 2 === 0 ? 'text-left' : 'text-right'}`}>
                                        <p className="text-slate-300 text-lg leading-relaxed">{period.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== SECCIÓN PERSONAJES ========== */}
                <section id="personajes" className="py-32 bg-[#f0eee9] text-slate-900">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <SectionTitle>Personajes Históricos</SectionTitle>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto mt-6">
                                Los líderes, artistas y guerreros que definieron la historia japonesa.
                            </p>
                        </motion.div>

                        {/* Grid de personajes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {CHARACTERS.map((person, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="group bg-white rounded-xl shadow-md border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="h-64 relative overflow-hidden">
                                        <Image
                                            src={person.img}
                                            alt={person.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        <div className="absolute bottom-0 left-0 p-5">
                                            <h3 className="text-white font-bold text-xl drop-shadow-md">{person.name}</h3>
                                            <p className="text-amber-400 text-xs font-bold uppercase tracking-wider mt-1">{person.years}</p>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-slate-700 text-lg leading-relaxed">{person.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== SECCIÓN LEYENDAS (Fondo claro para contraste con carrusel oscuro) ========== */}
                <section id="leyendas" className="py-32 bg-stone-100 text-slate-900">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <SectionTitle>Leyendas y Mitología</SectionTitle>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-serif italic mt-6">
                                &ldquo;Historias ancestrales que forjaron el espíritu de una nación.&rdquo;
                            </p>
                        </motion.div>

                        <LegendsCarousel legends={LEGENDS_DATA} />
                    </div>
                </section>

                {/* ========== SECCIÓN CURIOSIDADES (Ahora en tonos oscuros elegantes) ========== */}
                <section id="curiosidades" className="py-32 bg-stone-900 text-stone-300">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-black mb-16 text-white border-b border-stone-700 pb-8 inline-block">
                            CURIOSIDADES DEL PASADO
                        </h2>

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
                                    <div className="mb-6 bg-stone-800 text-amber-500 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:bg-amber-900/30 group-hover:text-amber-400 transition-colors shadow-inner">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-stone-100">{item.title}</h3>
                                    <p className="text-stone-400 leading-relaxed text-lg border-l-2 border-stone-800 pl-4 group-hover:border-amber-700 transition-colors">
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
