# Senda Nipona 🇯🇵

> **Guía de Instalación y Ejecución**
> TFM Desarrollo de Software con IA

Esta guía te ayudará a instalar y ejecutar el proyecto **Senda Nipona** en tu máquina local desde cero, sin dar nada por hecho.

---

## � Requisitos Previos

Antes de comenzar, necesitas tener instalado lo siguiente:

### 1. Node.js (versión 18 o superior)

Node.js incluye npm (gestor de paquetes) que necesitaremos para instalar las dependencias.

#### **Windows**
1. Descarga el instalador desde [nodejs.org](https://nodejs.org/)
2. Ejecuta el instalador `.msi` descargado
3. Sigue el asistente de instalación (acepta las opciones por defecto)
4. Verifica la instalación abriendo **PowerShell** o **CMD** y ejecutando:
   ```bash
   node --version
   npm --version
   ```

#### **macOS**
**Opción 1: Instalador oficial**
1. Descarga el instalador desde [nodejs.org](https://nodejs.org/)
2. Ejecuta el archivo `.pkg` descargado
3. Sigue el asistente de instalación

**Opción 2: Homebrew (recomendado)**
```bash
brew install node
```

Verifica la instalación:
```bash
node --version
npm --version
```

#### **Linux (Ubuntu/Debian)**
```bash
# Actualizar repositorios
sudo apt update

# Instalar Node.js y npm
sudo apt install nodejs npm

# Verificar instalación
node --version
npm --version
```

**Si la versión es menor a 18, instala la versión LTS:**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

### 2. Git (para clonar el repositorio)

#### **Windows**
1. Descarga Git desde [git-scm.com](https://git-scm.com/download/win)
2. Ejecuta el instalador y sigue el asistente (opciones por defecto)
3. Verifica: `git --version`

#### **macOS**
```bash
# Con Homebrew
brew install git

# O viene preinstalado con Xcode Command Line Tools
xcode-select --install
```

#### **Linux**
```bash
sudo apt install git
```

---

## 🚀 Instalación del Proyecto

### Paso 1: Clonar el repositorio

Abre tu terminal (PowerShell en Windows, Terminal en macOS/Linux) y ejecuta:

```bash
git clone https://github.com/josepascual21/sendanipona.git
cd sendanipona
```

---

### Paso 2: Instalar dependencias del proyecto

Dentro de la carpeta del proyecto, ejecuta:

```bash
npm install
```

Este comando instalará todas las dependencias necesarias (Next.js, Prisma, Tailwind, etc.). Puede tardar unos minutos.

---

### Paso 3: Configurar variables de entorno

Crea un archivo `.env` a partir del ejemplo proporcionado:

**Windows (PowerShell):**
```powershell
Copy-Item .env.example .env
```

**macOS/Linux:**
```bash
cp .env.example .env
```

El archivo `.env` ya contiene la configuración necesaria para desarrollo local (SQLite).

---

### Paso 4: Configurar la base de datos

Ejecuta las migraciones para crear la base de datos SQLite local:

```bash
npx prisma migrate dev
```

Luego, puebla la base de datos con datos iniciales (artículos de ejemplo, usuarios de prueba):

```bash
npx tsx prisma/seed.ts
```

> **Nota:** Esto creará un archivo `dev.db` en la raíz del proyecto con la información de los artículos y usuarios de ejemplo.

---

### Paso 5: Instalar navegadores de Playwright (opcional, solo para tests E2E)

Si quieres ejecutar los tests end-to-end, instala los navegadores de Playwright:

```bash
npm run playwright:install
```

> **Nota:** Este paso es opcional. Solo necesario si vas a ejecutar tests E2E.

---

### Paso 6: Ejecutar la aplicación

Tienes dos opciones para ejecutar la aplicación:

#### **Opción A: Modo Desarrollo (recomendado para desarrollo local)**

Inicia el servidor de desarrollo con hot-reload (los cambios se reflejan automáticamente):

```bash
npm run dev
```

Verás un mensaje similar a:

```
  ▲ Next.js 14.2.35
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

Abre tu navegador y visita **[http://localhost:3000](http://localhost:3000)**

¡La aplicación debería estar funcionando! 🎉

---

#### **Opción B: Modo Producción (para probar la versión optimizada)**

Si quieres probar la aplicación como si estuviera en producción:

1. **Compilar la aplicación:**
   ```bash
   npm run build
   ```

   Este proceso optimiza el código, genera las páginas estáticas y prepara la aplicación para producción. Puede tardar 1-2 minutos.

2. **Ejecutar la versión de producción:**
   ```bash
   npm run start
   ```

3. Abre tu navegador en **[http://localhost:3000](http://localhost:3000)**

> **Nota:** La versión de producción es más rápida y optimizada, pero no tiene hot-reload. Para desarrollo, usa siempre la Opción A.

---

## 🛑 Solución de Problemas Comunes

### Error: "node: command not found"
- **Solución:** Node.js no está instalado o no está en el PATH. Reinstala Node.js siguiendo los pasos anteriores.

### Error: "npm install" falla
- **Solución:** Elimina la carpeta `node_modules` y el archivo `package-lock.json`, luego ejecuta `npm install` de nuevo.

### Error: "Port 3000 is already in use"
- **Solución:** Otro proceso está usando el puerto 3000. Cierra otras aplicaciones o cambia el puerto:
  ```bash
  npm run dev -- -p 3001
  ```

### Error en migraciones de Prisma
- **Solución:** Elimina el archivo `dev.db` y ejecuta de nuevo:
  ```bash
  npx prisma migrate dev
  npx tsx prisma/seed.ts
  ```

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
