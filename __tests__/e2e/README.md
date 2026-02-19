# Tests E2E - Senda Nipona

> **Tests End-to-End con Playwright para la aplicación Senda Nipona**

---

## 📊 Estado Actual

- ✅ **registro.spec.ts** - 6 tests - TODOS PASANDO
- ✅ **login.spec.ts** - 5 tests - TODOS PASANDO
- ⏳ **comentarios.spec.ts** - PENDIENTE (próxima tarea)

**Total:** 11 tests E2E ejecutándose en 3 navegadores (Chromium, Firefox, Webkit)

---

## 🚀 Ejecución Rápida

```bash
# Terminal 1: Iniciar la aplicación
npm run dev

# Terminal 2: Ejecutar tests E2E
npm run test:e2e           # Modo headless
npm run test:e2e:headed    # Ver navegador
npm run test:e2e:ui        # Interfaz visual (RECOMENDADO)
```

---

## 📚 Documentación Completa

### Para Continuar el Trabajo

Si eres un nuevo agente de Claude que va a continuar con los tests E2E, **lee estos archivos en orden**:

1. **`docs/CONTINUACION_TESTS_E2E.md`** ⭐ **EMPIEZA AQUÍ**
   - Guía rápida para continuar
   - Próxima tarea: Tests de comentarios
   - Código de ejemplo listo para usar

2. **`docs/guia_tests_e2e.md`**
   - Guía completa y detallada
   - Problemas resueltos
   - Patrones y buenas prácticas

3. **`docs/ESTADO_PROYECTO_E2E.md`**
   - Estado actual del proyecto
   - Progreso visual
   - Checklist de calidad

---

## 🎯 Patrones Clave

### Generación de Datos Únicos
```typescript
// SIEMPRE usar este patrón para evitar conflictos
const generateTestUser = (browserName: string) => ({
    name: 'Usuario Test',
    email: `test.${browserName}.${Date.now()}.${Math.random().toString(36).substring(7)}@example.com`,
    password: 'password123',
});
```

### Selectores Semánticos
```typescript
// ✅ BUENO
page.getByRole('button', { name: 'Entrar' })
page.getByPlaceholder('Correo electrónico')
page.getByText('Credenciales inválidas.')

// ❌ EVITAR
page.locator('#email')
page.locator('.btn-primary')
```

---

## 📁 Archivos en esta Carpeta

- `registro.spec.ts` - Tests del flujo de registro de usuarios
- `login.spec.ts` - Tests del flujo de login
- `README.md` - Este archivo

---

## 🔗 Enlaces Útiles

- [Documentación de Playwright](https://playwright.dev/docs/intro)
- [Guía completa del proyecto](../../docs/guia_tests_e2e.md)
- [Próximos pasos](../../docs/CONTINUACION_TESTS_E2E.md)

---

**Última actualización:** 2026-02-19

