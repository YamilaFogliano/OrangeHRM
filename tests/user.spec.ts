/* import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Environment } from '../utils/Environment';
import { SideMenuOption, SidePanel } from '../components/SidePanel';
import { TopBarMenu } from '../components/topbar-menu/TopBarMenu';
import { Navigate } from '../pages/Navigate';

test('1. Login y captura de usuarios en Orange HRM', async ({ page }) => {

    console.log('✅ Ingresando credenciales');
    const loginPage = new LoginPage(page);
    await loginPage.doLogin(Environment.ADMIN_USERNAME, Environment.ADMIN_PASSWORD);
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

test('2. Seleccionar usuario para editar', async ({ page }) => {

    console.log('✅ Ingresando credenciales');
    const loginPage = new LoginPage(page);
    await loginPage.doLogin(Environment.ADMIN_USERNAME, Environment.ADMIN_PASSWORD);
    console.log('✅ Ingreso exitoso');

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

    console.log('✅ Buscando usuarios');
    await page.getByRole('link', { name: 'Admin' }).click();

    const userRows = page.locator('.oxd-table-card');
    await expect(userRows.first()).toBeVisible();

    const randomIndex = Math.floor(Math.random() * await userRows.count());
    const userRow = userRows.nth(randomIndex);

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

    console.log('✅ Usuario seleccionado: ', userForEdition);

});

test('3. Inspección sobre menú desplegable: User Role', async ({ page }) => {

    const expectedRoleOptions = ['-- Select --', 'Admin', 'ESS']

    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

    await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div")
        .click()
    const currentUserRoleOptions = await page
        .getByRole('listbox')
        .getByRole('option')
        .allInnerTexts()

    console.log(currentUserRoleOptions)

    expect(currentUserRoleOptions,
        'Las opciones desplegadas no concuerdan con las esperadas.')
        .toEqual(expectedRoleOptions)

});

test('4. Inspección sobre menú desplegable: Status', async ({ page }) => {

    const expectedRoleOptions = ['-- Select --', 'Enabled', 'Disabled']

    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

    await page.locator("//label[contains(.,'Status')]/parent::div/following-sibling::div")
        .click()
    const currentUserRoleOptions = await page
        .getByRole('listbox')
        .getByRole('option')
        .allInnerTexts()

    console.log(currentUserRoleOptions)

    expect(currentUserRoleOptions,
        'Las opciones desplegadas no concuerdan con las esperadas.')
        .toEqual(expectedRoleOptions)

});

test('Filtrado por usuario: Admin', async ({ page }) => {

    const navigate = new Navigate(page);
    const sidePanel = new SidePanel(page);
    const topBarMenu = new TopBarMenu(page);

    await navigate.toDashboard();
    await sidePanel.clickOnOption(SideMenuOption.ADMIN);
    await topBarMenu.userManagement.clickOnUsers();

    // 1. Locators resilientes (sin XPaths complejos)
    const userRoleDropdown = page.locator('.oxd-input-group', { hasText: 'User Role' }).getByText('-- Select --');
    const adminOption = page.getByRole('option', { name: 'Admin', exact: true });
    const searchButton = page.getByRole('button', { name: 'Search' });

    // Asumiendo la estructura estándar de tabla en OrangeHRM
    const roleCells = page.locator('.oxd-table-body .oxd-table-card .oxd-table-cell:nth-child(3)');

    // 2. Aplicar filtro directamente
    await userRoleDropdown.click();
    await adminOption.click();
    await searchButton.click();

    // 3. Esperar la respuesta de la red o la actualización de la UI
    await page.waitForResponse(resp => resp.url().includes('/api/v2/admin/users') && resp.status() === 200);

    // 4. Aserción web-first que valida todas las celdas de un solo golpe
    await expect(roleCells).toHaveText(await roleCells.evaluateAll(list => list.map(() => 'Admin')));
});
 */

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SideMenuOption, SidePanel } from '../components/SidePanel';
import { TopBarMenu } from '../components/topbar-menu/TopBarMenu';

test.describe('Pruebas del Módulo Admin - OrangeHRM', () => {

    // 1. Iniciar sesión automáticamente antes de CADA prueba
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAsAdmin();
    });

    test('1. Login y captura de usuarios', async ({ page }) => {
        const sidePanel = new SidePanel(page);
        const topBarMenu = new TopBarMenu(page);

        await sidePanel.clickOnOption(SideMenuOption.ADMIN);
        await topBarMenu.userManagement.clickOnUsers();

        const userCells = page.locator('.oxd-table-card .oxd-table-cell:nth-child(2)');
        await expect(userCells.first()).toBeVisible();

        const usernames = (await userCells.allTextContents()).map(name => name.trim()).filter(Boolean);

        console.log('✅ Usuarios capturados: ', usernames.length);
        expect(usernames.length).toBeGreaterThan(0);
    });

    test('2. Seleccionar usuario para editar', async ({ page }) => {
        const sidePanel = new SidePanel(page);
        await sidePanel.clickOnOption(SideMenuOption.ADMIN);

        const userRows = page.locator('.oxd-table-card');
        await expect(userRows.first()).toBeVisible();

        const firstRow = userRows.first();
        const usernameToEdit = (await firstRow.locator('.oxd-table-cell').nth(1).textContent())?.trim() || '';

        await firstRow.locator('button').filter({ has: page.locator('i.bi-pencil-fill') }).click();

        const usernameInput = page.locator('.oxd-input-group', { hasText: 'Username' }).locator('input');
        await expect(usernameInput).toHaveValue(usernameToEdit);
    });

    test('3. Inspección sobre menú desplegable: User Role', async ({ page }) => {
        const sidePanel = new SidePanel(page);
        await sidePanel.clickOnOption(SideMenuOption.ADMIN);

        await page.locator('.oxd-input-group', { hasText: 'User Role' }).getByText('-- Select --').click();
        const options = await page.getByRole('listbox').getByRole('option').allInnerTexts();

        expect(options).toEqual(['-- Select --', 'Admin', 'ESS']);
    });

    test('4. Inspección sobre menú desplegable: Status', async ({ page }) => {
        const sidePanel = new SidePanel(page);
        await sidePanel.clickOnOption(SideMenuOption.ADMIN);

        await page.locator('.oxd-input-group', { hasText: 'Status' }).getByText('-- Select --').click();
        const options = await page.getByRole('listbox').getByRole('option').allInnerTexts();

        expect(options).toEqual(['-- Select --', 'Enabled', 'Disabled']);
    });

    test('5. Filtrado por usuario: Admin', async ({ page }) => {
        const sidePanel = new SidePanel(page);
        const topBarMenu = new TopBarMenu(page);

        await sidePanel.clickOnOption(SideMenuOption.ADMIN);
        await topBarMenu.userManagement.clickOnUsers();

        const userRoleDropdown = page.locator('.oxd-input-group', { hasText: 'User Role' }).getByText('-- Select --');
        const roleCells = page.locator('.oxd-table-body .oxd-table-card .oxd-table-cell:nth-child(3)');

        await userRoleDropdown.click();
        await page.getByRole('option', { name: 'Admin', exact: true }).click();

        const responsePromise = page.waitForResponse(resp => resp.url().includes('/api/v2/admin/users') && resp.status() === 200);
        await page.getByRole('button', { name: 'Search' }).click();
        await responsePromise;

        await expect(roleCells.first()).toHaveText('Admin');

        const nonAdminCells = roleCells.filter({ hasText: 'ESS' });
        await expect(nonAdminCells).toHaveCount(0);
    });

    test('6. Filtrado por usuario: Enabled', async ({ page }) => {
        const sidePanel = new SidePanel(page);
        const topBarMenu = new TopBarMenu(page);

        await sidePanel.clickOnOption(SideMenuOption.ADMIN);
        await topBarMenu.userManagement.clickOnUsers();

        const statusDropdown = page.locator('.oxd-input-group', { hasText: 'Status' }).getByText('-- Select --');
        const statusCells = page.locator('.oxd-table-body .oxd-table-card .oxd-table-cell:nth-child(5)');

        await statusDropdown.click();
        await page.getByRole('option', { name: 'Enabled', exact: true }).click();

        const responsePromise = page.waitForResponse(resp => resp.url().includes('/api/v2/admin/users') && resp.status() === 200);
        await page.getByRole('button', { name: 'Search' }).click();
        await responsePromise;

        await expect(statusCells.first()).toHaveText('Enabled');

        const disabledCells = statusCells.filter({ hasText: 'Disabled' });
        await expect(disabledCells).toHaveCount(0);
    });
});
