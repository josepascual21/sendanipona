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
        <footer className="bg-gray-700 text-white">
            <div className="container mx-auto p-4">
                {/* Grid de secciones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mx-3">
                    {/* Logo y copyright */}
                    <div className="p-4">
                        <Link href="/">
                            <Image
                                src={UI_CONSTANTS.logo.src}
                                alt={UI_CONSTANTS.logo.alt}
                                width={UI_CONSTANTS.logo.width}
                                height={UI_CONSTANTS.logo.height}
                            />
                        </Link>
                        <p className="text-sm">{APP_METADATA.copyright}</p>
                    </div>

                    {/* Generar secciones dinámicamente */}
                    {Object.values(FOOTER_SECTIONS).map((section) => (
                        <div key={section.title}>
                            <h4 className="font-bold mb-4 text-lg">{section.title}</h4>
                            <ul className="space-y-2">
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
                <hr className="my-6 border-gray-600" />

                {/* Información final */}
                <div className="flex flex-wrap justify-around items-center gap-4 text-sm">
                    <span className="px-3">&copy; {APP_METADATA.author}</span>
                    <span className="px-3">{APP_METADATA.contactEmail}</span>
                    <span className="px-3">{lastVisit}</span>
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
                className="inline-flex items-center gap-2 px-3 py-1 rounded text-white hover:bg-orange-500 hover:text-black hover:scale-110 transition-all duration-200"
            >
                <span className="w-5 h-5">{icon}</span>
                <span>{text}</span>
            </Link>
        </li>
    );
}
