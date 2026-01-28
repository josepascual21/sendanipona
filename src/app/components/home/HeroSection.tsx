import React from 'react';

export default function HeroSection() {
    return (
        <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden flex items-center justify-center bg-zinc-900">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/50 to-zinc-950 z-10" />

            {/* Abstract Decorative Elements (Replacing Images) */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-zinc-950 to-zinc-950" />
                <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[80%] bg-emerald-900/20 blur-[100px] rounded-full mix-blend-screen" />
                <div className="absolute top-[20%] -left-[10%] w-[40%] h-[60%] bg-blue-900/20 blur-[100px] rounded-full mix-blend-screen" />
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 text-center">
                <h1 className="font-ai-love text-5xl md:text-7xl lg:text-9xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-cyan-400 opacity-90 tracking-tight">
                    Senda Nipona
                </h1>
                <p className="text-xl md:text-2xl text-zinc-400 font-light tracking-widest uppercase">
                    Descubre el camino de Japón
                </p>
            </div>
        </section>
    );
}
