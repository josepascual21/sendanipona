import "./globals.css";
import type { Metadata } from "next";

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
            <body>{children}</body>
        </html>
    );
}
