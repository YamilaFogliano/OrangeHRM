import { test, expect } from '@playwright/test';

const EXPECTED_MENU_ITEMS = [
    'Admin',
    'PIM',
    'Leave',
    'Time',
    'Recruitment',
    'My Info',
    'Performance',
    'Dashboard',
    'Directory',
    'Maintenance',
    'Claim',
    'Buzz'
];

test.describe('Navegación en OrangeHRM', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
        await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    });

    test('1. Validación de menús laterales', async ({ page }) => {
        const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem');
        const currentMenuItemsCount = await leftMenuItems.count();
        console.log('Current menu items count', currentMenuItemsCount);

        const currentMenuItems: string[] = [];

        for (let i = 0; i < currentMenuItemsCount; i++) {
            const menuText = await leftMenuItems.nth(i).innerText();
            currentMenuItems.push(menuText);
        }

        expect(currentMenuItems).toEqual(EXPECTED_MENU_ITEMS);
    });


    test('2. Recorrido por items laterales y acceso a cada uno de ellos', async ({ page }) => {
        test.setTimeout(60000);

        const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem');
        await expect(leftMenuItems.first()).toBeVisible();

        const currentMenuItemsCount = await leftMenuItems.count();

        for (let i = 0; i < currentMenuItemsCount; i++) {
            const menuItem = leftMenuItems.nth(i);
            const menuText = await menuItem.innerText();

            console.log('Current menu item', menuText);

            if (menuText !== 'Maintenance') {
                await menuItem.click();
            }
        }
    });

    test('3. Acceso al módulo de Mantenimiento con confirmación de contraseña', async ({ page }) => {
        await page.getByRole('link', { name: 'Maintenance' }).click();

        await expect(page.getByRole('heading', { name: 'Administrator Access' })).toBeVisible();

        const passwordInput = page.locator('input[type="password"]');

        await expect(passwordInput).toBeVisible();
        await passwordInput.fill('admin123');
        await page.getByRole('button', { name: 'Confirm' }).click();

        await expect(page.getByRole('heading', { name: 'Purge Records' })).toBeVisible();
        console.log('✅ Acceso a Maintenance verificado correctamente');
    });

    test('4.Validación de nav en menú Qualifications', async ({ page }) => {

        const expectedPages = [
            {
                menu: 'Skills',
                url: '/web/index.php/admin/viewSkills'
            },
            {
                menu: 'Education',
                url: '/web/index.php/admin/viewEducation'
            },
            {
                menu: 'Licenses',
                url: '/web/index.php/admin/viewLicenses'
            },

        ]

        await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
        await page.getByRole('link', { name: 'Admin' }).click();

        await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Qualifications').click()

        const qualificationOptions = page.getByRole('menu').locator('li')

        for (let expectedPage of expectedPages) {

            const menuOption = qualificationOptions.filter({ hasText: expectedPage.menu })
            await menuOption.click()
            await expect(page).toHaveURL(new RegExp(expectedPage.url))

            await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Qualifications').click()

        }

    });

});