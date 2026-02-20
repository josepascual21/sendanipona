# Senda Nipona 🇯🇵

*TFM Desarrollo de Software con IA*

> "Caminante, no hay camino, se hace camino al andar." - Antonio Machado
> ... o en este caso, una **Senda Nipona** hacia el descubrimiento cultural.

---

## 🌸 Introducción y Motivación

**¿Por qué este proyecto?**
> Desde muy pequeño me ha atraído muchísimo la cultura japonesa, en todos sus aspectos, todo lo referente a ella me parece fascinante Empezando por su historia llena de conflictos y samurais, pasando por su cultura tradicional como el shodo, el ikebana, la ceremonia del té, etc. Hasta llegar a su cultura moderna como el anime, el manga, los videojuegos, la tecnología, etc. Por eso mi objetivo es poder divulgar información acerca de este fascinante país a todo el mundo posible, desde los más entusiastas hasta los que están empezando a descubrirlo.

**El formato elegido**
> He optado por el formato web porque es el más popular para llegar a todo el mundo posible. Mi idea es desarrollar una página web muy accesible y dinámica, con un diseño moderno y agradable que invite al usuario a seguir navegando por la página.
---

## 🎌 Descripción General

La información sobre cultura japonesa en internet está dispersa en múltiples fuentes, muchas veces poco fiables o difíciles de contrastar. Para alguien que está interesado en aprender sobre Japón, esto supone un problema: ¿dónde encontrar contenido de calidad sin perderse entre blogs abandonados o traducciones automáticas?

**Senda Nipona** nace como respuesta a esta necesidad. Es una plataforma web que centraliza la información sobre la cultura japonesa, presentada de forma accesible tanto para aficionados experimentados como para personas que recién empiezan a descubrir este fascinante país.

Mi objetivo es a través de un diseño muy moderno y fluido conseguir que el usuario siempre se sienta invitado a descubrir algo nuevo del país nipón, por esta razón, ofrecer contenidos resumidos y directos sin llegar a explayarse de forma innecesaria con información secundaria que tan solo pueda desbordar o aburrir al usuario.

Quiero que el usuario en el momento de salir de la página web sienta que después de su visita ha aprendido algo nuevo, pudiendo entablar una conversación con lo aprendido o incluso sirviendo la información adquirida como bases para despertar su curiosidad o incluso su pasión por el país nipón.

---

## 🚀 Funcionalidades Principales

La aplicación va más allá de mostrar contenido, incorporando características de una **Web App moderna**:

*   **Navegación intuitiva:** Header de navegación con dropdowns bien separados para que el usuario pueda moverse por la web de forma dinámica y fluida, encontrando siempre lo que busca.
*   **Sistema de Usuarios:** Registro con validación de datos (Zod), contraseñas hasheadas con bcrypt, y autenticación mediante NextAuth v5. Las sesiones se gestionan con JWT para mantener al usuario identificado de forma segura.
*   **Comunidad:** Los usuarios registrados pueden comentar en los artículos (mínimo 10, máximo 500 caracteres). Cada usuario solo puede dejar un comentario por artículo, fomentando opiniones reflexivas. Los autores pueden eliminar sus propios comentarios.
*   **Diseño Responsivo:** Interfaz adaptable construida con Tailwind CSS y diseño mobile-first. Animaciones fluidas con Framer Motion que mejoran la experiencia sin sacrificar rendimiento.
*   **Contenido Multimedia:** Imágenes optimizadas automáticamente con Next.js Image (lazy loading, formatos modernos WebP). Contenido organizado por temas (Pasado, Presente, Futuro) con rutas dinámicas SEO-friendly.

---

## 🛠️ Stack Tecnológico

He seleccionado las siguientes herramientas buscando robustez, escalabilidad y una experiencia de desarrollo moderna:

| Tecnología | Propósito | ¿Por qué esta elección? |
| :--- | :--- | :--- |
| **Next.js 14** | Framework Fullstack | Por su **App Router**, renderizado híbrido (SSR/CSR) y optimización SEO automática. Además de tener una comunidad muy grande y una documentación muy completa. |
| **TypeScript** | Lenguaje | Para garantizar un código robusto y mantenible gracias al tipado estático. |
| **Tailwind CSS** | Estilos | Permite un desarrollo ágil de interfaces modernas y consistentes. |
| **Prisma ORM** | ORM | Facilita la interacción tipada con la base de datos y migraciones seguras. |
| **Turso (LibSQL)** | Base de Datos Remota | Migración sencilla desde SQLite local y fácil de conectar con Prisma. |
| **SQLite** | Base de Datos Local | Para desarrollo local, ligera y sin configuración adicional. |
| **NextAuth v5** | Autenticación | Gestión segura de sesiones y usuarios sin reinventar la rueda. |
| **Zod** | Validación | Validación de esquemas con inferencia de tipos TypeScript automática. |
| **bcryptjs** | Seguridad | Hashing seguro de contraseñas con salt aleatorio. |
| **Framer Motion** | Animaciones | Animaciones fluidas y declarativas para mejorar la UX. |
| **Vitest** | Testing Unitario | Tests rápidos con sintaxis compatible con Jest y soporte nativo de TypeScript. |
| **Playwright** | Testing E2E | Pruebas end-to-end que simulan usuarios reales en múltiples navegadores (Chromium, Firefox, WebKit utilizados en este proyecto). |

---

## 🏗️ Arquitectura y Metodología

### Clean Architecture

Este proyecto no es solo una web "que funciona", sino que está construido para **durar y escalar**. Por esto mismo he implementado **Clean Architecture** para desacoplar la lógica de negocio de los detalles técnicos:

*   **Capa de Dominio (`src/core/domain`):** Entidades y reglas de negocio puras.
*   **Capa de Aplicación (`src/core/application`):** Casos de uso (ej: `PublicarComentario`).
*   **Capa de Infraestructura (`src/infrastructure`):** Implementaciones concretas (Base de datos, servicios externos).
*   **Capa de Presentación (`src/components`, `src/app`):** Interfaz de usuario React.

### Metodología Agile

El desarrollo ha seguido una filosofía **Agile**:
> [ESCRIBE AQUÍ: "Desarrollo iterativo...", "Priorización de funcionalidades clave...", "Entrega continua..."]

---

## 🎨 Diseño y Estética

El diseño visual busca evocar la esencia de Japón:

*   **Paleta de Colores:**
    *   🔴 **Primary (`#E63946`):** Inspirado en el sol naciente y los templos Torii.
    *   🟠 **Secondary (`#F4A261`):** Tonos cálidos de la naturaleza y madera.
    *   🌑 **Background (`#0F172A`):** Fondo oscuro para una experiencia "Premium" y moderna.

*   **Tipografía:** Una combinación de fuentes limpias (Sans-serif) para legibilidad y toques estéticos para títulos.

---

## 🔧 Instalación y Ejecución

Para ver los detalles técnicos sobre cómo clonar, instalar dependencias y ejecutar el proyecto en tu máquina local, por favor consulta el archivo dedicado:

👉 **[GUÍA DE INSTALACIÓN Y DESARROLLO (INSTALL.md)](./INSTALL.md)**

---

<p align="center">
  <sub>Desarrollado con ❤️ y mucho 🍣 para el TFM de Desarrollo de Software con IA</sub>
</p>
