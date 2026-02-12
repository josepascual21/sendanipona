# 🏛️ Violaciones de Clean Architecture Pendientes

> Estado actual: **8 de 12 violaciones corregidas** (4 ALTAS ✅ + 4 MEDIAS ✅)

---

## 🟢 Prioridad BAJA — Mejoras de Diseño

### #9 — Datos de UI ubicados en `core/`

**Archivos afectados:**
- `src/core/data/home-data.ts` — Textos de la home (quotes, principios)
- `src/core/constants/app-constants.ts` — Logo, footer, metadata UI

**Problema:** Estos archivos contienen datos de presentación (textos de UI, rutas de imágenes, configuración del footer, links de redes sociales) ubicados dentro de `core/`. Según Clean Architecture, `core/` solo debería contener lógica de negocio.

**Solución propuesta:** Mover `constants/` y `data/` fuera de `core/`, por ejemplo a `src/app/data/` o `src/shared/constants/`.

---

### #10 — Errores genéricos en vez de errores de dominio específicos

**Archivos afectados:**
- `src/core/application/use-cases/comments/DeleteCommentUseCase.ts` — Lanza `new Error('Comentario no encontrado')` y `new Error('No tienes permiso...')`
- Todas las entidades de dominio (`User`, `Article`, `Comment`, `ArticleTopic`) lanzan `new Error(...)` genéricos en sus validaciones

**Problema:** Se usan errores genéricos `Error` en lugar de errores de dominio tipados. Esto dificulta el manejo diferenciado de errores en las capas superiores.

**Solución propuesta:** Crear errores de dominio específicos:
- `CommentNotFoundError`
- `UnauthorizedDeleteError`
- `InvalidEntityError` (para validaciones de entidades)

**Nota:** Ya existen `UserAlreadyExistsError` y `CommentAlreadyExistsError` como referencia del patrón a seguir.

---

### #11 — La interfaz `IArticleRepository` no tiene método `create`

**Archivo afectado:**
- `src/core/domain/repositories/IArticleRepository.ts`

**Problema:** Si en el futuro se necesita crear artículos desde la aplicación, la interfaz del repositorio no lo soporta. Actualmente los artículos son de solo lectura, así que esto es una mejora preventiva.

**Solución propuesta:** Añadir `create(article: Omit<Article, 'id' | 'createdAt'>): Promise<Article>` a la interfaz cuando se necesite la funcionalidad de escritura.

**Nota:** El usuario ha confirmado que los artículos son **solo lectura**, por lo que esta mejora no es urgente.

---

### #12 — Falta barrel export en carpetas de use cases

**Estructura actual:**
- `src/core/application/use-cases/articles/index.ts` — ✅ Tiene barrel export
- `src/core/application/use-cases/comments/` — ❌ No tiene `index.ts`
- `src/core/application/use-cases/auth/` — ❌ No tiene `index.ts`

**Problema:** Inconsistencia organizativa. Los imports desde `auth/` y `comments/` requieren especificar el archivo concreto, mientras que `articles/` permite importar desde el barrel.

**Solución propuesta:** Crear archivos `index.ts` en `comments/` y `auth/` que re-exporten los use cases.

---

## 📊 Resumen

| # | Violación | Prioridad | Esfuerzo |
|---|-----------|-----------|----------|
| 9 | Datos de UI en `core/` | 🟢 BAJA | Medio (mover archivos + actualizar imports) |
| 10 | Errores genéricos | 🟢 BAJA | Medio (crear clases de error + actualizar use cases) |
| 11 | `IArticleRepository` sin `create` | 🟢 BAJA | Bajo (solo si se necesita escritura) |
| 12 | Falta barrel exports | 🟢 BAJA | Bajo (crear 2 archivos `index.ts`) |
