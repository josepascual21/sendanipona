# Plan de Implementación: Componente HeroSection Reutilizable

## Objetivo
Estandarizar la sección "Hero" (pantalla completa inicial) de todos los artículos para asegurar consistencia en tamaños, animaciones y estructura, manteniendo la flexibilidad para personalizaciones únicas (fuentes, colores, superposiciones).

## Nuevo Componente: `HeroSection`

Ubicación: `src/components/articles/HeroSection.tsx`

### Props Propuestas
```typescript
interface HeroSectionProps {
  backgroundImage: string;
  title: React.ReactNode; // Permite strings o elementos complejos con spans
  subtitle?: string;
  scrollText?: string; // Default: "Descubre"
  accentColor?: string; // Clase de Tailwind (ej: "text-amber-500", "bg-amber-500") o nombre de color genérico si usamos mapeo
  overlayOpacity?: number; // Default: 0.6
  titleClassName?: string; // Para fuentes especificas (font-serif, font-ai-love, etc)
  children?: React.ReactNode; // Para elementos extra (bordes, sellos, efectos oscuros extra)
}
```

### Características
- **Altura fija**: `h-screen`
- **Animaciones estándar**: Framer Motion para entrada de título, subtítulo e indicador de scroll.
- **Imagen de fondo**: `next/image` con `fill` y `object-cover`.
- **Gradientes base**: Siempre incluirá el gradiente inferior para legibilidad del scroll.

## Estrategia de Migración

1.  **Crear Componente**: Implementar `HeroSection.tsx` con todas las variantes detectadas.
2.  **Exportar**: Añadir a `index.ts`.
3.  **Refactorizar Uno a Uno**:
    -   Sustituir el bloque `<section className="h-screen...">` por `<HeroSection ... />`.
    -   Pasar los datos específicos (imágenes, textos) como props.
    -   Recrear los elementos únicos (como el borde de JDM o el Kanji de Shodo) usando `children` o props de título enriquecido.


## Estado de la Migración

- [x] `anime-manga`
- [x] `futuro`
- [x] `jdm`
- [x] `kioto`
- [x] `osaka`
- [x] `presente`
- [x] `shodo`
- [x] `videojuegos`
- [x] `tokyo`
- [x] `pasado`
