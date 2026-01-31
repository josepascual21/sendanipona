'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { APP_METADATA, FOOTER_SECTIONS, UI_CONSTANTS } from '@/core/constants/app-constants';
import {
    UserIcon,
} from '@heroicons/react/24/outline';
import {
    PhotoIcon,
} from '@heroicons/react/24/solid';
import {
    FacebookIcon,
    XIcon,
    TikTokIcon,
    SpotifyIcon,
    YouTubeIcon,
    TwitchIcon,
    DiscordIcon,
    RedditIcon,
    TelegramIcon,
    MastodonIcon,
    PinterestIcon,
    PayPalIcon,
    OpenCollectiveIcon,
} from './icons/Icons';



/**
 * Footer Component - Pie de página global
 * 
 * Incluye:
 * - Logo y copyright
 * - Enlaces a redes sociales organizados por categorías
 * - Última visita del usuario (localStorage)
 */
export default function Footer() {
    const [lastVisit, setLastVisit] = useState<string>('');

    useEffect(() => {
        // Obtener última visita del localStorage
        const storedVisit = localStorage.getItem('ultimaVisita');
        if (storedVisit) {
            setLastVisit(`Tu última visita fue el: ${storedVisit}`);
        } else {
            setLastVisit('Esta es tu primera visita');
        }

        // Guardar visita actual
        const now = new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: 'numeric',
        });
        localStorage.setItem('ultimaVisita', now);
    }, []);

    const iconMap: Record<string, React.ReactNode> = {
        contact: <UserIcon />,
        twitter: <XIcon />,
        instagram: <PhotoIcon />,
        facebook: <FacebookIcon />,
        tiktok: <TikTokIcon />,
        spotify: <SpotifyIcon />,
        youtube: <YouTubeIcon />,
        twitch: <TwitchIcon />,
        discord: <DiscordIcon />,
        reddit: <RedditIcon />,
        telegram: <TelegramIcon />,
        mastodon: <MastodonIcon />,
        pinterest: <PinterestIcon />,
        paypal: <PayPalIcon />,
        opencollective: <OpenCollectiveIcon />,
    };

    return (
        <footer className="bg-slate-950 text-slate-300 border-t border-cyan-900 overflow-hidden relative">
            {/* Decoración de fondo sutil */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-orange-500 to-cyan-500 opacity-80"></div>

            <div className="container mx-auto px-6 py-12">
                {/* Grid de secciones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                    {/* Logo y copyright */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="inline-block group">
                            <Image
                                src={UI_CONSTANTS.logo.src}
                                alt={UI_CONSTANTS.logo.alt}
                                width={UI_CONSTANTS.logo.width}
                                height={UI_CONSTANTS.logo.height}
                                className="opacity-90 group-hover:opacity-100 transition-opacity"
                            />
                            <p className="mt-2 text-xs text-slate-500 uppercase tracking-widest">{APP_METADATA.title}</p>
                        </Link>
                        <p className="text-sm text-slate-500 leading-relaxed max-w-xs">{APP_METADATA.copyright}</p>
                    </div>

                    {/* Generar secciones dinámicamente */}
                    {Object.values(FOOTER_SECTIONS).map((section) => (
                        <div key={section.title}>
                            <h4 className="font-bold mb-6 text-base text-white uppercase tracking-wider relative inline-block">
                                {section.title}
                                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-orange-500 rounded-full"></span>
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <SocialLink
                                        key={link.id}
                                        href={link.href}
                                        icon={iconMap[link.id]}
                                        text={link.label}
                                    />
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Separador */}
                <hr className="my-10 border-slate-800" />

                {/* Información final */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
                    <div className="flex flex-wrap justify-center gap-6">
                        <span>&copy; {new Date().getFullYear()} {APP_METADATA.author}</span>
                        <span className="hidden md:inline text-slate-700">|</span>
                        <a href={`mailto:${APP_METADATA.contactEmail}`} className="hover:text-orange-400 transition-colors">
                            {APP_METADATA.contactEmail}
                        </a>
                    </div>
                    <div className="px-4 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-500/80">
                        {lastVisit}
                    </div>
                </div>
            </div>
        </footer>
    );
}

/**
 * Componente auxiliar para enlaces de redes sociales
 */
function SocialLink({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
    return (
        <li>
            <Link
                href={href}
                className="group flex items-center gap-3 text-slate-400 hover:text-orange-400 transition-all duration-300"
            >
                <span className="w-5 h-5 text-cyan-600 group-hover:text-orange-500 transition-colors duration-300 transform group-hover:scale-110">
                    {icon}
                </span>
                <span className="font-medium tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                    {text}
                </span>
            </Link>
        </li>
    );
}
