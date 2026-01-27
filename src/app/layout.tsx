import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "./components/Header";
import Footer from "./components/Footer";

const aiLove = localFont({
    src: "./fonts/a-ai-love-font/AiLove-x391O.ttf",
    variable: "--font-ai-love",
    display: "swap",
    fallback: ["Playfair Display", "Georgia", "serif"],
});

export const metadata: Metadata = {
    title: "Senda Nipona",
    description: "Cultura Japonesa: Pasado, Presente y Futuro",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body className={`flex flex-col min-h-screen bg-gradient-to-br from-cyan-50 to-emerald-50 ${aiLove.variable}`}>
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
