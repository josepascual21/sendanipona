# 🚀 GUÍA RÁPIDA: Continuar con Tests E2E

> **Para el próximo agente de Claude:** Esta es una guía rápida para continuar el trabajo de tests E2E. Lee primero `docs/guia_tests_e2e.md` para detalles completos.

---

## ✅ Estado Actual (2026-02-19)

### Tests Completados
- ✅ **Registro** (`__tests__/e2e/registro.spec.ts`) - 6 tests - TODOS PASANDO
- ✅ **Login** (`__tests__/e2e/login.spec.ts`) - 5 tests - TODOS PASANDO

### Total de Tests
- **Vitest:** 241 tests
- **Playwright:** 11 tests
- **TOTAL:** 252 tests

---

## 🎯 Próxima Tarea: Tests de Comentarios

### Objetivo
Crear `__tests__/e2e/comentarios.spec.ts` con ~7 tests para cubrir el flujo completo de comentarios.

### Tests a Implementar

```typescript
// __tests__/e2e/comentarios.spec.ts

test.describe('Flujo de Comentarios', () => {
    
    // Test 1: Mostrar formulario cuando usuario está autenticado
    test('debe mostrar formulario de comentarios para usuario autenticado', async ({ page, browserName }) => {
        // 1. Crear y autenticar usuario
        // 2. Navegar a un artículo
        // 3. Verificar que el formulario de comentarios está visible
    });
    
    // Test 2: Crear comentario exitosamente
    test('debe crear comentario exitosamente', async ({ page, browserName }) => {
        // 1. Crear y autenticar usuario
        // 2. Navegar a un artículo
        // 3. Escribir comentario
        // 4. Enviar
        // 5. Verificar que aparece en la lista
    });
    
    // Test 3: No mostrar formulario si no está autenticado
    test('no debe mostrar formulario si usuario no está autenticado', async ({ page }) => {
        // 1. Navegar a un artículo SIN autenticarse
        // 2. Verificar que NO aparece el formulario
        // 3. Verificar que aparece mensaje de "Inicia sesión para comentar"
    });
    
    // Test 4: Ver comentarios existentes
    test('debe mostrar comentarios existentes del artículo', async ({ page }) => {
        // 1. Crear usuario y comentario
        // 2. Navegar al artículo
        // 3. Verificar que el comentario aparece
    });
    
    // Test 5: Eliminar comentario propio
    test('debe eliminar comentario propio', async ({ page, browserName }) => {
        // 1. Crear usuario autenticado
        // 2. Crear comentario
        // 3. Hacer clic en botón eliminar
        // 4. Verificar que desaparece
    });
    
    // Test 6: Error al comentar dos veces
    test('debe mostrar error al intentar comentar dos veces en el mismo artículo', async ({ page, browserName }) => {
        // 1. Crear usuario autenticado
        // 2. Crear primer comentario
        // 3. Intentar crear segundo comentario
        // 4. Verificar mensaje de error
    });
    
    // Test 7: Error con comentario vacío
    test('debe mostrar error con comentario vacío o muy corto', async ({ page, browserName }) => {
        // 1. Crear usuario autenticado
        // 2. Navegar a artículo
        // 3. Intentar enviar comentario vacío
        // 4. Verificar mensaje de error
    });
});
```

---

## 📋 Pasos para Implementar

### 1. Investigación Previa (15 min)

```bash
# Ver la página de artículo con comentarios
code src/app/articulos/[slug]/page.tsx

# Ver las acciones de comentarios
code src/app/lib/actions.ts

# Ver qué artículos hay en el seed
code prisma/seed.ts
```

**Preguntas a responder:**
- ¿Cuál es el slug de un artículo del seed? (ejemplo: `historia-samurai`)
- ¿Cómo se llama el placeholder del textarea de comentarios?
- ¿Cuál es el texto del botón para enviar comentario?
- ¿Cuál es el mensaje de error cuando se intenta comentar dos veces?
- ¿Cuál es el mensaje cuando no estás autenticado?

### 2. Crear Helper para Usuario Autenticado (10 min)

```typescript
// Función helper para crear usuario autenticado
const createAuthenticatedUser = async (page, browserName) => {
    const testUser = {
        name: 'Usuario Test Comentarios',
        email: `comentario.test.${browserName}.${Date.now()}.${Math.random().toString(36).substring(7)}@example.com`,
        password: 'password123',
    };
    
    // Registrar usuario
    await page.goto('/registro');
    await page.getByPlaceholder('Nombre completo').fill(testUser.name);
    await page.getByPlaceholder('Correo electrónico').fill(testUser.email);
    await page.getByPlaceholder('Contraseña (min. 6 caracteres)').fill(testUser.password);
    await page.getByPlaceholder('Confirmar contraseña').fill(testUser.password);
    await page.getByRole('button', { name: 'Crear cuenta' }).click();
    
    // Esperar a que se complete el registro
    await page.waitForURL('/', { timeout: 10000 });
    
    return testUser;
};
```

### 3. Implementar Tests Uno por Uno (60 min)

**Orden recomendado:**
1. Test 1: Mostrar formulario (más simple)
2. Test 3: No mostrar formulario sin auth (simple)
3. Test 2: Crear comentario (core functionality)
4. Test 4: Ver comentarios
5. Test 5: Eliminar comentario
6. Test 6: Error al comentar dos veces
7. Test 7: Error con comentario vacío

### 4. Ejecutar y Depurar (30 min)

```bash
# Terminal 1: Asegurar que la app está corriendo
npm run dev

# Terminal 2: Ejecutar tests en modo UI (recomendado)
npm run test:e2e:ui

# O en modo headed para ver el navegador
npm run test:e2e:headed
```

---

## 🔑 Patrones Clave a Seguir

### ✅ Generación de Datos Únicos
```typescript
// SIEMPRE usar browserName + timestamp + random
const email = `test.${browserName}.${Date.now()}.${Math.random().toString(36).substring(7)}@example.com`;
```

### ✅ Selectores Semánticos
```typescript
// BUENO
page.getByRole('button', { name: 'Comentar' })
page.getByPlaceholder('Escribe tu comentario...')
page.getByText('Comentario creado exitosamente')

// EVITAR
page.locator('#comment-form')
page.locator('.btn-submit')
```

### ✅ Timeouts Apropiados
```typescript
// Redirecciones
await expect(page).toHaveURL('/ruta', { timeout: 10000 });

// Mensajes de error/éxito
await expect(page.getByText('Mensaje')).toBeVisible({ timeout: 5000 });
```

### ✅ Estructura AAA
```typescript
test('descripción', async ({ page, browserName }) => {
    // ARRANGE - Preparar
    const user = await createAuthenticatedUser(page, browserName);
    await page.goto('/articulos/slug-articulo');
    
    // ACT - Actuar
    await page.getByPlaceholder('Comentario').fill('Mi comentario');
    await page.getByRole('button', { name: 'Enviar' }).click();
    
    // ASSERT - Verificar
    await expect(page.getByText('Mi comentario')).toBeVisible();
});
```

---

## ⚠️ Problemas Comunes y Soluciones

### Problema: "Usuario ya existe"
**Solución:** Asegúrate de usar `browserName`, `Date.now()` y `Math.random()` en el email.

### Problema: "Timeout esperando elemento"
**Solución:** 
1. Verifica que la app está corriendo (`npm run dev`)
2. Verifica el selector (usa `npm run test:e2e:ui` para inspeccionar)
3. Aumenta el timeout si es necesario

### Problema: "Test pasa en chromium pero falla en webkit"
**Solución:** Verifica que estás usando `browserName` en la generación de datos únicos.

---

## 📚 Archivos Importantes

### Para Consultar
- `src/app/articulos/[slug]/page.tsx` - Página de artículo con comentarios
- `src/app/lib/actions.ts` - Funciones `createComment`, `deleteComment`
- `prisma/seed.ts` - Artículos disponibles para tests
- `__tests__/e2e/login.spec.ts` - Referencia de patrones

### Para Modificar
- `__tests__/e2e/comentarios.spec.ts` - **CREAR ESTE ARCHIVO**
- `docs/guia_tests_e2e.md` - Actualizar si encuentras nuevos problemas
- `docs/auditoria_testing.md` - Actualizar estadísticas al finalizar

---

## ✅ Checklist Final

Antes de dar por terminada la tarea:

- [ ] Todos los tests de comentarios pasan en los 3 navegadores
- [ ] Se siguieron los patrones establecidos (datos únicos, selectores semánticos)
- [ ] Se documentaron problemas nuevos en `docs/guia_tests_e2e.md`
- [ ] Se actualizó `docs/auditoria_testing.md` con las nuevas estadísticas
- [ ] Se ejecutó `npm run test:all` para verificar que no se rompió nada

---

## 🎯 Resultado Esperado

Al finalizar deberías tener:
- ✅ `__tests__/e2e/comentarios.spec.ts` con ~7 tests
- ✅ Todos los tests pasando (11 anteriores + 7 nuevos = 18 tests E2E)
- ✅ Documentación actualizada
- ✅ Total del proyecto: ~259 tests (241 Vitest + 18 Playwright)

---

**¡Buena suerte! 🚀**

Si encuentras problemas, consulta `docs/guia_tests_e2e.md` para más detalles.

