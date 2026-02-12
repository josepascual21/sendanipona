# 🏛️ Violaciones de Clean Architecture Pendientes

> Estado actual: **12 de 12 violaciones corregidas** ✅ (4 ALTAS ✅ + 4 MEDIAS ✅ + 4 BAJAS ✅)

---

## ✅ Todas las violaciones han sido resueltas

### Historial de correcciones (prioridad BAJA)

| # | Violación | Estado | Solución aplicada |
|---|-----------|--------|-------------------|
| 9 | Datos de UI en `core/` | ✅ Resuelto | Movidos a `src/shared/constants/` y `src/shared/data/` |
| 10 | Errores genéricos | ✅ Resuelto | Creados `InvalidEntityError`, `CommentNotFoundError`, `UnauthorizedDeleteError` |
| 11 | `IArticleRepository` sin `create` | ✅ Resuelto | Documentado como solo lectura por diseño |
| 12 | Falta barrel exports | ✅ Resuelto | Creados `index.ts` en `auth/` y `comments/`, actualizado `container.ts` |
