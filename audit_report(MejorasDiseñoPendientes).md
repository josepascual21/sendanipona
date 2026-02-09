# Informe de Auditoría de Diseño - Artículos Senda Nipona

**Fecha**: 7 de Febrero 2026  
**Archivos analizados**: 10 artículos + SCROLLY_DESIGN_GUIDE.md

---

## 📋 Resumen Ejecutivo

> He analizado **línea por línea** los 10 artículos del proyecto. El diagnóstico general es que **existe buena cohesión visual** pero hay **redundancia de código** y **pequeñas inconsistencias** que podrían mejorarse significativamente con una refactorización.

---

## 1. 🔴 Componentes Duplicados (Problema Principal)

### NavigationPill - Duplicado 10 veces

Cada artículo define su propio `NavigationPill` de forma casi idéntica. Solo cambia:
- El color hover (`amber-700`, `indigo-700`, `cyan-600`, `red-800`, `violet-700`, `emerald-600`, `orange-500`, `red-700`)
- El array de secciones

```tsx
// Repetido en CADA archivo:
const NavigationPill = () => (
    <nav className="hidden xl:flex flex-col gap-4 fixed left-10 top-1/2 -translate-y-1/2 z-50">
        {/* ... mismo código ... */}
    </nav>
);
```

**Recomendación**: Crear un componente compartido `NavigationPill` que reciba `accentColor` y `sections` como props.

---

### SectionTitle - Duplicado con variaciones

| Artículo | Variante |
|----------|----------|
| `pasado` | Solo `children`, barra `bg-amber-600` |
| `presente` | Solo `children`, barra `bg-indigo-600` |
| `futuro` | Solo `children`, barra `bg-cyan-500` |
| `jdm` | Tiene prop `align`, barra posición dinámica |
| `anime-manga` | Tiene prop `align`, barra `bg-violet-600` |
| `videojuegos` | Tiene prop `align`, barra **gradiente** |
| `tokyo` | Tamaño diferente (`text-6xl`), sombra glow cyan |
| `osaka` | Tiene prop `align`, sombra glow orange |
| `kioto` | Tiene prop `align`, sombra glow amber |
| `shodo` | Tiene props `align` + `dark`, barra `bg-red-600` |

**Problema**: 
- No hay consistencia ni en firma ni en estilo
- Algunos tienen glow, otros no
- Algunos permiten alineación, otros no

**Recomendación**: Un único componente `SectionTitle` con props: `children`, `align`, `accentColor`, `hasGlow`.

---

## 2. 🟠 Inconsistencias de Diseño

### 2.1 Paleta de Fondos Base

| Artículo | Fondo Base | Alternancia |
|----------|------------|-------------|
| `pasado` | `bg-slate-900` | slate-900 ↔ slate-950 ✅ |
| `presente` | `bg-slate-900` | slate-900 ↔ slate-950 ✅ |
| `futuro` | `bg-slate-950` | slate-900 ↔ slate-950 ✅ |
| `jdm` | `bg-slate-900` | slate-900 ↔ slate-950 ✅ |
| `anime-manga` | `bg-slate-900` | slate-900 ↔ slate-950 ✅ |
| `videojuegos` | `bg-slate-900` | slate-900 ↔ slate-950 ✅ |
| `tokyo` | `bg-slate-900` | slate-900 ↔ slate-950 ✅ |
| `osaka` | `bg-stone-900` | stone-900 ↔ stone-950 ⚠️ |
| `kioto` | `bg-stone-900` | stone-900 ↔ stone-950 ⚠️ |
| `shodo` | `bg-slate-950` | slate-900 ↔ slate-950 ✅ |

**Problema**: Osaka y Kioto usan `stone` mientras el resto usa `slate`. Aunque intencionado para "calidez", rompe la coherencia.

---

### 2.2 Sección Final (Curiosidades)

| Artículo | Fondo Final | Consistente con Guía |
|----------|-------------|----------------------|
| `pasado` | `bg-stone-950` | ✅ |
| `presente` | `bg-stone-950` | ✅ |
| `futuro` | `bg-black` | ⚠️ Diferente |
| `jdm` | `bg-stone-950` | ✅ |
| `anime-manga` | `bg-stone-950` | ✅ |
| `videojuegos` | `bg-stone-950` | ✅ |
| `tokyo` | `bg-black` | ⚠️ Diferente |
| `osaka` | `bg-stone-950` | ✅ |
| `kioto` | `bg-stone-950` | ✅ |
| `shodo` | `bg-stone-950` | ✅ |

---

### 2.3 Hero Section - Tamaños de Título

| Artículo | Tamaño Desktop | Font Especial |
|----------|----------------|---------------|
| `pasado` | `text-[12rem]` | `font-ai-love` |
| `presente` | `text-[10rem]` | `font-ai-love` |
| `futuro` | `text-[10rem]` | `font-ai-love` |
| `jdm` | `text-[12rem]` | `italic` |
| `anime-manga` | `text-[10rem]` | Gradiente transparente |
| `videojuegos` | `text-[11rem]` | Ninguna |
| `tokyo` | `text-[13rem]` | Gradiente |
| `osaka` | `text-[10rem]` | Ninguna |
| `kioto` | `text-[10rem]` | `font-serif` |
| `shodo` | `text-[12rem]` | Ninguna |

**Problema**: Los tamaños oscilan entre `10rem` y `13rem` sin justificación aparente (¿longitud de palabra?).

---

### 2.4 Tarjetas de Contenido (Grid de Cards)

Hay **5 estilos diferentes** de tarjetas en el proyecto:

1. **Standard Card** (pasado/personajes): Imagen superior + contenido inferior, borde `slate-700`
2. **Hover Reveal Card** (jdm/modelos): Contenido se revela en hover
3. **Wide Card** (presente/cultura-pop): Grid horizontal imagen + texto
4. **Staggered Card** (osaka/gastronomía): Layout alternante con números
5. **Mini Card** (videojuegos): Con badge de compañía

**Problema**: No existe un sistema de tarjetas documentado. Cada artículo inventa su propio estilo.

---

### 2.5 Estructura de Datos (Constantes)

| Artículo | Tiene `IMAGES` | Tiene `SECTIONS` | Tiene `CURIOSITIES` |
|----------|----------------|------------------|---------------------|
| `pasado` | ✅ Completo | ❌ Inline | ✅ |
| `presente` | ❌ Inline | ❌ Inline | ✅ |
| `futuro` | ❌ Inline | ❌ Inline | ✅ |
| `jdm` | ✅ Completo | ❌ Inline | ✅ |
| `anime-manga` | ✅ Completo | ❌ Inline | ✅ |
| `videojuegos` | ✅ Completo | ❌ Inline | ✅ |
| `tokyo` | ✅ Completo | ✅ Separado | ✅ |
| `osaka` | ✅ Completo | ✅ Separado | ✅ |
| `kioto` | ✅ Completo | ✅ Separado | ✅ |
| `shodo` | ✅ Completo | ❌ Inline | ✅ |

**Problema**: Algunos artículos tienen las secciones de navegación como constante separada (`SECTIONS`) y otros las definen inline. Lo ideal es siempre tenerlas separadas.

---

## 3. 🟡 Detalles Menores

### 3.1 Hover Amount en Cards

La guía especifica `whileHover={{ y: -5 }}` máximo, pero encontramos:

- `anime-manga` géneros: `whileHover={{ y: -10 }}` ⚠️ Viola la guía

### 3.2 Import no utilizado

- `kioto/page.tsx` línea 19: `import { int } from 'zod';` → **Import no usado**

### 3.3 Subtítulo Hero inconsistente

| Artículo | Color Subtítulo |
|----------|-----------------|
| `pasado` | `text-amber-200` |
| `presente` | `text-indigo-400` |
| `futuro` | `text-slate-400` ⚠️ |
| `jdm` | `text-red-200` |
| `anime-manga` | `text-violet-200` |
| `videojuegos` | `text-emerald-200` |
| `tokyo` | `text-cyan-300` |
| `osaka` | `text-orange-200` |
| `kioto` | `text-amber-100` |
| `shodo` | `text-red-200` |

**Problema**: `futuro` usa `slate-400` que es neutro, no el color de acento.

---

## 4. ✅ Puntos Positivos

- **Consistencia en animaciones**: Todos usan `viewport={{ once: true }}` correctamente
- **Estructura Hero**: Todos tienen hero 100vh con overlay y scroll indicator
- **Tipografía narrativa**: Casi todos usan `text-lg leading-relaxed` para párrafos
- **Alternancia de fondos**: La mayoría respeta el patrón A/B/A/B
- **Sección de curiosidades**: Presente en todos con estructura similar

---

## 5. 📊 Propuesta de Refactorización

### Componentes Compartidos a Crear

```
src/components/articles/
├── NavigationPill.tsx      // Recibe: sections[], accentColor
├── SectionTitle.tsx        // Recibe: children, align, accentColor, hasGlow
├── HeroSection.tsx         // Recibe: title, subtitle, image, accentColor
├── CuriositiesGrid.tsx     // Recibe: items[], accentColor
├── ContentCard.tsx         // Variantes: standard, reveal, wide, staggered
└── ScrollIndicator.tsx     // Recibe: label, accentColor
```

### Sistema de Tokens de Color

```tsx
const ARTICLE_THEMES = {
  pasado: { accent: 'amber', base: 'slate' },
  presente: { accent: 'indigo', base: 'slate' },
  futuro: { accent: 'cyan', base: 'slate' },
  jdm: { accent: 'red', base: 'slate' },
  'anime-manga': { accent: 'violet', base: 'slate' },
  videojuegos: { accent: 'emerald', base: 'slate' },
  tokyo: { accent: 'cyan', base: 'slate' },
  osaka: { accent: 'orange', base: 'stone' },
  kioto: { accent: 'amber', base: 'stone' },
  shodo: { accent: 'red', base: 'slate' },
};
```

---

## 6. 📋 Conclusión

| Aspecto | Estado | Prioridad |
|---------|--------|-----------|
| Componentes duplicados | 🔴 Crítico | Alta |
| Inconsistencias de estilo | 🟠 Moderado | Media |
| Estructuras de datos | 🟡 Menor | Baja |
| Cumplimiento de guía | ✅ Bueno | - |

**Veredicto**: El código actual es **funcional y visualmente coherente**, pero tiene **deuda técnica significativa** por la duplicación de componentes. Se recomienda una fase de extracción de componentes compartidos antes de añadir nuevos artículos.

---

*Informe generado para revisión por el usuario.*
