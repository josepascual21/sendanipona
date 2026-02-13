import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Outfit, Rajdhani, Orbitron } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { APP_METADATA } from "@/shared/constants/app-constants";
import { container } from "@/infrastructure/di/container";

import { auth } from "@/infrastructure/auth/auth";
import AuthProvider from "./components/SessionProvider";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

const rajdhani = Rajdhani({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ["latin"],
    variable: "--font-rajdhani",
    display: "swap",
});

const orbitron = Orbitron({
    subsets: ["latin"],
    variable: "--font-orbitron",
    display: "swap",
});




const aiLove = localFont({
    src: "./fonts/a-ai-love-font/AiLove-x391O.ttf",
    variable: "--font-ai-love",
    display: "swap",
    fallback: ["Playfair Display", "Georgia", "serif"],
});

export const metadata: Metadata = {
    title: APP_METADATA.title,
    description: APP_METADATA.description,
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Obtener datos de navegación y sesión en paralelo usando el DI Container
    const navigationDataUseCase = container.getNavigationDataUseCase();

    const [navigationTopics, session] = await Promise.all([
        navigationDataUseCase.execute(),
        auth(),
    ]);

    return (
        <html lang="es">
            <body className={`flex flex-col min-h-screen bg-gradient-to-br from-cyan-50 to-emerald-50 ${aiLove.variable} ${outfit.variable} ${rajdhani.variable} ${orbitron.variable} font-sans`}>
                <AuthProvider>
                    <Header topics={navigationTopics} user={session?.user} />
                    <main className="flex-grow flex flex-col bg-zinc-950 text-white">
                        {children}
                    </main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}


