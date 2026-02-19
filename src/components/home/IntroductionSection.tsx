import React from 'react';
import Image from 'next/image';

/**
 * IntroductionSection - Sección de bienvenida de la página principal.
 * 
 * Presenta Senda Nipona de forma concisa con tres pilares temáticos
 * que representan las áreas de contenido del sitio sin mencionar artículos específicos.
 * Incluye un área placeholder para imagen decorativa (600x450px recomendado).
 */
export default function IntroductionSection() {
    return (
        <section className="py-20 bg-zinc-950">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Título principal con gradiente */}
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 to-cyan-200">
                        Descubre Japón
                    </h2>

                    {/* Subtítulo de bienvenida */}
                    <p className="text-center text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-16 leading-relaxed">
                        <span className="text-emerald-400 font-medium">Bienvenido a Senda Nipona.</span>{' '}
                        Tu portal hacia la cultura, historia y sociedad del país del sol naciente.
                        Explora artículos, guías y recursos para conectar con la esencia de Japón.
                    </p>

                    {/* Grid principal: Pilares + Imagen */}
                    <div className="grid lg:grid-cols-5 gap-8 items-start">

                        {/* Columna de pilares temáticos (3 columnas en lg) */}
                        <div className="lg:col-span-3 grid sm:grid-cols-3 gap-6">

                            {/* Pilar 1: Historia y Tradición */}
                            <div className="group p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-emerald-800/50 transition-all duration-300 hover:bg-zinc-900">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    🏯
                                </div>
                                <h3 className="text-lg font-semibold text-emerald-200 mb-2">
                                    Historia y Tradición
                                </h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    El legado milenario que forjó la identidad única de Japón a través de los siglos.
                                </p>
                            </div>

                            {/* Pilar 2: Cultura Contemporánea */}
                            <div className="group p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-cyan-800/50 transition-all duration-300 hover:bg-zinc-900">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    🎌
                                </div>
                                <h3 className="text-lg font-semibold text-cyan-200 mb-2">
                                    Cultura Contemporánea
                                </h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    La vida moderna japonesa, desde el anime hasta la tecnología y el estilo de vida.
                                </p>
                            </div>

                            {/* Pilar 3: Sociedad y Tendencias */}
                            <div className="group p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-indigo-800/50 transition-all duration-300 hover:bg-zinc-900">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    🔮
                                </div>
                                <h3 className="text-lg font-semibold text-indigo-300 mb-2">
                                    Sociedad y Tendencias
                                </h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    Los retos actuales y el futuro de la sociedad japonesa en un mundo cambiante.
                                </p>
                            </div>
                        </div>

                        {/* Columna de imagen decorativa (2 columnas en lg) */}
                        <div className="lg:col-span-2 relative h-full min-h-[300px] lg:min-h-[280px] w-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 group">
                            {/* Overlay con gradiente */}
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-transparent to-cyan-900/30 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Placeholder para imagen - Reemplazar con <Image> cuando se tenga la imagen */}
                            {/* Dimensiones recomendadas: 600x450px (aspect ratio 4:3) */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Image
                                    src="/images/index/index1.jpg"
                                    alt="Introduction"
                                    width={600}
                                    height={450}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
