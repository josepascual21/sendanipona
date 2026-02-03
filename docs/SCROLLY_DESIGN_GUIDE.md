# Guía de Diseño Scrollytelling (v3.0)

Documento de referencia para crear páginas de artículos con el estilo **"Inmersión Scrollytelling"**.
Convierte artículos en experiencias narrativas visuales fluidas, elegantes y legibles.

---

## 1. Filosofía Central

> "El scroll es el viaje. La legibilidad es el vehículo."

El diseño scrolly prioriza:
- **Narrativa visual** sobre estructura rígida.
- **Tipografía consistente** y generosa.
- **Colores oscuros y maduros** que no fatiguen la vista.
- **Ritmo visual** mediante alternancia de tonos, no de luminosidad extrema.
- **Contraste inteligente** para elementos interactivos.

---

## 2. Estructura General de Página

Toda página de artículo debe seguir esta estructura fundamental:

```
┌────────────────────────────────────────┐
│           HERO SECTION (100vh)         │  ← OBLIGATORIO
│         Imagen + Overlay + Título      │     Pantalla completa
└────────────────────────────────────────┘
┌────────────────────────────────────────┐
│       SECCIÓN INTRODUCTORIA            │  ← OBLIGATORIO
│       Contexto general del tema        │     Primer tono oscuro
└────────────────────────────────────────┘
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐
│                                        │
│     SECCIONES DE CONTENIDO             │  ← RITMO VISUAL
│     (Alternancia de tonos oscuros)     │     Cantidad variable
│                                        │
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘
┌────────────────────────────────────────┐
│     SECCIÓN FINAL - Más Oscura         │  ← OBLIGATORIO
│     Cierre del artículo                │     Tono más profundo
└────────────────────────────────────────┘
```

---

## 3. Sistema de Colores

### 3.1. Paleta de Fondos (Alternancia de Tonos Oscuros)

Para evitar el "efecto cegamiento" al saltar entre claro y oscuro, utilizamos una **alternancia sutil entre dos tonos oscuros**:

| Propósito | Tono Primario (A) | Tono Secundario (B) | Sección Final |
|-----------|-------------------|---------------------|---------------|
| **Estándar** | `slate-900` | `slate-950` | `stone-950` o `black` |
| **Cálido** | `stone-900` | `stone-950` | `neutral-950` |
| **Frío/Tech** | `slate-900` | `slate-950` | `black` |

**Regla de oro**: Alternar A → B → A → B... y terminar siempre con el tono más oscuro disponible.

### 3.2. Colores de Acento (Por Temática)

Cada artículo puede tener una paleta de acento que lo identifique:

| Temática | Color Principal | Color Secundario | Uso |
|----------|-----------------|------------------|-----|
| Histórico | `amber-700` | `amber-500` | Títulos, hovers, decoraciones |
| Moderno/Social | `indigo-600` | `indigo-400` | Énfasis, botones |
| Tecnológico | `cyan-500` | `fuchsia-500` | Gradientes, efectos glow |
| Automotriz/Intenso | `red-800` | `red-600` | Bordes, iconos |

### 3.3. Colores de Texto

| Contexto | Clase Tailwind | Descripción |
|----------|----------------|-------------|
| **Texto principal** | `text-slate-200` o `text-slate-300` | Contenido narrativo |
| **Texto secundario** | `text-slate-400` o `text-slate-500` | Subtítulos, descripciones cortas |
| **Énfasis** | `text-[acento]-400` o `text-[acento]-500` | Palabras clave, términos importantes |
| **Títulos** | `text-white` | Máximo contraste |

> [!CAUTION]
> Nunca usar `text-black` ni `text-white` para párrafos largos. Fatigan la vista.

---

## 4. Tipografía

### 4.1. Regla de Oro

**Todo el contenido narrativo debe usar: `text-lg leading-relaxed`**

- `text-base` es demasiado pequeño para lectura inmersiva.
- `text-xl` o superior rompe el ritmo de lectura.
- `text-lg` es el punto dulce para pantallas modernas.

### 4.2. Jerarquía Tipográfica

| Elemento | Clases Tailwind | Ejemplo de Uso |
|----------|-----------------|----------------|
| **Título Hero** | `text-7xl md:text-[10rem] font-black tracking-tighter` | Título principal del artículo |
| **Subtítulo Hero** | `text-xl md:text-3xl font-light tracking-[0.3em] uppercase` | Tagline bajo el título |
| **Título de Sección** | `text-4xl md:text-5xl font-black tracking-tight` | Encabezados de secciones principales |
| **Subtítulo de Sección** | `text-xl text-slate-400` | Descripción bajo títulos de sección |
| **Párrafos** | `text-lg leading-relaxed text-slate-300` | Todo el contenido narrativo |
| **Texto de Tarjetas** | `text-lg leading-relaxed` | Descripciones en tarjetas |
| **Etiquetas/Metadata** | `text-sm font-mono uppercase tracking-wider` | Fechas, categorías, tags |

### 4.3. Alineación de Texto

- **Párrafos largos**: `text-justify` para un aspecto editorial limpio.
- **Descripciones cortas**: `text-left` o `text-center` según el layout.
- **Nombres/Títulos en tarjetas**: `text-left`.

---

## 5. Componentes Estándar

### 5.1. Hero Section

La sección hero es **obligatoria** y debe ocupar el 100% del viewport inicial.

```tsx
<section className="relative h-screen flex items-center justify-center overflow-hidden">
    {/* Imagen de fondo con overlay */}
    <div className="absolute inset-0 z-0">
        <Image src="..." fill className="object-cover opacity-60" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900" />
    </div>

    {/* Contenido centrado */}
    <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-7xl md:text-[10rem] leading-none font-black text-white tracking-tighter"
        >
            TÍTULO
        </motion.h1>
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-3xl font-light tracking-[0.3em] text-[acento]-200 uppercase mt-4"
        >
            Subtítulo del artículo
        </motion.p>
    </div>

    {/* Indicador de scroll */}
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
        <span className="text-xs uppercase tracking-widest text-slate-400">Descubre</span>
        <div className="w-[1px] h-16 bg-[acento]-500" />
    </motion.div>
</section>
```

### 5.2. Navegación Flotante (Píldora)

Navegación lateral que permite saltar entre secciones.

**Requisitos:**
- Posición: **Siempre a la izquierda** (`fixed left-10 top-1/2 -translate-y-1/2`).
- Estilo: **Fondo blanco/claro** con glassmorphism para máximo contraste sobre fondos oscuros.
- Visibilidad: Oculta en móviles (`hidden xl:flex`).
- Comportamiento: Expande al hover mostrando el nombre de la sección.

```tsx
const NavigationPill = () => (
    <nav className="hidden xl:flex flex-col gap-4 fixed left-10 top-1/2 -translate-y-1/2 z-50">
        {SECTIONS.map((item) => (
            <Link
                key={item.id}
                href={item.id}
                className="group flex items-center gap-3 bg-white/90 backdrop-blur-md p-3 rounded-full 
                         hover:bg-[acento]-700 hover:text-white transition-all duration-300 
                         w-12 hover:w-40 overflow-hidden whitespace-nowrap 
                         border border-slate-200 shadow-lg text-slate-700"
            >
                <span className="min-w-[20px] flex justify-center">{item.icon}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-sm">
                    {item.label}
                </span>
            </Link>
        ))}
    </nav>
);
```

### 5.3. Título de Sección

Componente reutilizable para encabezados de sección.

```tsx
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-4xl md:text-5xl font-black mb-12 relative inline-block tracking-tight text-white">
        {children}
        <span className="absolute -bottom-2 right-0 w-24 h-2 bg-[acento]-600" />
    </h2>
);
```

### 5.4. Sección de Contenido Estándar

Template base para cualquier sección de contenido:

```tsx
<section id="nombre-seccion" className="py-24 md:py-32 bg-slate-900"> {/* Alternar con slate-950 */}
    <div className="max-w-7xl mx-auto px-6">
        {/* Encabezado de sección */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
            <SectionTitle>Título de la Sección</SectionTitle>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mt-6">
                Breve descripción o introducción a esta sección.
            </p>
        </motion.div>

        {/* Contenido específico de la sección */}
        {/* ... */}
    </div>
</section>
```

### 5.5. Tarjetas de Contenido

Para mostrar elementos en grid (personajes, conceptos, productos, etc.):

```tsx
<motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="group bg-slate-800 rounded-xl overflow-hidden shadow-lg 
               border border-slate-700 hover:border-[acento]-700/50 
               transition-all duration-300"
>
    {/* Imagen */}
    <div className="h-64 relative overflow-hidden">
        <Image
            src="..."
            alt="..."
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
    </div>

    {/* Contenido */}
    <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">Título</h3>
        <p className="text-slate-300 text-lg leading-relaxed">
            Descripción del elemento.
        </p>
    </div>
</motion.div>
```

### 5.6. Sección de Curiosidades/Cierre

La sección final siempre usa el tono más oscuro y estructura de grid con iconos:

```tsx
<section id="curiosidades" className="py-32 bg-stone-950">
    <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black mb-16 text-white border-b border-slate-800 pb-8">
            TÍTULO DE CIERRE
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ITEMS.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group"
                >
                    {/* Icono */}
                    <div className="mb-6 bg-slate-900 text-[acento]-500 w-14 h-14 rounded-2xl 
                                  flex items-center justify-center 
                                  group-hover:bg-[acento]-900/30 transition-colors 
                                  border border-slate-800">
                        {item.icon}
                    </div>
                    
                    {/* Texto */}
                    <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-lg 
                                border-l-2 border-slate-800 pl-4 
                                group-hover:border-[acento]-600 transition-colors">
                        {item.text}
                    </p>
                </motion.div>
            ))}
        </div>
    </div>
</section>
```

---

## 6. Animaciones

### 6.1. Principio Fundamental

> "Aparecer es mejor que rebotar."

Las animaciones deben ser **sutiles y no distraer** del contenido.

### 6.2. Animaciones Estándar

```tsx
// Aparición básica (texto, imágenes, tarjetas)
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.8 }}

// Hover en tarjetas (sutil, nunca más de -5)
whileHover={{ y: -5 }}

// Zoom de imagen en hover
className="transition-transform duration-700 group-hover:scale-105"

// Aparición escalonada (para grids)
transition={{ delay: index * 0.1, duration: 0.6 }}
```

### 6.3. Reglas de Animación

| Elemento | Animación Permitida | Evitar |
|----------|---------------------|--------|
| Tarjetas | `y: -5` en hover | `y: -10` o mayor |
| Imágenes | `scale: 1.05` en hover | `scale: 1.2` o mayor |
| Texto | Fade in con `y: 30` | Bounces, rotaciones |
| Iconos | Color transition | Animaciones complejas |

---

## 7. Imágenes y Media

### 7.1. Tratamiento de Imágenes

- **Hero**: `opacity-60` + overlay gradient para legibilidad del título.
- **En tarjetas**: Overlay gradient `from-slate-900 via-transparent to-transparent`.
- **En secciones**: Pueden tener un tinte del color de acento con `mix-blend-multiply`.

### 7.2. Aspect Ratios Recomendados

| Uso | Ratio | Ejemplo de Altura |
|-----|-------|-------------------|
| Hero | 16:9 o pantalla completa | `h-screen` |
| Tarjetas | 4:3 o 1:1 | `h-64` a `h-80` |
| Imágenes laterales | 3:4 | `h-[60vh]` a `h-[70vh]` |

---

## 8. Responsive Design

### 8.1. Breakpoints Principales

| Breakpoint | Uso |
|------------|-----|
| `md` (768px) | Cambio de layout de 1 a 2 columnas |
| `lg` (1024px) | Grids de 3 columnas |
| `xl` (1280px) | Mostrar navegación flotante |

### 8.2. Patrones Responsivos

```tsx
// Grid adaptativo
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"

// Ocultar en móvil
className="hidden xl:flex"

// Tipografía adaptativa
className="text-4xl md:text-5xl"
```

---

## 9. Checklist de Calidad

Antes de dar por terminada una página de artículo, verificar:

### Estructura
- [ ] Hero section ocupa 100vh
- [ ] Mínimo 3 secciones de contenido
- [ ] Sección final con el tono más oscuro

### Tipografía
- [ ] Todo el contenido narrativo usa `text-lg leading-relaxed`
- [ ] No hay texto `text-base` en párrafos principales
- [ ] Los títulos usan la jerarquía definida

### Colores
- [ ] Fondos alternan entre dos tonos oscuros (A/B/A/B)
- [ ] No hay transiciones bruscas claro/oscuro que "cieguen"
- [ ] El color de acento se usa consistentemente

### Navegación
- [ ] Navegación flotante a la izquierda
- [ ] Todos los IDs de sección coinciden con los enlaces
- [ ] Scroll suave activado

### Animaciones
- [ ] Todas las animaciones tienen `viewport={{ once: true }}`
- [ ] Hover en tarjetas no supera `y: -5`
- [ ] No hay animaciones que distraigan del contenido

### Responsive
- [ ] Se ve correctamente en móvil (sin navegación flotante)
- [ ] Los grids colapsan correctamente
- [ ] Las imágenes tienen `sizes` apropiados

---

## 10. Dependencias Técnicas

```json
{
  "dependencies": {
    "framer-motion": "^10.x",
    "lucide-react": "^0.x",
    "next": "^14.x"
  }
}
```

### Importaciones Base

```tsx
'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { /* iconos necesarios */ } from 'lucide-react';
```

---

## 11. Ejemplo de Estructura de Datos

```tsx
// Definir constantes al inicio del archivo
const IMAGES = {
    banner: "/images/articulos/[nombre]/banner.jpg",
    intro: "/images/articulos/[nombre]/intro.jpg",
    // ...
};

const SECTIONS = [
    { id: '#intro', label: 'Introducción', icon: <Info size={20} /> },
    { id: '#seccion-1', label: 'Sección 1', icon: <Star size={20} /> },
    // ...
];

const CURIOSITIES = [
    {
        icon: <IconName className="w-6 h-6" />,
        title: "Título",
        text: "Descripción..."
    },
    // ...
];
```

---

*Última actualización: Febrero 2026 - v3.0*
