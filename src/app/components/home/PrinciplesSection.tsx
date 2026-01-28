import React from 'react';
import { HOME_PRINCIPLES } from '@/core/data/home-data';

export default function PrinciplesSection() {
    return (
        <section className="py-20 bg-zinc-950 border-t border-zinc-900/50">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-zinc-100">
                        Principios Esenciales
                    </h2>
                    <p className="text-center text-zinc-400 mb-16 max-w-2xl mx-auto">
                        Conceptos fundamentales para comprender el contexto antes de profundizar en la historia y cultura japonesa.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {HOME_PRINCIPLES.map((principle, idx) => (
                            <div
                                key={idx}
                                className="bg-zinc-900/50 hover:bg-zinc-900 p-8 rounded-xl border border-zinc-800/50 hover:border-emerald-500/30 transition-all duration-300 group"
                            >
                                <h3 className="text-xl font-semibold text-emerald-400 mb-4 group-hover:text-emerald-300 transition-colors">
                                    {principle.title}
                                </h3>
                                <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">
                                    {principle.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
