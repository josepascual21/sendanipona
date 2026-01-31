import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Outfit } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { APP_METADATA } from "@/core/constants/app-constants";
import { PrismaArticleTopicRepository } from "@/infrastructure/repositories/PrismaArticleTopicRepository";
import { GetNavigationData } from "@/core/application/use-cases/articles";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
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
    // Obtener datos de navegación usando el caso de uso existente y correcto
    const articleTopicRepository = new PrismaArticleTopicRepository();
    const getNavigationData = new GetNavigationData(articleTopicRepository);
    const navigationTopics = await getNavigationData.execute();

    return (
        <html lang="es">
            <body className={`flex flex-col min-h-screen bg-gradient-to-br from-cyan-50 to-emerald-50 ${aiLove.variable} ${outfit.variable} font-sans`}>
                <Header topics={navigationTopics} />
                <main className="flex-grow flex flex-col min-h-screen bg-zinc-950 text-white">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}


