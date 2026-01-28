/**
 * Constantes globales de la aplicación
 * Centraliza textos, configuración y enlaces para facilitar el mantenimiento.
 */

export const APP_METADATA = {
    title: 'Senda Nipona',
    description: 'Cultura Japonesa: Pasado, Presente y Futuro',
    author: 'José Pascual Vázquez',
    contactEmail: 'sendanipona@gmail.com',
    copyright: 'Todos los derechos reservados',
};

export const UI_CONSTANTS = {
    logo: {
        src: '/images/senda_nipona_logo.png',
        alt: 'Senda Nipona Logo',
        width: 71,
        height: 79,
    },
};

export const FOOTER_SECTIONS = {
    contact: {
        title: 'Contáctanos',
        links: [
            { id: 'contact', href: '/contacto', label: 'Contacto' },
            { id: 'twitter', href: '#', label: 'Twitter' },
            { id: 'instagram', href: '#', label: 'Instagram' },
            { id: 'facebook', href: '#', label: 'Facebook' },
            { id: 'tiktok', href: '#', label: 'TikTok' },
        ]
    },
    quality: {
        title: 'Contenido de calidad',
        links: [
            { id: 'spotify', href: '#', label: 'Spotify' },
            { id: 'youtube', href: '#', label: 'YouTube' },
            { id: 'twitch', href: '#', label: 'Twitch' },
        ]
    },
    community: {
        title: 'Comunidad',
        links: [
            { id: 'discord', href: '#', label: 'Discord' },
            { id: 'reddit', href: '#', label: 'Reddit' },
            { id: 'telegram', href: '#', label: 'Telegram' },
            { id: 'mastodon', href: '#', label: 'Mastodon' },
            { id: 'pinterest', href: '#', label: 'Pinterest' },
        ]
    },
    donations: {
        title: 'Donaciones',
        links: [
            { id: 'paypal', href: '#', label: 'PayPal' },
            { id: 'opencollective', href: '#', label: 'Open Collective' },
        ]
    }
};
