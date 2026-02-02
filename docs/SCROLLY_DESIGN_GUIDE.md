# Guía de Diseño Scrollytelling (v2.0)

Documento de referencia para crear páginas con el estilo **"Inmersión Scrollytelling"**.
Convierte artículos en experiencias narrativas visuales fluidas, elegantes y legibles.

---

## Filosofía Central

> "El scroll es el viaje. La legibilidad es el vehículo."

El diseño scrolly prioriza:
- **Narrativa visual** sobre estructura rígida.
- **Tipografía consistente** y generosa (`text-lg`).
- **Colores orgánicos y maduros** (evitar neones saturados).
- **Contraste inteligente** para elementos interactivos.

---

## Estructura de Página

```
┌────────────────────────────────────────┐
│           HERO (100vh)                 │  ← 🔒 OBLIGATORIO
│         Imagen + Overlay + Título      │     Pantalla completa, título animado
└────────────────────────────────────────┘
┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐
│                                        │
│     CONTENIDO NARRATIVO                │  ← 🎨 RITMO VISUAL
│     (Alternancia de fondos)            │     Texto estandarizado + Imágenes
│                                        │
└ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘
┌────────────────────────────────────────┐
│     SECCIÓN FINAL - Fondo Oscuro       │  ← 🔒 OBLIGATORIO
│     Grid de tarjetas con iconos        │     Evitar colores "radioactivos"
│     (Curiosidades)                     │     Usar Stone-900 o Slate-900
└────────────────────────────────────────┘
```

---

## Reglas Maestras de Diseño

### 1. Tipografía y Legibilidad (CRÍTICO)

Evita mezclar tamaños arbitrarios. Usa un estándar único para todo el cuerpo de texto narrativo.

- **Párrafos**: Siempre **`text-lg leading-relaxed`**.
  - *Por qué*: `text-base` es muy pequeño para pantallas modernas de lectura inmersiva, y `prose-xl` es demasiado grande. `text-lg` es el punto dulce.
  - **Color Texto**: `text-slate-700` (sobre claro) o `text-slate-300` (sobre oscuro). Nunca negro puro (#000) ni blanco puro (#FFF) para textos largos.

### 2. Paleta de Colores "Madura"

Evita la fatiga visual. Sustituye colores primarios saturados por tonos tierra/piedra.

| Elemento | Evitar ❌ | Usar ✅ | Descripción |
|----------|-----------|---------|-------------|
| **Acento** | `orange-500`, `red-600` | `amber-700`, `orange-800` | Tonos ladrillo, dorado, tierra. Más elegantes. |
| **Fondos Oscuros** | `black`, `slate-950` | `slate-900`, `stone-900` | Menos contraste agresivo. |
| **Fondos Claros** | `white` | `#fdfbf7`, `#f4f1ea`, `stone-100` | Papel, crema, hueso. |
| **Sección Final** | Fondos de color chillón | Fondo Oscuro (`stone-900`) | Usa el color chillón solo en iconos pequeños. |

### 3. Navegación Flotante

- **Posición**: Siempre a la **IZQUIERDA** (`fixed left-10`).
  - *Razón*: No interfiere con la barra de scroll del navegador a la derecha.
- **Estilo**: Píldora glassmorphism que se expande al hover.
- **Visibilidad**: Oculta en móviles (`hidden xl:flex`).

```tsx
<nav className="fixed left-10 top-1/2 -translate-y-1/2 z-50 ...">
   {/* Items */}
</nav>
```

### 4. Estrategia de Contraste (Fondo sobre Fondo)

Si tienes un componente complejo (ej. Carrusel, Tarjeta grande) que tiene su propio fondo oscuro:
- **La sección contenedora DEBE ser clara**.
- *Regla*: Oscuro sobre Claro ✅ | Claro sobre Oscuro ✅ | Oscuro sobre Oscuro ❌ (Se empasta).

---

## Componentes y Código Base

### Hero Section

```tsx
<section className="relative h-screen flex items-center justify-center overflow-hidden">
    {/* Imagen + Overlay */}
    <div className="absolute inset-0 z-0">
        <Image src="..." fill className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900" />
    </div>
    
    {/* Título */}
    <h1 className="text-8xl md:text-[12rem] font-black text-white font-ai-love">TÍTULO</h1>
</section>
```

### Animaciones (Framer Motion)

Mantener sutiles. "Aparecer es mejor que rebotar".

```tsx
// Estándar para textos e imágenes
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.8 }}
```

### Títulos de Sección

```tsx
<h2 className="text-4xl md:text-5xl font-black mb-12 relative inline-block tracking-tight text-slate-900">
    Título de Sección
    <span className="absolute -bottom-2 right-0 w-24 h-2 bg-amber-600" />
</h2>
```

---

## Patrones Visuales Aprobados

### 1. Timeline Vertical
Línea central con alternancia de contenido izquierda/derecha.
- **Fondo recomendado**: Oscuro (`slate-900`).
- **Texto**: `text-slate-300 text-lg leading-relaxed`.

### 2. Grid de Personajes/Tarjetas
- **Hover**: `whileHover={{ y: -5 }}` (Sutil, no -10 o -20).
- **Imagen**: Efecto zoom suave al hover.
- **Sombra**: `shadow-md` a `shadow-xl`.

### 3. Imagen con Marco Creativo
```tsx
<div className="relative ...">
    {/* Borde doble decorativo */}
    <div className="absolute ... border-8 border-double border-stone-200 rounded-t-full" />
    {/* Mancha de color multiplicar */}
    <div className="absolute ... bg-amber-900 mix-blend-multiply opacity-80" />
</div>
```

---

## Checklist de Calidad Final

Antes de dar por buena una página scrolly, verifica:

- [ ] **Navegación**: ¿Está a la izquierda y funciona el scroll suave?
- [ ] **Texto**: ¿Todo el cuerpo narrativo es `text-lg leading-relaxed`?
- [ ] **Colores**: ¿Te "deslumbra" alguna sección? Si es sí, oscurécela.
- [ ] **Contraste**: ¿Se leen bien los textos sobre las imágenes o fondos?
- [ ] **Componentes**: ¿Destacan los carruseles/tarjetas sobre el fondo de su sección?
- [ ] **Móvil**: ¿Se ve bien sin la navegación flotante?

---

## Dependencias
- `framer-motion`
- `lucide-react` (Iconos consistentes)
- `next/image`
