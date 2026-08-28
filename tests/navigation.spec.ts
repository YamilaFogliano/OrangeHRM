import { test, expect } from '@playwright/test';
import { Environment } from '../utils/Environment';
import { TopBarMenu } from '../components/topbar-menu/TopBarMenu';
import { SideMenuOption, SidePanel } from '../components/SidePanel';

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

        await page.goto("/web/index.php/dashboard/index")

        await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    });

    test('1. Validación de menús laterales', async ({ page }) => {
        const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem');

        await expect(leftMenuItems).toContainText(['Admin', 'Dashboard']);
    });

    test('2. Recorrido por items laterales y acceso a cada uno de ellos @slow', async ({ page }) => {
        test.slow();

        const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem');

        for (const menuItem of await leftMenuItems.all()) {
            const menuText = (await menuItem.innerText()).trim();

            if (menuText !== 'Maintenance') {
                await menuItem.click();

                await expect(page.getByLabel('Sidepanel')).toBeVisible();
            }
        }
    });

    test('3. Acceso al módulo de Mantenimiento con confirmación de contraseña', async ({ page }) => {
        await page.getByRole('link', { name: 'Maintenance' }).click();

        await expect(page.getByRole('heading', { name: 'Administrator Access' })).toBeVisible();

        const passwordInput = page.locator('input[type="password"]');
        await expect(passwordInput).toBeVisible();

        await passwordInput.fill(Environment.ADMIN_PASSWORD);
        await page.getByRole('button', { name: 'Confirm' }).click();

        await expect(page.getByRole('heading', { name: 'Purge Records' })).toBeVisible();
    });

    test('4. Validación de nav en menú Qualifications', async ({ page }) => {
        const expectedPages = [
            { menu: 'Skills', url: '/web/index.php/admin/viewSkills' },
            { menu: 'Education', url: '/web/index.php/admin/viewEducation' },
            { menu: 'Licenses', url: '/web/index.php/admin/viewLicenses' },
        ];

        await page.getByRole('link', { name: 'Admin' }).click();
        const topbarMenu = page.getByRole('navigation', { name: 'Topbar menu' });

        for (const expectedPage of expectedPages) {
            await topbarMenu.getByText('Qualifications').click();
            await page.getByRole('menu')
                .locator('li')
                .filter({ hasText: expectedPage.menu })
                .click();

            await expect(page).toHaveURL(new RegExp(expectedPage.url));
        }
    });

    test('5. Validacion de elementos totales TopBar Menu @slow', async ({ page }) => {
        test.slow();

        const sidePanel = new SidePanel(page)
        await sidePanel.clickOnOption(SideMenuOption.ADMIN)

        await expect(page.getByRole('navigation', { name: 'Topbar Menu' })).toBeVisible();

        const topBarMenu = new TopBarMenu(page)

        await topBarMenu.userManagement.clickOnUsers()

        await topBarMenu.job.clickOnJobTitles()
        await topBarMenu.job.clickOnPayGrades()
        await topBarMenu.job.clickOnEmploymentStatus()
        await topBarMenu.job.clickOnJobCategories()
        await topBarMenu.job.clickOnWorkShifts()

        await topBarMenu.organization.clickOnGeneralInformation()
        await topBarMenu.organization.clickOnLocations()
        await topBarMenu.organization.clickOnStructure()

        await topBarMenu.qualifications.clickOnSkills()
        await topBarMenu.qualifications.clickOnEducation()
        await topBarMenu.qualifications.clickOnLicenses()
        await topBarMenu.qualifications.clickOnLanguages()
        await topBarMenu.qualifications.clickOnMemberships()

        await topBarMenu.nationalities.clickOnNations()

        await topBarMenu.corporateBranding.clickOnCorpBrand()

        await topBarMenu.configuration.clickOnEmailConfig()
        await topBarMenu.configuration.clickOnEmailSubs()
        await topBarMenu.configuration.clickOnLocalization()
        await topBarMenu.configuration.clickOnLanguagePackage()
        await topBarMenu.configuration.clickOnModules()
        await topBarMenu.configuration.clickOnSocialMediaAuth()
        await topBarMenu.configuration.clickOnRegisterOAuthClients()
        await topBarMenu.configuration.clickOnLDAPConfig()

    });

    test('6. Publicar un mensaje en sección BUZZ', async ({ page }) => {

        const sidePanel = new SidePanel(page);
        await sidePanel.clickOnOption(SideMenuOption.BUZZ);

        const formattedDate = new Date().toLocaleString('es-ES');
        const postText = `Hola, soy Yamila - ${formattedDate}`;

        const textarea = page.getByPlaceholder("What's on your mind?");
        await textarea.fill(postText);
        await expect(textarea).toHaveValue(postText);

        await page.getByRole('button', { name: 'Post', exact: true }).click();

        await sidePanel.clickOnOption(SideMenuOption.BUZZ);
        await expect(page.getByText(postText)).toBeVisible({ timeout: 10000 });
    });

});
