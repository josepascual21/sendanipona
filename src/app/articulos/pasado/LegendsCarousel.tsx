"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";

export interface Legend {
    id: string;
    title: string;
    subtitle?: string;
    shortDesc: string;
    fullDesc: string;
    image: string;
}

interface LegendsCarouselProps {
    legends: Legend[];
}

export default function LegendsCarousel({ legends }: LegendsCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        let newIndex = currentIndex + newDirection;
        if (newIndex < 0) newIndex = legends.length - 1;
        if (newIndex >= legends.length) newIndex = 0;
        setCurrentIndex(newIndex);
    };

    const currentLegend = legends[currentIndex];

    // Function to close modal
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="relative w-full max-w-5xl mx-auto px-4">
            {/* Carousel Container */}
            <div className="relative h-[600px] w-full overflow-hidden rounded-2xl shadow-xl bg-slate-900 border border-slate-800">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="absolute w-full h-full flex flex-col items-center"
                    >
                        {/* Image Container with Gradient Overlay */}
                        <div className="relative w-full h-3/5 md:h-2/3">
                            <Image
                                src={currentLegend.image}
                                alt={currentLegend.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 w-full bg-slate-900 p-6 md:p-8 flex flex-col items-center text-center justify-start relative z-10 -mt-12 md:-mt-20">
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg font-serif"
                            >
                                {currentLegend.title}
                            </motion.h3>
                            {currentLegend.subtitle && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-orange-400 font-medium text-sm md:text-base uppercase tracking-wider mb-4"
                                >
                                    {currentLegend.subtitle}
                                </motion.p>
                            )}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-slate-300 text-sm md:text-lg max-w-2xl mb-6 hidden md:block leading-relaxed"
                            >
                                {currentLegend.shortDesc}
                            </motion.p>

                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                onClick={() => setIsModalOpen(true)}
                                className="mt-auto mb-8 z-30 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-600/30 ring-2 ring-orange-500/50"
                            >
                                Quiero conocer más
                            </motion.button>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Left Control */}
                <button
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white p-3 rounded-full z-20 transition-all border border-white/10 group"
                    onClick={() => paginate(-1)}
                    aria-label="Anterior leyenda"
                >
                    <ChevronLeftIcon className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </button>

                {/* Right Control */}
                <button
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white p-3 rounded-full z-20 transition-all border border-white/10 group"
                    onClick={() => paginate(1)}
                    aria-label="Siguiente leyenda"
                >
                    <ChevronRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                    {legends.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setDirection(idx > currentIndex ? 1 : -1);
                                setCurrentIndex(idx);
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                                ? "bg-orange-500 w-8"
                                : "bg-slate-600 w-2 hover:bg-slate-400"
                                }`}
                            aria-label={`Ir a leyenda ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={closeModal}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col z-10"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 sticky top-0 z-20">
                                <h3 className="text-xl md:text-2xl font-bold text-slate-800 font-serif pr-8">
                                    {currentLegend.title}
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="text-slate-400 hover:text-slate-600 transition-colors p-2 rounded-full hover:bg-slate-200 absolute right-4 top-4"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Scrollable Body */}
                            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                                <div className="text-slate-600 text-lg leading-loose space-y-4">
                                    {currentLegend.fullDesc.split(/\n\s*\n/).map((paragraph, index) => (
                                        <p key={index}>{paragraph.replace(/\s+/g, ' ').trim()}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Footer (optional, maybe for close button on mobile) */}
                            <div className="p-4 border-t border-slate-100 bg-slate-50 md:hidden flex justify-end">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Add some custom scrollbar styles to global css if needed, or use inline utility classes if defined in valid tailwind plugins
