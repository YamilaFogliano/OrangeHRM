import { test as setup, expect } from '@playwright/test';
import * as path from 'node:path';
import { LoginPage } from '../pages/LoginPage';

const AUTH_STATE_PATH = path.resolve(process.cwd(), '.auth', 'admin.json');

setup('Autenticación como Admin', async ({ page }) => {
    console.log('✅ Iniciando flujo de autenticación para Admin...');

    const loginPage = new LoginPage(page);
    await loginPage.loginAsAdmin();

    await page.waitForURL('**/dashboard/index');
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

    await page.context().storageState({ path: AUTH_STATE_PATH });

    console.log('✅ Estado de autenticación guardado correctamente.');
});