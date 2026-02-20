# Senda Nipona 🇯🇵

*TFM Desarrollo de Software con IA*

> "Caminante, no hay camino, se hace camino al andar." - Antonio Machado
> ... o en este caso, una **Senda Nipona** hacia el descubrimiento cultural.

---

## 🌸 Introducción y Motivación

**¿Por qué este proyecto?**
> Desde muy pequeño me ha atrido muchisimo la cultura japonesa, en todos sus aspectos, todo lo referente a ella me parece fascinante Empezando por su historia llena de conflictos y samurais, pasando por su cultura tradicional como el shodo, el ikebana, la ceremonia del té, etc. Hasta llegar a su cultura moderna como el anime, el manga, los videojuegos, la tecnología, etc. Por eso mi objetivo es poder divulgar información acerca de este fascinante país a todo el mundo posible, desde los más entusiastas hasta los que están empezando a descubrirlo.

**El formato elegido**
> He optado por el formato web porque es el más popular para llegar a todo el mundo posible. Mi idea es desarrollar una página web muy accesible y dinámica, con un diseño moderno y agradable que invite al usuario a seguir navegando por la página. Mi estrategia respecto a esto último es haciendo uso de un diseño muy moderno y fluido conseguir que el usuario siempre se sienta invitado a descubir algo nuevo del país nipón, por esta razón, ofrecer contenidos resumidos y directos sin llegar a explayarse de forma innecesaria con información secundaria que tan solo pueda desbordar o aburrir al usuario. Quiero que el usuario en el momento de salir de la página web sienta que después de su visita ha aprendido algo nuevo, pudiendo entablar una conversación con lo aprendido o incluso sirviendo la información adquirida como bases para despertar su curiosidad o incluso su pasión por el país nipón.
---

## 🎌 Descripción General

**Senda Nipona** es una plataforma web interactiva diseñada para la divulgación de la cultura japonesa. A diferencia de un blog estático tradicional, esta aplicación ofrece una experiencia inmersiva que guía al usuario a través de tres dimensiones temporales:

*   **Pasado:** Tradiciones milenarias (Shodo, Kioto...).
*   **Presente:** La vida moderna (Tokio, Osaka, JDM...).
*   **Futuro:** Tecnología y tendencias venideras.

El objetivo es crear una comunidad donde los amantes de Japón puedan no solo leer, sino interactuar y compartir su pasión.

---

## 🚀 Funcionalidades Principales

La aplicación va más allá de mostrar contenido, incorporando características de una **Web App moderna**:

*   **Exploración Temporal:** Navegación intuitiva por eras (Pasado, Presente, Futuro).
*   **Sistema de Usuarios:** Registro e inicio de sesión seguro (Autenticación).
*   **Comunidad:** Posibilidad de dejar comentarios en los artículos para fomentar el debate.
*   **Diseño Responsivo:** Experiencia fluida tanto en móviles como en escritorio.
*   **Contenido Multimedia:** Integración de imágenes y vídeos de alta calidad.

---

## 🛠️ Stack Tecnológico

He seleccionado las siguientes herramientas buscando robustez, escalabilidad y una experiencia de desarrollo moderna:

| Tecnología | Propósito | ¿Por qué esta elección? |
| :--- | :--- | :--- |
| **Next.js 14** | Framework Fullstack | Por su **App Router**, renderizado híbrido (SSR/CSR) y optimización SEO automática. |
| **TypeScript** | Lenguaje | Para garantizar un código robusto y mantenible gracias al tipado estático. |
| **Tailwind CSS** | Estilos | Permite un desarrollo ágil de interfaces modernas y consistentes. |
| **Prisma ORM** | Base de Datos | Facilita la interacción tipada con la base de datos y migraciones seguras. |
| **Turso (LibSQL)** | Base de Datos Cloud | Solución innovadora para una base de datos distribuida y rápida en el borde (Edge). |
| **NextAuth v5** | Autenticación | Gestión segura de sesiones y usuarios sin reinventar la rueda. |
| **Vitest & Playwright** | Testing | **Vitest** para pruebas unitarias rápidas y **Playwright** para pruebas E2E que simulan usuarios reales. |

---

## 🏗️ Arquitectura y Metodología

### Clean Architecture

Este proyecto no es solo una web "que funciona", sino que está construido para **durar y escalar**. He implementado **Clean Architecture** para desacoplar la lógica de negocio de los detalles técnicos:

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
