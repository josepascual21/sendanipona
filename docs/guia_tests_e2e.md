# Guía de Tests E2E con Playwright

## 📋 Índice
1. [Estado Actual del Proyecto](#estado-actual-del-proyecto)
2. [Configuración de Playwright](#configuración-de-playwright)
3. [Tests Implementados](#tests-implementados)
4. [Patrones y Buenas Prácticas](#patrones-y-buenas-prácticas)
5. [Problemas Resueltos](#problemas-resueltos)
6. [Próximos Pasos](#próximos-pasos)

---

## 📊 Estado Actual del Proyecto

### Tests Totales
- **Tests Unitarios/Integración (Vitest):** 241 tests en 26 archivos
- **Tests E2E (Playwright):** 11 tests en 2 archivos
- **Total:** 252 tests

### Archivos E2E Creados
```
__tests__/e2e/
├── registro.spec.ts    (6 tests) ✅ TODOS PASANDO
└── login.spec.ts       (5 tests) ✅ TODOS PASANDO
```

---

## ⚙️ Configuración de Playwright

### 1. Instalación Realizada

**Comando ejecutado:**
```bash
npm init playwright@latest
```

**Opciones seleccionadas durante la instalación:**
- ✅ TypeScript
- ✅ Carpeta de tests: `__tests__/e2e`
- ✅ GitHub Actions: No
- ✅ Instalar navegadores: Sí

### 2. Archivos de Configuración

#### `package.json` - Scripts Añadidos
```json
{
  "scripts": {
    "playwright:install": "playwright install --with-deps",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:all": "vitest run && playwright test"
  },
  "devDependencies": {
    "@playwright/test": "^1.58.2"
  }
}
```

#### `playwright.config.ts` - Configuración Principal
**Cambio importante realizado:**
```typescript
use: {
    baseURL: 'http://localhost:3000',  // ✅ HABILITADO
    trace: 'on-first-retry',
},
```

#### `vitest.config.ts` - Exclusión de Tests E2E
**Cambio crítico para evitar conflictos:**
```typescript
test: {
    globals: true,
    environment: 'node',
    exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/e2e/**',              // ✅ AÑADIDO - Excluir tests E2E de Playwright
        '**/.{idea,git,cache,output,temp}/**',
    ],
}
```

**Razón:** Vitest intentaba ejecutar los tests de Playwright (`.spec.ts`) y fallaba porque usan sintaxis diferente.

---

## 🧪 Tests Implementados

### Archivo 1: `__tests__/e2e/registro.spec.ts` (6 tests)

**Escenarios cubiertos:**
1. ✅ Mostrar formulario de registro correctamente
2. ✅ Registrar nuevo usuario exitosamente
3. ✅ Error cuando contraseñas no coinciden
4. ✅ Error cuando contraseña es muy corta (< 6 caracteres)
5. ✅ Error cuando nombre es muy corto (< 2 caracteres)
6. ✅ Navegar a página de login desde enlace

**Patrón de generación de emails únicos:**
```typescript
const timestamp = Date.now();
const testEmail = `usuario.test.${timestamp}@example.com`;
```

**Nota importante:** Se eliminó un test de validación de email inválido porque HTML5 (`type="email"`) bloquea el submit antes de llegar al servidor.

---

### Archivo 2: `__tests__/e2e/login.spec.ts` (5 tests)

**Escenarios cubiertos:**
1. ✅ Mostrar formulario de login correctamente
2. ✅ Login exitoso con credenciales válidas
3. ✅ Error con credenciales incorrectas
4. ✅ Error con email que no existe
5. ✅ Navegar a página de registro desde enlace

**Patrón de generación de usuarios únicos (MEJORADO):**
```typescript
// Función helper para generar credenciales únicas
const generateTestUser = (browserName: string) => ({
    name: 'Usuario Login Test',
    email: `login.test.${browserName}.${Date.now()}.${Math.random().toString(36).substring(7)}@example.com`,
    password: 'password123',
});

// Uso en cada test
test('debe hacer login exitosamente', async ({ page, browserName }) => {
    const testUser = generateTestUser(browserName);
    // ... resto del test
});
```

**Por qué este patrón:**
- `browserName`: Diferencia entre chromium, firefox, webkit
- `Date.now()`: Timestamp en milisegundos
- `Math.random()`: String aleatorio adicional para evitar colisiones

---

## 🎯 Patrones y Buenas Prácticas

### 1. Estructura de Tests (Patrón AAA)
```typescript
test('descripción del test', async ({ page }) => {
    // ARRANGE - Preparar
    await page.goto('/ruta');
    
    // ACT - Actuar
    await page.getByPlaceholder('Campo').fill('valor');
    await page.getByRole('button', { name: 'Enviar' }).click();
    
    // ASSERT - Verificar
    await expect(page).toHaveURL('/destino');
    await expect(page.getByText('Mensaje')).toBeVisible();
});
```

### 2. Selectores Semánticos (Preferidos)
```typescript
// ✅ BUENO - Selectores semánticos
page.getByRole('button', { name: 'Entrar' })
page.getByPlaceholder('Correo electrónico')
page.getByText('Credenciales inválidas.')
page.getByRole('heading', { name: 'Iniciar Sesión' })

// ❌ EVITAR - Selectores frágiles
page.locator('#email')
page.locator('.btn-primary')
```

### 3. Generación de Datos Únicos
```typescript
// Para tests que NO requieren persistencia entre tests
const timestamp = Date.now();
const email = `test.${timestamp}@example.com`;

// Para tests que se ejecutan en paralelo en múltiples navegadores
const generateUser = (browserName: string) => ({
    email: `test.${browserName}.${Date.now()}.${Math.random().toString(36).substring(7)}@example.com`,
});
```

### 4. Timeouts Apropiados
```typescript
// Redirecciones después de acciones del servidor
await expect(page).toHaveURL('/', { timeout: 10000 }); // 10 segundos

// Mensajes de error
await expect(page.getByText('Error')).toBeVisible({ timeout: 5000 }); // 5 segundos
```

---

## 🐛 Problemas Resueltos

### Problema 1: Vitest Ejecutando Tests de Playwright
**Error:**
```
Error: Playwright Test did not expect test() to be called here
```

**Causa:** Vitest encontraba archivos `.spec.ts` en `__tests__/e2e/` e intentaba ejecutarlos.

**Solución:** Añadir `'**/e2e/**'` al array `exclude` en `vitest.config.ts`.

---

### Problema 2: Validación HTML5 vs Validación del Servidor
**Situación:** Test de email inválido en registro fallaba.

**Causa:** El campo tiene `type="email"`, por lo que HTML5 bloquea el submit antes de que llegue al servidor.

**Solución:** Eliminar el test porque:
- HTML5 ya valida el formato del email
- Los tests unitarios de Zod ya cubren la validación del servidor
- No es posible testear este escenario en E2E sin deshabilitar la validación HTML5

---

### Problema 3: Usuario Duplicado en Tests de Login (CRÍTICO)
**Error:**
```
Invalid `prisma.user.upsert()` invocation: Unique constraint failed on the fields: (`email`)
El usuario con email login.test.1771507632571@example.com ya existe.
```

**Causa Raíz:**
- El hook `beforeAll` se ejecuta **una vez por cada proyecto de navegador** (chromium, firefox, webkit), NO globalmente
- Chromium creaba el usuario `login.test.1234@example.com`
- Firefox intentaba crear el mismo usuario → ❌ Error
- Webkit intentaba crear el mismo usuario → ❌ Error

**Solución Implementada:**
1. Eliminar `beforeAll` y `beforeEach`
2. Crear función helper `generateTestUser(browserName)`
3. Cada test genera su propio usuario único usando:
   - `browserName` (chromium/firefox/webkit)
   - `Date.now()` (timestamp)
   - `Math.random()` (string aleatorio)

**Código de la solución:**
```typescript
// Función helper
const generateTestUser = (browserName: string) => ({
    name: 'Usuario Login Test',
    email: `login.test.${browserName}.${Date.now()}.${Math.random().toString(36).substring(7)}@example.com`,
    password: 'password123',
});

// Uso en cada test
test('debe hacer login exitosamente', async ({ page, browserName }) => {
    const testUser = generateTestUser(browserName);

    // Primero registrar el usuario
    await page.goto('/registro');
    await page.getByPlaceholder('Nombre completo').fill(testUser.name);
    await page.getByPlaceholder('Correo electrónico').fill(testUser.email);
    // ... resto del registro

    // Luego hacer login
    await page.goto('/login');
    await page.getByPlaceholder('Correo electrónico').fill(testUser.email);
    // ... resto del login
});
```

---

## 🚀 Cómo Ejecutar los Tests

### Prerequisitos
```bash
# 1. Instalar dependencias del proyecto
npm install

# 2. Instalar navegadores de Playwright (SOLO LA PRIMERA VEZ)
npm run playwright:install
```

### Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run test` | Ejecutar tests unitarios/integración (Vitest) |
| `npm run test:e2e` | Ejecutar tests E2E en modo headless |
| `npm run test:e2e:headed` | Ejecutar tests E2E viendo el navegador |
| `npm run test:e2e:ui` | Abrir interfaz visual de Playwright |
| `npm run test:all` | Ejecutar TODOS los tests (Vitest + Playwright) |

### Flujo de Trabajo Típico

```bash
# Terminal 1: Iniciar la aplicación
npm run dev

# Terminal 2: Ejecutar tests E2E
npm run test:e2e

# O para ver el navegador mientras se ejecutan
npm run test:e2e:headed

# O para modo interactivo (recomendado para desarrollo)
npm run test:e2e:ui
```

### Resultados de Tests

Los resultados se guardan en:
```
test-results/
├── login-Flujo-de-Login-de-Us-3c4d2-te-con-credenciales-válidas-chromium/
│   └── error-context.md
└── ...
```

---

## 📝 Próximos Pasos

### Tests E2E Pendientes

#### 1. Tests de Comentarios (`__tests__/e2e/comentarios.spec.ts`) - PRIORIDAD ALTA

**Escenarios a cubrir:**
1. ✅ Mostrar formulario de comentarios cuando usuario está autenticado
2. ✅ Crear comentario exitosamente
3. ✅ Error al crear comentario sin autenticación
4. ✅ Ver comentarios de un artículo
5. ✅ Eliminar comentario propio
6. ✅ Error al comentar dos veces en el mismo artículo
7. ✅ Error con comentario vacío o muy corto

**Información necesaria antes de empezar:**
- ¿Qué artículo usar para los tests? (verificar artículos del seed en `prisma/seed.ts`)
- ¿Cómo se accede al formulario de comentarios? (verificar `src/app/articulos/[slug]/page.tsx`)
- ¿Cuál es el mensaje de error cuando se intenta comentar dos veces?
- ¿Cuál es la validación mínima de longitud del comentario?

**Patrón recomendado:**
```typescript
test.describe('Flujo de Comentarios', () => {
    // Helper para crear usuario autenticado
    const createAuthenticatedUser = async (page, browserName) => {
        const testUser = generateTestUser(browserName);

        // Registrar usuario
        await page.goto('/registro');
        // ... registro

        // Verificar que está autenticado
        await expect(page).toHaveURL('/');

        return testUser;
    };

    test('debe crear comentario exitosamente', async ({ page, browserName }) => {
        // Crear usuario autenticado
        const user = await createAuthenticatedUser(page, browserName);

        // Navegar a un artículo
        await page.goto('/articulos/slug-del-articulo');

        // Crear comentario
        await page.getByPlaceholder('Escribe tu comentario...').fill('Este es un comentario de prueba');
        await page.getByRole('button', { name: 'Comentar' }).click();

        // Verificar que el comentario aparece
        await expect(page.getByText('Este es un comentario de prueba')).toBeVisible();
    });
});
```

---

#### 2. Tests de Navegación (`__tests__/e2e/navegacion.spec.ts`) - PRIORIDAD MEDIA

**Escenarios a cubrir:**
1. Navegar por categorías (Historia, Cultura Pop, Turismo, Otros)
2. Ver lista de artículos de una categoría
3. Navegar a detalle de un artículo
4. Verificar que el breadcrumb funciona correctamente
5. Navegar entre artículos relacionados

---

### Actualización de Documentación

Una vez completados los tests E2E, actualizar:

1. **`docs/auditoria_testing.md`**
   - Añadir sección de Tests E2E
   - Actualizar estadísticas totales
   - Marcar Fase 7 como completada

2. **`README.md`**
   - Actualizar contador de tests
   - Verificar que la documentación de scripts esté actualizada

---

## 📚 Recursos Útiles

### Documentación Oficial
- [Playwright Docs](https://playwright.dev/docs/intro)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Locators](https://playwright.dev/docs/locators)

### Archivos del Proyecto a Consultar
- `src/app/registro/page.tsx` - Formulario de registro
- `src/app/login/page.tsx` - Formulario de login
- `src/app/lib/actions.ts` - Server actions (authenticate, registerUser, createComment, deleteComment)
- `src/app/articulos/[slug]/page.tsx` - Página de detalle de artículo con comentarios
- `prisma/seed.ts` - Datos de seed (artículos, usuarios)

### Comandos Útiles de Playwright

```bash
# Generar código de test automáticamente (codegen)
npx playwright codegen http://localhost:3000

# Ejecutar solo un archivo de test
npx playwright test login.spec.ts

# Ejecutar solo un navegador
npx playwright test --project=chromium

# Ver reporte HTML de resultados
npx playwright show-report

# Modo debug
npx playwright test --debug
```

---

## ⚠️ Notas Importantes

### 1. La Aplicación Debe Estar Corriendo
Los tests E2E requieren que la aplicación esté corriendo en `http://localhost:3000`:
```bash
npm run dev
```

### 2. Base de Datos
Los tests E2E crean datos reales en la base de datos SQLite. Considera:
- Usar una base de datos de test separada (opcional)
- Limpiar datos de test periódicamente
- Los emails de test siguen el patrón `*.test.*@example.com`

### 3. Ejecución en Paralelo
Playwright ejecuta tests en paralelo por defecto. Por eso es crítico:
- Generar datos únicos en cada test
- No depender de estado compartido
- Usar `browserName` en la generación de datos

### 4. Timeouts
Si los tests fallan por timeout:
- Verificar que la aplicación está corriendo
- Aumentar timeouts si el servidor es lento
- Verificar que no hay errores en la consola del navegador

---

## 🎯 Checklist para el Próximo Agente

Antes de empezar con los tests de comentarios:

- [ ] Leer esta guía completa
- [ ] Verificar que la aplicación corre correctamente (`npm run dev`)
- [ ] Ejecutar tests existentes para confirmar que pasan (`npm run test:e2e`)
- [ ] Revisar `src/app/articulos/[slug]/page.tsx` para entender el flujo de comentarios
- [ ] Revisar `src/app/lib/actions.ts` para ver las funciones `createComment` y `deleteComment`
- [ ] Verificar artículos disponibles en `prisma/seed.ts`
- [ ] Crear `__tests__/e2e/comentarios.spec.ts` siguiendo los patrones establecidos
- [ ] Ejecutar tests y resolver problemas
- [ ] Actualizar esta guía si se encuentran nuevos problemas o patrones

---

**Fecha de última actualización:** 2026-02-19
**Tests E2E completados:** 11/~30 (37%)
**Estado:** ✅ Registro y Login completados | ⏳ Comentarios pendiente

