import { test, expect } from '@playwright/test';

test.describe("Suite de tests", async () => {

    test('Login de Orange HRM', async ({ page }) => {

        console.log('✅ Ingresando credenciales');

        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
        await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();

        console.log('✅ Ingreso exitoso');
    });

});