# Senda Nipona 🇯🇵

> TFM Desarrollo de Software con IA - Página web sobre cultura japonesa

**Filosofía de desarrollo:** Agile, permitiendo desarrollo iterativo con progreso constante.

## 🚀 Instalación y Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

### 3. Configurar base de datos

```bash
# Crear y migrar la base de datos
npx prisma migrate dev

# Poblar con datos iniciales
npx tsx prisma/seed.ts
```

### 4. Instalar navegadores de Playwright (solo primera vez)

```bash
npm run playwright:install
```

### 5. Ejecutar aplicación en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testing

### Tests Unitarios e Integración (Vitest)

```bash
npm run test              # Ejecutar tests en modo watch
npm run test:ui           # Interfaz visual de tests
npm run test:coverage     # Ver cobertura de código
```

### Tests E2E (Playwright)

**Primera vez:** Instalar navegadores
```bash
npm run playwright:install
```

**Ejecutar tests:**
```bash
npm run test:e2e          # Ejecutar tests E2E (headless)
npm run test:e2e:ui       # Interfaz visual de Playwright
npm run test:e2e:headed   # Ver navegador durante tests
```

### Ejecutar todos los tests

```bash
npm run test:all          # Unitarios + Integración + E2E
```

---

## 📊 Cobertura de Tests

- **Tests Unitarios:** 77 tests (Dominio)
- **Tests de Aplicación:** 59 tests (Use Cases)
- **Tests de Integración:** 84 tests (Infraestructura)
- **Tests de Schemas:** 20 tests (Validación Zod)
- **Total:** 241 tests en 26 archivos
- **Cobertura estimada:** ~70%

Ver más detalles en [`docs/auditoria_testing.md`](docs/auditoria_testing.md)

---

## 🛠️ Scripts Disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Ejecutar en modo desarrollo |
| `npm run build` | Compilar para producción |
| `npm run start` | Ejecutar versión de producción |
| `npm run lint` | Ejecutar linter |
| `npm run test` | Tests unitarios (watch mode) |
| `npm run test:ui` | Interfaz visual de tests |
| `npm run test:coverage` | Cobertura de código |
| `npm run playwright:install` | Instalar navegadores de Playwright |
| `npm run test:e2e` | Tests E2E |
| `npm run test:e2e:ui` | Interfaz visual de Playwright |
| `npm run test:all` | Ejecutar todos los tests |

---

## 🏗️ Arquitectura

El proyecto sigue **Clean Architecture** con las siguientes capas:

- **Dominio:** Entidades y lógica de negocio
- **Aplicación:** Casos de uso
- **Infraestructura:** Repositorios, servicios externos, auth
- **Presentación:** Componentes React, páginas Next.js

---

## 🔧 Tecnologías

- **Framework:** Next.js 14 (App Router)
- **Autenticación:** NextAuth v5
- **Base de datos:** SQLite (Prisma ORM)
- **Validación:** Zod
- **Estilos:** Tailwind CSS
- **Testing:** Vitest + Playwright
- **Lenguaje:** TypeScript