import { test, expect } from '@playwright/test';

/**
 * Tests E2E para el flujo de login de usuarios
 * 
 * Escenarios cubiertos:
 * 1. Mostrar formulario de login correctamente
 * 2. Login exitoso con credenciales válidas
 * 3. Login fallido con credenciales incorrectas
 * 4. Login fallido con email que no existe
 * 5. Navegación a página de registro
 * 
 * Nota: Para testear login exitoso, primero creamos un usuario mediante registro
 */

test.describe('Flujo de Login de Usuario', () => {

    // Función helper para generar credenciales únicas
    const generateTestUser = (browserName: string) => ({
        name: 'Usuario Login Test',
        email: `login.test.${browserName}.${Date.now()}.${Math.random().toString(36).substring(7)}@example.com`,
        password: 'password123',
    });



    test('debe mostrar el formulario de login correctamente', async ({ page }) => {
        // Navegar a la página de login
        await page.goto('/login');

        // Verificar que estamos en la página correcta
        await expect(page).toHaveURL('/login');

        // Verificar que el título está presente
        await expect(page.getByRole('heading', { name: 'Iniciar Sesión' })).toBeVisible();

        // Verificar que el subtítulo está presente
        await expect(page.getByText('Bienvenido de nuevo')).toBeVisible();

        // Verificar que todos los campos del formulario están presentes
        await expect(page.getByPlaceholder('Correo electrónico')).toBeVisible();
        await expect(page.getByPlaceholder('Contraseña')).toBeVisible();

        // Verificar que el botón de submit está presente
        await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();

        // Verificar que el enlace a registro está presente
        await expect(page.getByRole('link', { name: 'Regístrate aquí' })).toBeVisible();
    });

    test('debe hacer login exitosamente con credenciales válidas', async ({ page, browserName }) => {
        // Generar credenciales únicas para este test
        const testUser = generateTestUser(browserName);

        // Primero, registrar el usuario
        await page.goto('/registro');
        await page.getByPlaceholder('Nombre completo').fill(testUser.name);
        await page.getByPlaceholder('Correo electrónico').fill(testUser.email);
        await page.getByPlaceholder('Contraseña (min. 6 caracteres)').fill(testUser.password);
        await page.getByPlaceholder('Confirmar contraseña').fill(testUser.password);
        await page.getByRole('button', { name: 'Crear cuenta' }).click();

        // Esperar a que se complete el registro y redirija
        await expect(page).toHaveURL('/', { timeout: 10000 });

        // Ahora navegar a login (simulando que el usuario cierra sesión y vuelve)
        await page.goto('/login');

        // Rellenar el formulario con credenciales válidas
        await page.getByPlaceholder('Correo electrónico').fill(testUser.email);
        await page.getByPlaceholder('Contraseña').fill(testUser.password);

        // Hacer clic en el botón de login
        await page.getByRole('button', { name: 'Entrar' }).click();

        // Esperar a que se complete el login y redirija a la página principal
        await expect(page).toHaveURL('/', { timeout: 10000 });
    });

    test('debe mostrar error con credenciales incorrectas', async ({ page, browserName }) => {
        // Generar credenciales únicas para este test
        const testUser = generateTestUser(browserName);

        // Primero, registrar el usuario
        await page.goto('/registro');
        await page.getByPlaceholder('Nombre completo').fill(testUser.name);
        await page.getByPlaceholder('Correo electrónico').fill(testUser.email);
        await page.getByPlaceholder('Contraseña (min. 6 caracteres)').fill(testUser.password);
        await page.getByPlaceholder('Confirmar contraseña').fill(testUser.password);
        await page.getByRole('button', { name: 'Crear cuenta' }).click();

        // Esperar a que se complete el registro
        await expect(page).toHaveURL('/', { timeout: 10000 });

        // Navegar a login
        await page.goto('/login');

        // Rellenar el formulario con credenciales incorrectas
        await page.getByPlaceholder('Correo electrónico').fill(testUser.email);
        await page.getByPlaceholder('Contraseña').fill('password_incorrecta');

        // Hacer clic en el botón de login
        await page.getByRole('button', { name: 'Entrar' }).click();

        // Esperar a que aparezca el mensaje de error
        await expect(page.getByText('Credenciales inválidas.')).toBeVisible({ timeout: 5000 });

        // Verificar que NO se redirigió (seguimos en /login)
        await expect(page).toHaveURL('/login');
    });

    test('debe mostrar error con email que no existe', async ({ page }) => {
        // Navegar a login
        await page.goto('/login');

        // Rellenar el formulario con email que no existe
        await page.getByPlaceholder('Correo electrónico').fill('noexiste@example.com');
        await page.getByPlaceholder('Contraseña').fill('password123');

        // Hacer clic en el botón de login
        await page.getByRole('button', { name: 'Entrar' }).click();

        // Esperar a que aparezca el mensaje de error
        await expect(page.getByText('Credenciales inválidas.')).toBeVisible({ timeout: 5000 });

        // Verificar que NO se redirigió
        await expect(page).toHaveURL('/login');
    });

    test('debe navegar a la página de registro al hacer clic en el enlace', async ({ page }) => {
        // Navegar a login
        await page.goto('/login');

        // Hacer clic en el enlace "Regístrate aquí"
        await page.getByRole('link', { name: 'Regístrate aquí' }).click();

        // Verificar que navegó a /registro
        await expect(page).toHaveURL('/registro');

        // Verificar que estamos en la página de registro
        await expect(page.getByRole('heading', { name: 'Crear Cuenta' })).toBeVisible();
    });
});

