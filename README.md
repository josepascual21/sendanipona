# Senda Nipona 🇯🇵

*TFM Desarrollo de Software con IA*

> "Caminante, no hay camino, se hace camino al andar." - Antonio Machado
> ... o en este caso, una **Senda Nipona** hacia el descubrimiento cultural.

---

## 🌸 Introducción y Motivación

**¿Por qué este proyecto?**
> Desde muy pequeño me ha atraído muchísimo la cultura japonesa, en todos sus aspectos, todo lo referente a ella me parece fascinante. Empezando por su historia llena de conflictos y samurais, pasando por su cultura tradicional como el shodo, el ikebana, la ceremonia del té, etc. Hasta llegar a su cultura moderna como el anime, el manga, los videojuegos, la tecnología, etc. Por eso mi objetivo es poder divulgar información acerca de este fascinante país a todo el mundo posible, desde los más entusiastas hasta los que están empezando a descubrirlo.

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

*   **Capa de Dominio (`src/core/domain`):** Entidades puras (User, Article, Comment, ArticleTopic) con sus reglas de validación. Interfaces de repositorios y servicios. Errores de dominio personalizados (ej: `UserAlreadyExistsError`, `CommentAlreadyExistsError`).

*   **Capa de Aplicación (`src/core/application`):** Casos de uso que orquestan la lógica de negocio. Ejemplos: `RegisterUseCase`, `CreateCommentUseCase`, `GetArticleBySlug`. Cada caso de uso es independiente y testeable.

*   **Capa de Infraestructura (`src/infrastructure`):** Implementaciones concretas de repositorios con Prisma, servicios externos (bcrypt para passwords), configuración de NextAuth v5, y contenedor de inyección de dependencias.

*   **Capa de Presentación (`src/components`, `src/app`):** Componentes React, páginas Next.js, Server Actions. Esta capa consume los casos de uso a través del contenedor DI.

**Ventajas de esta arquitectura:**

✅ **Testeable:** 241 tests automatizados (~70% cobertura) gracias a la separación de capas.
✅ **Mantenible:** Cambios en la UI no afectan la lógica de negocio.
✅ **Independiente de frameworks:** La lógica core no depende de Next.js ni Prisma.

### Estructura del Proyecto

```
sendanipona/
├── src/
│   ├── app/                          # Next.js App Router (páginas y rutas)
│   │   ├── api/
│   │   │   └── auth/                 # NextAuth API handlers
│   │   ├── articulos/                # Páginas de artículos dinámicos
│   │   │   ├── anime-manga/
│   │   │   ├── futuro/
│   │   │   ├── jdm/
│   │   │   ├── kioto/
│   │   │   ├── osaka/
│   │   │   ├── pasado/
│   │   │   ├── presente/
│   │   │   ├── shodo/
│   │   │   ├── tokyo/
│   │   │   ├── videojuegos/
│   │   │   └── layout.tsx
│   │   ├── fonts/                    # Fuentes personalizadas
│   │   ├── lib/                      # Server Actions y Schemas
│   │   │   ├── actions.ts
│   │   │   └── schemas.ts
│   │   ├── login/                    # Página de login
│   │   ├── registro/                 # Página de registro
│   │   ├── layout.tsx                # Layout principal
│   │   ├── page.tsx                  # Página de inicio
│   │   ├── not-found.tsx             # Página 404
│   │   └── globals.css               # Estilos globales
│   │
│   ├── components/                   # Componentes React reutilizables
│   │   ├── articles/                 # Componentes de artículos
│   │   ├── comments/                 # Sistema de comentarios
│   │   ├── home/                     # Secciones de la landing page
│   │   ├── icons/                    # Iconos personalizados
│   │   ├── layout/                   # Header, Footer, SessionProvider
│   │   └── ui/                       # Componentes UI base
│   │
│   ├── core/                         # 🧠 LÓGICA DE NEGOCIO (Clean Architecture)
│   │   ├── domain/                   # Capa de Dominio
│   │   │   ├── entities/             # User, Article, Comment, ArticleTopic
│   │   │   ├── repositories/         # Interfaces de repositorios
│   │   │   ├── services/             # Interfaces de servicios
│   │   │   └── errors/               # Errores de dominio personalizados
│   │   │
│   │   └── application/              # Capa de Aplicación
│   │       ├── dtos/                 # Data Transfer Objects
│   │       └── use-cases/            # Casos de uso
│   │           ├── auth/             # Login, Register
│   │           ├── articles/         # GetArticles, GetBySlug, etc.
│   │           └── comments/         # CreateComment, DeleteComment, etc.
│   │
│   ├── infrastructure/               # 🔧 IMPLEMENTACIONES TÉCNICAS
│   │   ├── auth/                     # NextAuth v5 configuration
│   │   │   ├── auth.ts
│   │   │   └── auth.config.ts
│   │   ├── database/                 # Configuración Prisma + Turso
│   │   │   └── prisma.ts
│   │   ├── di/                       # Dependency Injection Container
│   │   │   └── container.ts
│   │   ├── repositories/             # Implementaciones Prisma
│   │   │   ├── PrismaUserRepository.ts
│   │   │   ├── PrismaArticleRepository.ts
│   │   │   ├── PrismaArticleTopicRepository.ts
│   │   │   └── PrismaCommentRepository.ts
│   │   └── services/                 # Servicios externos
│   │       └── BcryptPasswordService.ts
│   │
│   ├── shared/                       # Utilidades compartidas
│   │   ├── constants/                # Constantes de la app
│   │   └── data/                     # Datos estáticos
│   │
│   └── middleware.ts                 # Middleware de NextAuth
│
├── prisma/
│   ├── migrations/                   # Migraciones SQL
│   ├── schema.prisma                 # Esquema de base de datos
│   └── seed.ts                       # Datos iniciales (seed)
│
├── __tests__/                        # Tests organizados por tipo
│   ├── unit/                         # Tests unitarios (Vitest)
│   │   ├── entities/
│   │   ├── errors/
│   │   ├── use-cases/
│   │   ├── schemas/
│   │   └── infrastructure/
│   ├── integration/                  # Tests de integración
│   │   ├── repositories/
│   │   └── services/
│   └── e2e/                          # Tests End-to-End (Playwright)
│       ├── login.spec.ts
│       ├── registro.spec.ts
│       └── comentarios.spec.ts
│
├── public/                           # Assets estáticos
│   └── images/                       # Imágenes del proyecto
│       ├── articulos/
│       ├── index/
│       └── senda_nipona_logo.png
│
├── docs/                             # Documentación técnica
│   ├── auditoria_testing.md
│   ├── SCROLLY_DESIGN_GUIDE.md
│   ├── ESTADO_PROYECTO_E2E.md
│   └── guia_tests_e2e.md
│
├── coverage/                         # Reportes de cobertura de tests
├── playwright-report/                # Reportes de Playwright (fuera de git)
├── test-results/                     # Resultados de tests E2E (fuera de git)
│
├── package.json                      # Dependencias del proyecto
├── tsconfig.json                     # Configuración TypeScript
├── next.config.mjs                   # Configuración Next.js
├── tailwind.config.ts                # Configuración Tailwind CSS
├── vitest.config.ts                  # Configuración Vitest
├── playwright.config.ts              # Configuración Playwright
├── README.md                         # Este archivo
└── INSTALL.md                        # Guía de instalación detallada
```

### Metodología Agile

El desarrollo ha seguido principios **Agile**, priorizando entregas incrementales:

* **Iteraciones cortas:** Cada funcionalidad (autenticación, artículos, comentarios) se ha implementado y probado de forma individual, permitiendo que se desarrollasen otras funcionalidades sin afectar a las anteriores.
* **Testing continuo:** Cada nueva característica se ha ido testeando de forma progresiva e individual para detectar errores y fallos de forma más sencilla.
* **Priorización de valor:** Primero las funcionalidades esenciales (lectura de artículos, registro), luego las secundarias (comentarios, animaciones). De esta manera aseguras el desarrollo de una aplicación funcional y te permites ir añadiendo funcionalidades más complejas sin preocuparte por la completitud de la aplicación.
* **Evolución de la arquitectura:** El desarrollo ágil es un gran aliado de la Clean Architecture, ya que permite ir adaptando la estructura del proyecto a medida que se añaden nuevas funcionalidades sin tener que preocuparse por la escalabilidad o mantenibilidad.

---

## 🚀 Despliegue en Producción

La aplicación está desplegada y accesible públicamente en:

### 🌐 [https://sendanipona.vercel.app/](https://sendanipona.vercel.app/)

### Infraestructura de Producción

**Plataforma de Hosting: Vercel**
* **¿Por qué Vercel?** Integración nativa con Next.js, despliegue automático desde GitHub, edge functions globales y SSL automático.
* **Características:**
  * Despliegue continuo (CD) desde la rama `main`, cada push a la rama `main` despliega automáticamente la aplicación.
  * Optimización automática de imágenes y assets, lo que mejora la velocidad de carga de la aplicación.

**Base de Datos: Turso (LibSQL)**
* **¿Por qué Turso?** Base de datos distribuida en el edge, compatible con SQLite, baja latencia global y escalabilidad automática.
* **Características:**
  * Compatible con Prisma ORM, lo que facilita la migración desde el entorno de desarrollo local.
  * Ofrece una capa de seguridad con autenticación mediante tokens, lo que garantiza que solo la aplicación pueda acceder a la base de datos.
  * Migración sencilla desde SQLite local a Turso en producción, lo que permite un desarrollo fluido sin preocuparse por la configuración de la base de datos.

### Proceso de Despliegue Realizado

1. **Creación de la base de datos en Turso:**
   * Registro en [Turso](https://turso.tech/) y creación de una nueva base de datos
   * Obtención de la `DATABASE_URL` y `DATABASE_AUTH_TOKEN`
   * Configuración de la región más cercana para optimizar latencia (Irlanda)

2. **Conexión del repositorio con Vercel:**
   * Importación del proyecto desde GitHub en el dashboard de Vercel
   * Vercel detectó automáticamente la configuración de Next.js
   * Configuración del dominio: `sendanipona.vercel.app`

3. **Configuración de variables de entorno:**
   * Añadidas las variables de entorno en el dashboard de Vercel:
     * `DATABASE_URL` (conexión a Turso)
     * `DATABASE_AUTH_TOKEN` (autenticación Turso)
     * `NEXTAUTH_SECRET` (generado para producción)
     * `NEXTAUTH_URL` (URL del dominio de producción)

4. **Ejecución de migraciones en producción:**
   * Migraciones de Prisma ejecutadas en la base de datos de Turso
   * Población de datos iniciales (artículos informativos y usuarios y comentarios de ejemplo)

5. **Despliegue continuo configurado:**
   * Cada push a la rama `main` despliega automáticamente la aplicación con los cambios más recientes

### Monitoreo y Logs

* **Vercel Analytics:** Métricas de rendimiento y Core Web Vitals (para monitorizar la experiencia de usuario en producción)
* **Vercel Logs:** Logs en tiempo real de funciones serverless (muy buenos localizar errores en producción en el caso de que los haya)
* **Turso Dashboard:** Monitoreo de queries y uso de base de datos (carga, latencia, errores)

---

## 🛠️ Instalación y Ejecución

Para ver los detalles técnicos sobre cómo clonar, instalar dependencias y ejecutar el proyecto en tu máquina local, por favor consulta el archivo dedicado:

👉 **[GUÍA DE INSTALACIÓN Y DESARROLLO (INSTALL.md)](./INSTALL.md)**

---

<p align="center">
  <sub>Desarrollado con ❤️ para el TFM de Desarrollo de Software con IA</sub>
</p>
