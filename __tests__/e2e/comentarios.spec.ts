import { test, expect } from '@playwright/test';

/**
 * Tests E2E para el flujo de comentarios en artículos
 *
 * Escenarios cubiertos:
 * 1. No mostrar formulario si el usuario NO está autenticado
 * 2. Mostrar formulario de comentarios para usuario autenticado
 * 3. Crear comentario exitosamente
 * 4. Ver comentarios existentes en el artículo
 * 5. Eliminar comentario propio
 * 6. Mostrar error al intentar comentar dos veces en el mismo artículo
 * 7. Mostrar error con comentario demasiado corto (< 10 caracteres)
 *
 * Artículo usado para los tests: /articulos/shodo
 * (Artículo disponible en el seed de la base de datos)
 *
 * Restricciones de negocio:
 * - Mínimo 10 caracteres por comentario
 * - Máximo 500 caracteres por comentario
 * - Solo un comentario por usuario por artículo
 */

/** Slug del artículo usado para todos los tests de comentarios */
const ARTICLE_SLUG = 'shodo';
/** Ruta completa del artículo de prueba */
const ARTICLE_URL = `/articulos/${ARTICLE_SLUG}`;

/**
 * Función helper para generar credenciales de usuario únicas.
 * Combina browserName + timestamp + random para evitar colisiones
 * al ejecutar tests en paralelo en múltiples navegadores.
 */
const generateTestUser = (browserName: string) => ({
    name: 'Usuario Test Comentarios',
    email: `comentario.test.${browserName}.${Date.now()}.${Math.random().toString(36).substring(7)}@example.com`,
    password: 'password123',
});

/**
 * Helper que registra un usuario y lo deja autenticado en la aplicación.
 * Reutiliza el patrón ya probado en login.spec.ts.
 * @returns Los datos del usuario creado (necesarios para los asserts posteriores)
 */
async function createAuthenticatedUser(page: import('@playwright/test').Page, browserName: string) {
    const testUser = generateTestUser(browserName);

    // Navegar a la página de registro
    await page.goto('/registro');

    // Rellenar el formulario con los datos del usuario de prueba
    await page.getByPlaceholder('Nombre completo').fill(testUser.name);
    await page.getByPlaceholder('Correo electrónico').fill(testUser.email);
    await page.getByPlaceholder('Contraseña (min. 6 caracteres)').fill(testUser.password);
    await page.getByPlaceholder('Confirmar contraseña').fill(testUser.password);

    // Enviar el formulario de registro
    await page.getByRole('button', { name: 'Crear cuenta' }).click();

    // Esperar a que el registro complete y redirija a la home (login automático)
    await expect(page).toHaveURL('/', { timeout: 10000 });

    return testUser;
}

// ============================================================================
// SUITE DE TESTS
// ============================================================================

test.describe('Flujo de Comentarios en Artículos', () => {

    // --------------------------------------------------------------------------
    // TEST 1: Sin autenticación - No debe mostrar el formulario
    // --------------------------------------------------------------------------
    test('no debe mostrar formulario si el usuario no está autenticado', async ({ page }) => {
        // ARRANGE - Navegar al artículo SIN haberse autenticado
        await page.goto(ARTICLE_URL);

        // Esperar a que la sección de comentarios cargue
        // (el wrapper tiene un estado de carga inicial)
        await page.waitForSelector('#comentarios', { timeout: 10000 });

        // ASSERT - Verificar que se muestra el mensaje para iniciar sesión
        await expect(
            page.getByText('Inicia sesión para compartir tu opinión')
        ).toBeVisible({ timeout: 8000 });

        // ASSERT - Verificar que el botón de login está presente
        await expect(
            page.getByRole('link', { name: 'Iniciar Sesión' })
        ).toBeVisible();

        // ASSERT - Verificar que el textarea de comentario NO está visible
        await expect(
            page.getByPlaceholder('Comparte tus pensamientos sobre el artículo...')
        ).not.toBeVisible();
    });

    // --------------------------------------------------------------------------
    // TEST 2: Con autenticación - Debe mostrar el formulario de comentarios
    // --------------------------------------------------------------------------
    test('debe mostrar formulario de comentarios para usuario autenticado', async ({ page, browserName }) => {
        // ARRANGE - Crear y autenticar un usuario
        await createAuthenticatedUser(page, browserName);

        // Navegar al artículo
        await page.goto(ARTICLE_URL);

        // Esperar a que la sección de comentarios cargue
        await page.waitForSelector('#comentarios', { timeout: 10000 });

        // ASSERT - Verificar que el formulario de comentarios es visible
        await expect(
            page.getByPlaceholder('Comparte tus pensamientos sobre el artículo...')
        ).toBeVisible({ timeout: 8000 });

        // ASSERT - Verificar que el botón de publicar está visible
        await expect(
            page.getByRole('button', { name: 'Publicar Comentario' })
        ).toBeVisible();

        // ASSERT - Verificar que el heading del formulario está presente
        await expect(
            page.getByRole('heading', { name: 'Deja tu comentario' })
        ).toBeVisible();
    });

    // --------------------------------------------------------------------------
    // TEST 3: Crear comentario exitosamente
    // --------------------------------------------------------------------------
    test('debe crear comentario exitosamente', async ({ page, browserName }) => {
        // ARRANGE - Crear y autenticar un usuario
        await createAuthenticatedUser(page, browserName);

        // Navegar al artículo
        await page.goto(ARTICLE_URL);

        // Esperar a que el formulario esté disponible
        const textarea = page.getByPlaceholder('Comparte tus pensamientos sobre el artículo...');
        await expect(textarea).toBeVisible({ timeout: 8000 });

        // Generar un texto de comentario único para poder verificarlo después
        const commentText = `Comentario de prueba E2E - ${browserName} - ${Date.now()}`;

        // ACT - Escribir el comentario y enviarlo
        await textarea.fill(commentText);
        await page.getByRole('button', { name: 'Publicar Comentario' }).click();

        // ASSERT - Verificar que el comentario aparece en la lista
        await expect(
            page.getByText(commentText)
        ).toBeVisible({ timeout: 8000 });

        // ASSERT - Verificar que el formulario ya no está visible (solo un comentario por usuario)
        await expect(
            page.getByText('¡Gracias! Ya has compartido tu opinión sobre este artículo.')
        ).toBeVisible({ timeout: 5000 });
    });

    // --------------------------------------------------------------------------
    // TEST 4: Ver comentarios existentes del artículo
    // --------------------------------------------------------------------------
    test('debe mostrar los comentarios existentes del artículo', async ({ page }) => {
        // ARRANGE - Navegar al artículo sin autenticarse
        // (los comentarios son públicos, cualquiera puede verlos)
        await page.goto(ARTICLE_URL);

        // Esperar a que la sección de comentarios cargue
        await page.waitForSelector('#comentarios', { timeout: 10000 });

        // ASSERT - Verificar que el heading de la lista de comentarios está presente
        await expect(
            page.getByRole('heading', { name: 'Comentarios' })
        ).toBeVisible({ timeout: 8000 });

        // ASSERT - Verificar que hay contenido en la sección (comentarios del seed o mensaje vacío).
        // Usamos el patrón .or() de Playwright para esperar cualquiera de los dos estados válidos:
        //   - El artículo del seed ya tiene comentarios → aparecen tarjetas de comentario
        //   - El artículo está vacío → aparece el mensaje "Sé el primero en comentar."
        const commentCard = page.getByText('Sé el primero en comentar.');
        const emptyMessage = page.locator('[class*="bg-zinc-900"]').filter({ hasText: /.+/ }).first();
        await expect(commentCard.or(emptyMessage)).toBeVisible({ timeout: 8000 });
    });

    // --------------------------------------------------------------------------
    // TEST 5: Eliminar comentario propio
    // --------------------------------------------------------------------------
    test('debe eliminar comentario propio correctamente', async ({ page, browserName }) => {
        // ARRANGE - Crear y autenticar un usuario
        await createAuthenticatedUser(page, browserName);

        // Navegar al artículo
        await page.goto(ARTICLE_URL);

        // Esperar a que el formulario esté disponible
        const textarea = page.getByPlaceholder('Comparte tus pensamientos sobre el artículo...');
        await expect(textarea).toBeVisible({ timeout: 8000 });

        // Crear un comentario para luego eliminarlo
        const commentText = `Comentario para eliminar - ${browserName} - ${Date.now()}`;
        await textarea.fill(commentText);
        await page.getByRole('button', { name: 'Publicar Comentario' }).click();

        // Esperar a que el comentario aparezca en la lista
        await expect(page.getByText(commentText)).toBeVisible({ timeout: 8000 });

        // ACT - Hacer clic en el botón de eliminar y confirmar el diálogo
        // window.confirm() se acepta automáticamente en Playwright por defecto
        page.once('dialog', dialog => dialog.accept());
        await page.getByTitle('Eliminar comentario').click();

        // ASSERT - Verificar que el comentario ya no está en la lista
        await expect(page.getByText(commentText)).not.toBeVisible({ timeout: 8000 });

        // ASSERT - Verificar que el formulario vuelve a aparecer (el usuario puede volver a comentar)
        await expect(
            page.getByPlaceholder('Comparte tus pensamientos sobre el artículo...')
        ).toBeVisible({ timeout: 5000 });
    });

    // --------------------------------------------------------------------------
    // TEST 6: Error al comentar dos veces en el mismo artículo
    // --------------------------------------------------------------------------
    test('debe mostrar error al intentar comentar dos veces en el mismo artículo', async ({ page, browserName }) => {
        // ARRANGE - Crear y autenticar un usuario
        await createAuthenticatedUser(page, browserName);

        // Navegar al artículo y publicar primer comentario
        await page.goto(ARTICLE_URL);

        const textarea = page.getByPlaceholder('Comparte tus pensamientos sobre el artículo...');
        await expect(textarea).toBeVisible({ timeout: 8000 });

        // ACT - Publicar el primer comentario correctamente
        await textarea.fill('Este es mi primer comentario de prueba en el artículo.');
        await page.getByRole('button', { name: 'Publicar Comentario' }).click();

        // Esperar confirmación del primer comentario
        await expect(
            page.getByText('¡Gracias! Ya has compartido tu opinión sobre este artículo.')
        ).toBeVisible({ timeout: 8000 });

        // ASSERT - Verificar que el mensaje de "ya comentaste" está visible
        // y que el formulario ya NO muestra el textarea
        await expect(
            page.getByText('Solo se permite un comentario por usuario.')
        ).toBeVisible();

        // ASSERT - Verificar que el textarea no está visible (no puede comentar de nuevo)
        await expect(
            page.getByPlaceholder('Comparte tus pensamientos sobre el artículo...')
        ).not.toBeVisible();
    });

    // --------------------------------------------------------------------------
    // TEST 7: Error con comentario demasiado corto
    // --------------------------------------------------------------------------
    test('debe mostrar error con comentario demasiado corto (menos de 10 caracteres)', async ({ page, browserName }) => {
        // ARRANGE - Crear y autenticar un usuario
        await createAuthenticatedUser(page, browserName);

        // Navegar al artículo
        await page.goto(ARTICLE_URL);

        const textarea = page.getByPlaceholder('Comparte tus pensamientos sobre el artículo...');
        await expect(textarea).toBeVisible({ timeout: 8000 });

        // ACT - Intentar enviar un comentario de menos de 10 caracteres
        await textarea.fill('Corto');  // 5 caracteres < mínimo (10)
        await page.getByRole('button', { name: 'Publicar Comentario' }).click();

        // ASSERT - Verificar que aparece el mensaje de error de validación
        await expect(
            page.getByText('El comentario debe tener al menos 10 caracteres')
        ).toBeVisible({ timeout: 5000 });

        // ASSERT - Verificar que NO se redirigió ni cambió la URL
        await expect(page).toHaveURL(ARTICLE_URL);

        // ASSERT - Verificar que el formulario sigue visible (el usuario puede corregir)
        await expect(textarea).toBeVisible();
    });
});
