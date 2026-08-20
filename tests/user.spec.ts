import { test, expect } from '@playwright/test';

test('Login y captura de usuarios den Orange HRM', async ({ page }) => {

    console.log('✅ Ingresando credenciales');
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
    console.log('✅ Ingreso exitoso');

    console.log('✅ Recolectando usuarios');
    await page.getByRole('link', { name: 'Admin' }).click();

    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click();
    await page.getByRole('menuitem', { name: 'Users' }).click();

    const rows = page.getByRole('table').getByRole('row')
    const usernames: string[] = []

    const rowCount = await rows.count()

    for (let i = 1; i < rowCount; i++) {

        const cell = rows.nth(i).getByRole('cell').nth(1)
        const username = await cell.textContent()

        if (username) {
            usernames.push(username)
        }
    }

    console.log('✅ Usuarios capturados: ', usernames.length)
    console.log(usernames)

});

test('Seleccionar usuario para editar usuario', async ({ page }) => {

    const userForEdition = 'Ramya';

    console.log('✅ Ingresando credenciales');
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

    console.log('✅ Recolectando usuarios');
    await page.getByRole('link', { name: 'Admin' }).click();

    const userRow = page
        .getByRole('table')
        .getByRole('row')
        .filter({ hasText: userForEdition });

    await userRow
        .locator('button')
        .filter({ has: page.locator('i.bi-pencil-fill') })
        .click();

    const usernameInput = page
        .locator('.oxd-input-group')
        .filter({ hasText: 'Username' })
        .locator('input');

    await expect(usernameInput).toHaveValue(userForEdition);

});