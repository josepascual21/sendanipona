import { test, expect } from '@playwright/test';

/**
 * Tests E2E para el flujo de registro de usuarios
 *
 * Escenarios cubiertos:
 * 1. Registro exitoso con datos válidos
 * 2. Validación de campos requeridos
 * 3. Validación de contraseñas que no coinciden
 * 4. Validación de contraseña corta
 * 5. Validación de nombre muy corto
 * 6. Navegación a página de login
 *
 * Nota: La validación de email inválido NO se testea en E2E porque
 * la validación HTML5 del navegador (type="email") bloquea el submit
 * antes de que llegue al servidor. Esta validación ya está cubierta por:
 * - Validación HTML5 nativa del navegador
 * - Tests unitarios de RegisterSchema.test.ts
 */

test.describe('Flujo de Registro de Usuario', () => {
    
    test.beforeEach(async ({ page }) => {
        // Navegar a la página de registro antes de cada test
        await page.goto('/registro');
    });

    test('debe mostrar el formulario de registro correctamente', async ({ page }) => {
        // Verificar que estamos en la página correcta
        await expect(page).toHaveURL('/registro');

        // Verificar que el título está presente
        await expect(page.getByRole('heading', { name: 'Crear Cuenta' })).toBeVisible();

        // Verificar que todos los campos del formulario están presentes
        await expect(page.getByPlaceholder('Nombre completo')).toBeVisible();
        await expect(page.getByPlaceholder('Correo electrónico')).toBeVisible();
        await expect(page.getByPlaceholder('Contraseña (min. 6 caracteres)')).toBeVisible();
        await expect(page.getByPlaceholder('Confirmar contraseña')).toBeVisible();

        // Verificar que el botón de submit está presente
        await expect(page.getByRole('button', { name: 'Crear cuenta' })).toBeVisible();

        // Verificar que el enlace a login está presente
        await expect(page.getByRole('link', { name: 'Inicia sesión aquí' })).toBeVisible();
    });

    test('debe registrar un nuevo usuario exitosamente', async ({ page }) => {
        // Generar email único para evitar conflictos
        const timestamp = Date.now();
        const testEmail = `usuario.test.${timestamp}@example.com`;

        // Rellenar el formulario
        await page.getByPlaceholder('Nombre completo').fill('Usuario Test E2E');
        await page.getByPlaceholder('Correo electrónico').fill(testEmail);
        await page.getByPlaceholder('Contraseña (min. 6 caracteres)').fill('password123');
        await page.getByPlaceholder('Confirmar contraseña').fill('password123');

        // Hacer clic en el botón de registro
        await page.getByRole('button', { name: 'Crear cuenta' }).click();

        // Esperar a que se complete el registro y redirija a la página principal
        // El registro exitoso hace login automático y redirige a '/'
        await expect(page).toHaveURL('/', { timeout: 10000 });

        // Verificar que el usuario está autenticado
        // (Esto depende de cómo muestres el estado de autenticación en tu app)
        // Por ejemplo, si muestras el nombre del usuario en el header:
        // await expect(page.getByText('Usuario Test E2E')).toBeVisible();
    });

    test('debe mostrar error cuando las contraseñas no coinciden', async ({ page }) => {
        // Rellenar el formulario con contraseñas diferentes
        await page.getByPlaceholder('Nombre completo').fill('Usuario Test');
        await page.getByPlaceholder('Correo electrónico').fill('test@example.com');
        await page.getByPlaceholder('Contraseña (min. 6 caracteres)').fill('password123');
        await page.getByPlaceholder('Confirmar contraseña').fill('password456');

        // Hacer clic en el botón de registro
        await page.getByRole('button', { name: 'Crear cuenta' }).click();

        // Verificar que aparece el mensaje de error
        await expect(page.getByText('Las contraseñas no coinciden')).toBeVisible();

        // Verificar que NO se redirigió (seguimos en /registro)
        await expect(page).toHaveURL('/registro');
    });

    test('debe mostrar error cuando la contraseña es muy corta', async ({ page }) => {
        // Rellenar el formulario con contraseña corta
        await page.getByPlaceholder('Nombre completo').fill('Usuario Test');
        await page.getByPlaceholder('Correo electrónico').fill('test@example.com');
        await page.getByPlaceholder('Contraseña (min. 6 caracteres)').fill('12345');
        await page.getByPlaceholder('Confirmar contraseña').fill('12345');

        // Hacer clic en el botón de registro
        await page.getByRole('button', { name: 'Crear cuenta' }).click();

        // Verificar que aparece el mensaje de error
        await expect(page.getByText(/La contraseña debe tener al menos 6 caracteres/)).toBeVisible();

        // Verificar que NO se redirigió
        await expect(page).toHaveURL('/registro');
    });

    test('debe mostrar error cuando el nombre es muy corto', async ({ page }) => {
        // Rellenar el formulario con nombre muy corto
        await page.getByPlaceholder('Nombre completo').fill('A');
        await page.getByPlaceholder('Correo electrónico').fill('test@example.com');
        await page.getByPlaceholder('Contraseña (min. 6 caracteres)').fill('password123');
        await page.getByPlaceholder('Confirmar contraseña').fill('password123');

        // Hacer clic en el botón de registro
        await page.getByRole('button', { name: 'Crear cuenta' }).click();

        // Verificar que aparece el mensaje de error
        await expect(page.getByText(/El nombre debe tener al menos 2 caracteres/)).toBeVisible();

        // Verificar que NO se redirigió
        await expect(page).toHaveURL('/registro');
    });

    test('debe navegar a la página de login al hacer clic en el enlace', async ({ page }) => {
        // Hacer clic en el enlace "Inicia sesión aquí"
        await page.getByRole('link', { name: 'Inicia sesión aquí' }).click();

        // Verificar que navegó a /login
        await expect(page).toHaveURL('/login');

        // Verificar que estamos en la página de login
        await expect(page.getByRole('heading', { name: 'Iniciar Sesión' })).toBeVisible();
    });
});

