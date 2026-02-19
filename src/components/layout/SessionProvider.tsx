'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider refetchOnWindowFocus={true}>
            <SessionSync />
            {children}
        </SessionProvider>
    );
}

/**
 * Componente que fuerza la actualización de la sesión al navegar.
 * Soluciona el problema de caché de NextAuth tras redirecciones de servidor (Login/Logout).
 * 
 * USO DE REF: Necesario para evitar bucles infinitos. 
 * update() puede causar re-renders que disparen el efecto de nuevo.
 */
function SessionSync() {
    const pathname = usePathname();
    const { update } = useSession();
    const lastPathRef = useRef(pathname);

    useEffect(() => {
        // Solo actualizar si la ruta HA CAMBIADO realmente desde la última vez
        if (pathname !== lastPathRef.current) {
            lastPathRef.current = pathname; // Actualizar ref inmediatamente para bloquear futuros intentos

            console.log(`[SessionSync] Ruta cambiada a ${pathname}, actualizando sesión...`);
            update();
        }
    }, [pathname, update]);

    return null;
}
