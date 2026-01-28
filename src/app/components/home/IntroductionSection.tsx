import React from 'react';

export default function IntroductionSection() {
    return (
        <section className="py-20 bg-zinc-950">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 to-cyan-200">
                        Japón en un click
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="space-y-6 text-lg text-zinc-300 leading-relaxed font-light">
                            <p>
                                <span className="text-emerald-400 font-normal">Bienvenidos a Senda Nipona.</span> Esta página tiene como objetivo enseñarte lo esencial sobre Japón, centrándonos en los aspectos más importantes e interesantes de su cultura.
                            </p>
                            <p>
                                Te exponemos la información desde tres planos temporales para que comprendas la evolución de este fascinante país:
                            </p>

                            <ul className="space-y-4 my-8 pl-4 border-l-2 border-zinc-800">
                                <li className="pl-4">
                                    <strong className="text-emerald-200 block mb-1">Pasado</strong>
                                    <span className="text-zinc-400 text-base">Las raíces del país y cómo forjó su personalidad única.</span>
                                </li>
                                <li className="pl-4">
                                    <strong className="text-cyan-200 block mb-1">Presente</strong>
                                    <span className="text-zinc-400 text-base">Su forma de vivir actual y el impacto global de la cultura J-pop.</span>
                                </li>
                                <li className="pl-4">
                                    <strong className="text-indigo-300 block mb-1">Futuro</strong>
                                    <span className="text-zinc-400 text-base">El rumbo del país, sus retos demográficos y desafíos psicológicos.</span>
                                </li>
                            </ul>

                            <p>
                                Además, conectamos contigo a través de nuestras redes sociales, pódcasts y directos. Queremos crear una comunidad donde compartir experiencias y aprender juntos.
                            </p>
                        </div>

                        {/* Visual/Placeholder Column */}
                        <div className="relative h-full min-h-[400px] w-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 flex items-center justify-center group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/20 to-cyan-900/20 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="text-center p-8">
                                <span className="text-6xl mb-4 block animate-bounce">🇯🇵</span>
                                <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Explora la cultura</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
