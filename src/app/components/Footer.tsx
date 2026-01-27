'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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

    return (
        <footer className="bg-gray-700 text-white">
            <div className="container mx-auto p-4">
                {/* Grid de secciones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mx-3">
                    {/* Logo y copyright */}
                    <div className="p-4">
                        <Link href="/">
                            <Image
                                src="/images/senda_nipona_logo.png"
                                alt="Senda Nipona Logo"
                                width={71}
                                height={79}
                            />
                        </Link>
                        <p className="text-sm">Todos los derechos reservados</p>
                    </div>

                    {/* Contáctanos */}
                    <div>
                        <h4 className="font-bold mb-4 text-lg">Contáctanos</h4>
                        <ul className="space-y-2">
                            <SocialLink href="/contacto" icon="👤" text="Contacto" />
                            <SocialLink href="#" icon="𝕏" text="Twitter" />
                            <SocialLink href="#" icon="📷" text="Instagram" />
                            <SocialLink href="#" icon="f" text="Facebook" />
                            <SocialLink href="#" icon="♪" text="TikTok" />
                        </ul>
                    </div>

                    {/* Contenido de calidad */}
                    <div>
                        <h4 className="font-bold mb-4 text-lg">Contenido de calidad</h4>
                        <ul className="space-y-2">
                            <SocialLink href="#" icon="🎵" text="Spotify" />
                            <SocialLink href="#" icon="▶" text="YouTube" />
                            <SocialLink href="#" icon="📺" text="Twitch" />
                        </ul>
                    </div>

                    {/* Comunidad */}
                    <div>
                        <h4 className="font-bold mb-4 text-lg">Comunidad</h4>
                        <ul className="space-y-2">
                            <SocialLink href="#" icon="💬" text="Discord" />
                            <SocialLink href="#" icon="🤖" text="Reddit" />
                            <SocialLink href="#" icon="✈️" text="Telegram" />
                            <SocialLink href="#" icon="🐘" text="Mastodon" />
                            <SocialLink href="#" icon="📌" text="Pinterest" />
                        </ul>
                    </div>

                    {/* Donaciones */}
                    <div>
                        <h4 className="font-bold mb-4 text-lg">Donaciones</h4>
                        <ul className="space-y-2">
                            <SocialLink href="#" icon="💳" text="PayPal" />
                            <SocialLink href="#" icon="🤝" text="Open Collective" />
                        </ul>
                    </div>
                </div>

                {/* Separador */}
                <hr className="my-6 border-gray-600" />

                {/* Información final */}
                <div className="flex flex-wrap justify-around items-center gap-4 text-sm">
                    <span className="px-3">&copy; José Pascual Vázquez</span>
                    <span className="px-3">sendanipona@gmail.com</span>
                    <span className="px-3">{lastVisit}</span>
                </div>
            </div>
        </footer>
    );
}

/**
 * Componente auxiliar para enlaces de redes sociales
 */
function SocialLink({ href, icon, text }: { href: string; icon: string; text: string }) {
    return (
        <li>
            <Link
                href={href}
                className="inline-flex items-center gap-2 px-3 py-1 rounded text-white hover:bg-orange-500 hover:text-black hover:scale-110 transition-all duration-200"
            >
                <span className="text-lg">{icon}</span>
                <span>{text}</span>
            </Link>
        </li>
    );
}
