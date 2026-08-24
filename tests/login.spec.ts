import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SideMenuOption, SidePanel } from '../components/SidePanel';


test('1. Login de Orange HRM', async ({ page }) => {

    console.log('✅ Ingresando credenciales');

    await page.goto("/web/index.php/dashboard/index")

    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    console.log('✅ Ingreso exitoso');

    console.log('✅ Explorando menú lateral');
    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)
    await sidePanel.clickOnOption(SideMenuOption.MY_INFO)
    await sidePanel.clickOnOption(SideMenuOption.DASHBOARD)

    console.log('✅ Ingreso de datos en barra Search');
    await sidePanel.searchMenu('PIM');
    await sidePanel.clickOnOption(SideMenuOption.PIM);

});

test.skip('2. Login de Orange HRM como empleado', async ({ page }) => {

    console.log('✅ Ingresando credenciales');

    await page.goto("/web/index.php/dashboard/index")

    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    console.log('✅ Ingreso exitoso');

    console.log('✅ Explorando menú lateral');
    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.MY_INFO)
    await sidePanel.clickOnOption(SideMenuOption.PERFORMANCE)
    await sidePanel.clickOnOption(SideMenuOption.DASHBOARD)

    console.log('✅ Ingreso de datos en barra Search');
    await sidePanel.searchMenu('Buzz');
    await sidePanel.clickOnOption(SideMenuOption.BUZZ);

});
