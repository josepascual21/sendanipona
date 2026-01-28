"use client";

import React, { useState, useEffect } from 'react';
import { HOME_QUOTES } from '@/core/data/home-data';

export default function QuotesSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFade(false); // Start fade out
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % HOME_QUOTES.length);
                setFade(true); // Start fade in
            }, 500); // Wait for fade out to complete (should match CSS duration)
        }, 8000); // Change every 8 seconds

        return () => clearInterval(intervalId);
    }, []);

    const currentQuote = HOME_QUOTES[currentIndex];

    return (
        <section className="w-full bg-zinc-950 py-12 border-b border-zinc-900">
            <div className="container mx-auto px-4">
                <div className={`transition-opacity duration-500 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="max-w-4xl mx-auto text-center">
                        <blockquote className="text-2xl md:text-3xl font-light text-zinc-300 italic mb-6 leading-relaxed">
                            "{currentQuote.text}"
                        </blockquote>
                        <figcaption className="text-emerald-500 font-medium tracking-wider uppercase text-sm">
                            — {currentQuote.author}
                        </figcaption>
                    </div>
                </div>

                {/* Indicators */}
                <div className="flex justify-center mt-8 gap-2">
                    {HOME_QUOTES.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setFade(false);
                                setTimeout(() => {
                                    setCurrentIndex(idx);
                                    setFade(true);
                                }, 500);
                            }}
                            className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-emerald-500' : 'w-2 bg-zinc-800 hover:bg-zinc-700'
                                }`}
                            aria-label={`Go to quote ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
