"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const HERO_IMAGES = [
    '/images/carousel/paisaje_japon_1.jpg',
    '/images/carousel/paisaje_japon_2.jpg',
    '/images/carousel/paisaje_japon_3.jpg',
    '/images/carousel/paisaje_japon_4.jpg',
    '/images/carousel/paisaje_japon_5.jpg',
    '/images/carousel/paisaje_japon_6.jpg',
    '/images/carousel/paisaje_japon_7.jpg',
    '/images/carousel/paisaje_japon_8.jpg',
];

export default function HeroSection() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 6000); // Rotate every 6 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden flex items-center justify-center bg-zinc-900">
            {/* Image Carousel Background */}
            <div className="absolute inset-0 z-0">
                {HERO_IMAGES.map((src, index) => (
                    <div
                        key={src}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <Image
                            src={src}
                            alt={`Slide ${index + 1}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                            quality={90}
                        />
                        {/* Overlay dark gradient for text readability */}
                        <div className="absolute inset-0 bg-zinc-950/40" />
                    </div>
                ))}
            </div>

            {/* Background Effects Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/30 z-10" />

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 text-center">
                <h1 className="font-ai-love text-6xl md:text-8xl lg:text-9xl mb-6 text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-tight">
                    Senda Nipona
                </h1>
                <p className="text-xl md:text-3xl text-zinc-100 font-light tracking-[0.2em] uppercase drop-shadow-md">
                    Descubre el camino de Japón
                </p>
            </div>
        </section>
    );
}
