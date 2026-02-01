import Image from "next/image";
import Link from "next/link";
import {
    ClockIcon,
    BookOpenIcon,
    UserIcon,
    SparklesIcon,
    ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";
import LegendsCarousel, { Legend } from "./LegendsCarousel";

// Constantes para las imágenes
const IMAGES = {
    banner: "/images/articulos/pasado/banner.jpg",
    samurai: "/images/articulos/pasado/samurai.png",
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
                    <div className="sticky top-32 bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
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
                                { name: "Príncipe Shōtoku", years: "574-622 d.C", desc: "Líder político semi-legendario, regente durante el periodo Asuka.", img: IMAGES.personajes.shokotu },
                                { name: "Oda Nobunaga", years: "1534-1582 d.C", desc: "Gran guerrero y primer unificador de Japón durante el periodo Sengoku.", img: IMAGES.personajes.oda },
                                { name: "Toyotomi Hideyoshi", years: "1537-1598 d.C", desc: "Segundo unificador de Japón, conocido como 'Saru' (el mono).", img: IMAGES.personajes.toyotomi },
                                { name: "Sakamoto Ryōma", years: "1836-1867 d.C", desc: "Samurái visionary crucial en la Restauración Meiji y la modernización.", img: IMAGES.personajes.ryoma },
                                { name: "Murasaki Shikibu", years: "973-1025 d.C", desc: "Escritora de 'Genji Monogatari', la primera novela de la historia.", img: IMAGES.personajes.murasaki },
                                { name: "Minamoto No Yoritomo", years: "1147-1199 d.C", desc: "Fundador y primer shogun del shogunato Kamakura.", img: IMAGES.personajes.minamoto },
                                { name: "Tokugawa Ieyasu", years: "1543-1616 d.C", desc: "Fundador del shogunato Tokugawa que trajo siglos de paz.", img: IMAGES.personajes.ieyasu },
                                { name: "Katsushika Hokusai", years: "1760-1849 d.C", desc: "Maestro del Ukiyo-e, autor de 'La gran ola de Kanagawa'.", img: IMAGES.personajes.hokusai },
                                { name: "Musashi Miyamoto", years: "1584-1645 d.C", desc: "Legendario espadachín invicto y autor de 'El libro de los cinco anillos'.", img: IMAGES.personajes.miyamoto },
                            ].map((person, idx) => (
                                <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="h-48 bg-slate-200 relative overflow-hidden">
                                        <Image
                                            src={person.img}
                                            alt={person.name}
                                            fill
                                            className="object-cover"
                                        />
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
                        <h3 className="text-xl text-center text-slate-600 mb-8 font-serif italic">"¿Qué leyenda te gustaría leer hoy?"</h3>

                        <LegendsCarousel legends={LEGENDS_DATA} />

                    </section>

                </article>
            </div>
        </div>
    );
}
