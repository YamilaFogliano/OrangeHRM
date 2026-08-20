import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Login y captura de usuarios en Orange HRM', async ({ page }) => {

    console.log('✅ Ingresando credenciales');
    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123');
    console.log('✅ Ingreso exitoso');

    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();

    console.log('✅ Recolectando usuarios');
    await page.getByRole('link', { name: 'Admin' }).click();

    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click();
    await page.getByRole('menuitem', { name: 'Users' }).click();

    const firstRow = page.locator('.oxd-table-card').first();
    await expect(firstRow).toBeVisible();

    const userCells = page.locator('.oxd-table-card .oxd-table-cell:nth-child(2)');
    const usernames = (await userCells.allTextContents())
        .map(name => name.trim())
        .filter(Boolean);

    console.log('✅ Usuarios capturados: ', usernames.length);
    console.log(usernames);

    expect(usernames.length).toBeGreaterThan(0);

});

test('Seleccionar usuario para editar', async ({ page }) => {

    console.log('✅ Ingresando credenciales');
    const loginPage = new LoginPage(page);
    await loginPage.doLogin('Admin', 'admin123');
    console.log('✅ Ingreso exitoso');

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

    console.log('✅ Buscando usuarios');
    await page.getByRole('link', { name: 'Admin' }).click();

    const userRow = page.locator('.oxd-table-card').first();
    await expect(userRow).toBeVisible();

    const userForEdition = (await userRow.locator('.oxd-table-cell')
        .nth(1)
        .textContent())?.trim() || '';

    await userRow
        .locator('button')
        .filter({ has: page.locator('i.bi-pencil-fill') })
        .click();

    const usernameInput = page
        .locator('.oxd-input-group')
        .filter({ hasText: 'Username' })
        .locator('input');

    await expect(usernameInput).toHaveValue(userForEdition);

    console.log('✅ Usuario seleccionado: ', userForEdition)

});