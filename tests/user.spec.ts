import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SideMenuOption, SidePanel } from '../components/SidePanel';
import { TopBarMenu } from '../components/topbar-menu/TopBarMenu';

test.describe('Pruebas del Módulo Admin - OrangeHRM', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("/web/index.php/dashboard/index")
    });

    test('1. Login y captura de usuarios', async ({ page }) => {
        const sidePanel = new SidePanel(page);
        const topBarMenu = new TopBarMenu(page);

        await sidePanel.clickOnOption(SideMenuOption.ADMIN);
        await topBarMenu.userManagement.clickOnUsers();

        const userCells = page.locator('.oxd-table-card .oxd-table-cell:nth-child(2)');
        await expect(userCells.first()).toBeVisible();

        const usernames = (await userCells.allTextContents())
            .map(name => name.trim())
            .filter(Boolean);

        console.log('✅ Usuarios capturados: ', usernames.length);
        expect(usernames.length).toBeGreaterThan(0);
    });

    test('2. Seleccionar usuario para editar', async ({ page }) => {
        const sidePanel = new SidePanel(page);
        await sidePanel.clickOnOption(SideMenuOption.ADMIN);

        const userRows = page.locator('.oxd-table-card');
        await expect(userRows.first()).toBeVisible();

        const firstRow = userRows.first();
        const usernameToEdit = (await firstRow.locator('.oxd-table-cell')
            .nth(1)
            .textContent())?.trim() || '';

        await firstRow.locator('button')
            .filter({ has: page.locator('i.bi-pencil-fill') })
            .click();

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

    test('7. Captura de montos totales en tabla @slow', async ({ page }) => {
        test.slow();
        await page.goto('/web/index.php/claim/viewAssignClaim');

        const table = page.getByRole('table');
        await expect(table).toBeVisible();

        const amountCells = table.getByRole('rowgroup').nth(1).locator('div[role="cell"]:nth-child(8), td:nth-child(8)');

        await expect(amountCells.first()).toBeVisible();

        const rawTexts = await amountCells.allTextContents();

        const amounts = rawTexts
            .map(text => parseFloat(text.replace(/,/g, '').trim()))
            .filter(num => !isNaN(num));

        const total = amounts.reduce((acc, curr) => acc + curr, 0);

        console.log('Cantidades:', amounts);
        console.log('El total es:', total);
    });

    test('8. Creación de un nuevo usuario @slow', async ({ page }) => {
        test.slow()

        const randomUserName = 'YamilaOrange' + crypto.randomUUID().slice(0, 8)
        const password = 'PassOrange2#' + crypto.randomUUID().slice(0, 4)

        const sidePanel = new SidePanel(page);
        await sidePanel.clickOnOption(SideMenuOption.ADMIN);

        await expect(page.getByText('Add')).toBeVisible()
        await page.getByText('Add').click()

        //User Role
        await expect(page.getByText('Add User')).toBeVisible()
        await page.locator('.oxd-input-group', { hasText: 'User Role' })
            .locator('.oxd-select-text-input')
            .click();
        await page.getByRole('option', { name: 'ESS' }).click();

        //Status
        await page.locator('.oxd-input-group', { hasText: 'Status' })
            .locator('.oxd-select-text-input')
            .click();
        await page.getByRole('option', { name: 'Enabled' }).click();

        //Employee Name
        const employeeInput = page.getByRole('textbox', { name: 'Type for hints...' });
        await employeeInput.fill('a');
        await page.waitForResponse(resp => resp.url().includes('/api/v2/pim/employees') && resp.status() === 200);

        const firstOption = page.locator('div[role="option"]').first();
        await expect(firstOption).toBeVisible();
        await firstOption.click();

        //Username
        await page.locator('div.oxd-grid-item--gutters')
            .filter({ has: page.getByText('Username', { exact: true }) })
            .getByRole('textbox')
            .fill(randomUserName)

        //Password
        await page.locator('div.oxd-grid-item--gutters')
            .filter({ has: page.getByText('Password', { exact: true }) })
            .getByRole('textbox')
            .fill(password)

        //Confirm Password
        await page.locator('div.oxd-grid-item--gutters')
            .filter({ has: page.getByText('Confirm Password', { exact: true }) })
            .getByRole('textbox')
            .fill(password)

        await page.getByRole('button', { name: 'save' }).click()

        await expect(page.locator('p.oxd-text--toast-message')).toHaveText('Successfully Saved');

    });
});


