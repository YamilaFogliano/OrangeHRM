import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SideMenuOption, SidePanel } from '../components/SidePanel';


test('Login de Orange HRM', async ({ page }) => {

    console.log('✅ Ingresando credenciales');

    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

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
