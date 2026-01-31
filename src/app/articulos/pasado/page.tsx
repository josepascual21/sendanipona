import Image from "next/image";
import Link from "next/link";
import {
    ClockIcon,
    BookOpenIcon,
    UserIcon,
    SparklesIcon,
    ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";

// Constantes para las imágenes
const IMAGES = {
    banner: "/mediacontent/articulos/pasado/banner.jpg",
    samurai: "/mediacontent/articulos/pasado/samurai.png",
    leyendas: {
        izanagi: "/mediacontent/articulos/pasado/leyendas/izanagi-izanami.jpg",
        amaterasu: "/mediacontent/articulos/pasado/leyendas/amaterasu.jpg",
        susanoo: "/mediacontent/articulos/pasado/leyendas/susanoo.jpg",
        kuchisake: "/mediacontent/articulos/pasado/leyendas/kuchisake-onna.jpg",
    }
};

type SectionLinkProps = {
    href: string;
    label: string;
    icon?: React.ReactNode;
};

const SectionLink = ({ href, label, icon }: SectionLinkProps) => (
    <li>
        <Link
            href={href}
            className="flex items-center gap-2 text-slate-700 hover:text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg transition-all duration-300 font-medium"
        >
            {icon && <span className="w-5 h-5">{icon}</span>}
            {label}
        </Link>
    </li>
);

export default function PasadoPage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Banner Principal */}
            <div className="relative w-full h-[60vh] overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay para legibilidad */}
                <Image
                    src={IMAGES.banner}
                    alt="Banner Pasado Japón"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4">
                    <h1 className="font-ai-love text-6xl md:text-8xl mb-4 drop-shadow-lg filter">
                        Estudia su Pasado
                    </h1>
                    <p className="text-xl md:text-2xl font-light tracking-wide max-w-2xl drop-shadow-md">
                        Un viaje a través de las eras, guerras y leyendas que forjaron la identidad del País del Sol Naciente.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">

                {/* Barra Lateral de Navegación (Sticky) */}
                <aside className="lg:w-1/4 hidden lg:block">
                    <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-6 border-b pb-2 border-slate-100">
                            Contenido del Artículo
                        </h3>
                        <ul className="space-y-2">
                            <SectionLink href="#introduccion" label="Introducción" icon={<BookOpenIcon />} />
                            <SectionLink href="#periodos" label="Periodos Históricos" icon={<ClockIcon />} />
                            <SectionLink href="#personajes" label="Personajes Clave" icon={<UserIcon />} />
                            <SectionLink href="#curiosidades" label="Curiosidades" icon={<SparklesIcon />} />
                            <SectionLink href="#leyendas" label="Leyendas" icon={<SparklesIcon />} />
                            <SectionLink href="#comentarios" label="Comentarios" icon={<ChatBubbleLeftRightIcon />} />
                        </ul>
                    </div>
                </aside>

                {/* Contenido Principal */}
                <article className="lg:w-3/4 space-y-20">

                    {/* Sección Introducción */}
                    <section id="introduccion" className="scroll-mt-28 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
                        <div className="grid md:grid-cols-3 gap-8 items-center">
                            <div className="md:col-span-2 space-y-6 text-slate-600 leading-relaxed text-lg text-justify">
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                    <span className="w-2 h-10 bg-orange-500 rounded-full"></span>
                                    Filosofía y Guerras
                                </h2>
                                <p>
                                    En este apartado vamos a profundizar en las épocas históricas de Japón y los personajes que las definieron.
                                    Expondremos primero las eras, detallando su importancia y características únicas para comprender la evolución del país.
                                </p>
                                <p>
                                    Posteriormente, conocerás a los personajes históricos que dieron forma al folclore y la política japonesa.
                                    Esta sección busca explicar por qué Japón es un país tan único, mostrando la eterna paradoja entre su refinamiento cultural
                                    casi ilimitado y la brutalidad de las guerras que han marcado la historia del sol naciente.
                                </p>
                            </div>
                            <div className="md:col-span-1 flex justify-center">
                                <div className="relative w-full aspect-[3/4] max-w-xs">
                                    <Image
                                        src={IMAGES.samurai}
                                        alt="Ilustración Samurai"
                                        fill
                                        className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sección Periodos */}
                    <section id="periodos" className="scroll-mt-28">
                        <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                            <span className="w-2 h-10 bg-orange-500 rounded-full"></span>
                            Los Grandes Periodos de Japón
                        </h2>
                        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                            <table className="w-full text-left border-collapse bg-white">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 font-bold text-slate-700 text-sm uppercase tracking-wider border-b border-slate-200">Era</th>
                                        <th className="px-6 py-4 font-bold text-slate-700 text-sm uppercase tracking-wider border-b border-slate-200">Período</th>
                                        <th className="px-6 py-4 font-bold text-slate-700 text-sm uppercase tracking-wider border-b border-slate-200">Características Destacadas</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {[
                                        { era: "Jomon", periodo: "14,000 a.C. - 300 a.C.", desc: "Período prehistórico, cerámica característica" },
                                        { era: "Yayoi", periodo: "300 a.C. - 300 d.C.", desc: "Introducción de la agricultura y el arroz" },
                                        { era: "Kofun", periodo: "300 - 538 d.C.", desc: "Túmulos funerarios, consolidación de la sociedad" },
                                        { era: "Asuka", periodo: "538 - 710 d.C.", desc: "Introducción del budismo, sistema de gobierno centralizado" },
                                        { era: "Nara", periodo: "710 - 794 d.C.", desc: "Establecimiento de la capital en Nara, influencia cultural china" },
                                        { era: "Heian", periodo: "794 - 1185 d.C.", desc: "Periodo de la corte imperial, desarrollo de la cultura aristocrática" },
                                        { era: "Kamakura", periodo: "1185 - 1333 d.C.", desc: "Surgimiento del shogunato, samuráis y guerras civiles" },
                                        { era: "Muromachi", periodo: "1336 - 1573 d.C.", desc: "Gobierno feudal, auge de las artes y la cultura" },
                                        { era: "Azuchi-Momoyama", periodo: "1573 - 1603 d.C.", desc: "Unificación de Japón bajo Toyotomi Hideyoshi, construcción de castillos" },
                                        { era: "Edo (Tokugawa)", periodo: "1603 - 1868 d.C.", desc: "Shogunato Tokugawa, aislamiento del país, paz interna" },
                                        { era: "Meiji", periodo: "1868 - 1912 d.C.", desc: "Restauración Meiji, modernización y occidentalización" },
                                        { era: "Taisho", periodo: "1912 - 1926 d.C.", desc: "Democratización, crecimiento económico, y efervescencia cultural" },
                                        { era: "Showa", periodo: "1926 - 1989 d.C.", desc: "Período de guerra, reconstrucción, crecimiento económico, y cambios sociales" },
                                        { era: "Heisei", periodo: "1989 - 2019 d.C.", desc: "Periodo de estabilidad, avances tecnológicos y desastres naturales" },
                                        { era: "Reiwa", periodo: "2019 - presente", desc: "Inicio de una nueva era bajo el emperador Naruhito" },
                                    ].map((row, idx) => (
                                        <tr key={idx} className="hover:bg-orange-50/30 transition-colors">
                                            <td className="px-6 py-4 font-semibold text-slate-800">{row.era}</td>
                                            <td className="px-6 py-4 text-slate-600 font-mono text-sm whitespace-nowrap">{row.periodo}</td>
                                            <td className="px-6 py-4 text-slate-600">{row.desc}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Sección Personajes */}
                    <section id="personajes" className="scroll-mt-28">
                        <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                            <span className="w-2 h-10 bg-orange-500 rounded-full"></span>
                            Personajes Históricos
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[
                                { name: "Príncipe Shōtoku", years: "574-622 d.C", desc: "Líder político semi-legendario, regente durante el periodo Asuka." },
                                { name: "Oda Nobunaga", years: "1534-1582 d.C", desc: "Gran guerrero y primer unificador de Japón durante el periodo Sengoku." },
                                { name: "Toyotomi Hideyoshi", years: "1537-1598 d.C", desc: "Segundo unificador de Japón, conocido como 'Saru' (el mono)." },
                                { name: "Sakamoto Ryōma", years: "1836-1867 d.C", desc: "Samurái visionary crucial en la Restauración Meiji y la modernización." },
                                { name: "Murasaki Shikibu", years: "973-1025 d.C", desc: "Escritora de 'Genji Monogatari', la primera novela de la historia." },
                                { name: "Minamoto No Yoritomo", years: "1147-1199 d.C", desc: "Fundador y primer shogun del shogunato Kamakura." },
                                { name: "Tokugawa Ieyasu", years: "1543-1616 d.C", desc: "Fundador del shogunato Tokugawa que trajo siglos de paz." },
                                { name: "Katsushika Hokusai", years: "1760-1849 d.C", desc: "Maestro del Ukiyo-e, autor de 'La gran ola de Kanagawa'." },
                                { name: "Musashi Miyamoto", years: "1584-1645 d.C", desc: "Legendario espadachín invicto y autor de 'El libro de los cinco anillos'." },
                            ].map((person, idx) => (
                                <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="h-48 bg-slate-200 relative overflow-hidden">
                                        {/* TODO: Integrar imágenes reales de personajes aquí */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                            <h3 className="text-white font-bold text-xl">{person.name}</h3>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <p className="text-xs font-bold text-orange-600 mb-2 uppercase tracking-wide">{person.years}</p>
                                        <p className="text-slate-600 text-sm leading-relaxed">{person.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Sección Curiosidades */}
                    <section id="curiosidades" className="scroll-mt-28 bg-orange-50 rounded-3xl p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                            <span className="w-2 h-10 bg-orange-500 rounded-full"></span>
                            Curiosidades del Pasado
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                { title: "El Código Bushido", text: "Los samuráis seguían un estricto código de honor que valoraba la lealtad hasta la muerte por encima de la propia vida." },
                                { title: "Castillo de Himeji", text: "Conocido como la 'Garza Blanca', su diseño es una trampa mortal laberíntica para confundir a los invasores." },
                                { title: "Ninjas (Shinobi)", text: "Maestros del espionaje y la guerra de guerrillas, utilizaban herramientas ingeniosas y psicología para vencer." },
                                { title: "Jardines Zen", text: "Diseñados para la meditación, representan el universo mediante la disposición minimalista de rocas y arena." },
                                { title: "Revolución Meiji", text: "En pocas décadas, Japón pasó de ser una sociedad feudal aislada a una potencia industrial mundial." },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-orange-100">
                                    <h3 className="text-lg font-bold text-slate-800 mb-3 text-gradient bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Sección Leyendas */}
                    <section id="leyendas" className="scroll-mt-28">
                        <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                            <span className="w-2 h-10 bg-orange-500 rounded-full"></span>
                            Leyendas y Mitología
                        </h2>

                        <div className="grid gap-8">
                            {[
                                {
                                    title: "Izanagi e Izanami",
                                    subtitle: "El Origen del Archipiélago",
                                    desc: "Los dioses primordiales que crearon las islas de Japón agitando el océano con una lanza celestial enjoyada.",
                                    image: IMAGES.banner // Placeholder
                                },
                                {
                                    title: "Amaterasu",
                                    subtitle: "La Diosa del Sol",
                                    desc: "Cuando se encerró en una cueva, el mundo se sumió en oscuridad hasta que la curiosidad y la risa la hicieron salir.",
                                    image: IMAGES.banner // Placeholder
                                },
                                {
                                    title: "Susanoo vs Orochi",
                                    subtitle: "El Dios Tormenta y el Dragón",
                                    desc: "El heroico rescate mediante el ingenio, emborrachando a la bestia de 8 cabezas para derrotarla.",
                                    image: IMAGES.banner // Placeholder
                                },
                                {
                                    title: "Kuchisake-onna",
                                    subtitle: "Terror Urbano",
                                    desc: "La mujer de la boca cortada que acecha en la niebla preguntando si es hermosa... una leyenda que aterroriza aún hoy.",
                                    image: IMAGES.banner // Placeholder
                                },
                            ].map((legend, idx) => (
                                <div key={idx} className="group relative overflow-hidden rounded-2xl shadow-md h-64 md:h-80 flex items-end">
                                    <Image
                                        src={legend.image} // TODO: Usar imágenes específicas generadas
                                        alt={legend.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-300" />

                                    <div className="relative p-6 md:p-8 w-full transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <h3 className="text-2xl font-bold text-white mb-1">{legend.title}</h3>
                                                <p className="text-orange-400 font-medium text-sm mb-3 uppercase tracking-wider">{legend.subtitle}</p>
                                                <p className="text-slate-200 text-sm max-w-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                    {legend.desc}
                                                </p>
                                            </div>
                                            <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-colors border border-white/30 hidden md:block">
                                                <BookOpenIcon className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </article>
            </div>
        </div>
    );
}
