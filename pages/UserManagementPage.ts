import { Page, expect, Locator } from "@playwright/test";
import { UserModel } from "../models/UserModel";

export class UserManagementPage {

    private readonly addButton: Locator;
    private readonly saveButton: Locator;
    private readonly toastMessage: Locator;
    private readonly employeeInput: Locator;

    constructor(private readonly page: Page) {
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.toastMessage = page.locator('p.oxd-text--toast-message');
        this.employeeInput = page.getByRole('textbox', { name: 'Type for hints...' });
    }

    //Filtra la tabla por rol de usuario
    async filterByRole(role: string) {
        const userRoleDropdown = this.page.locator('.oxd-input-group', { hasText: 'User Role' }).getByText('-- Select --');
        await userRoleDropdown.click();
        await this.page.getByRole('option', { name: role, exact: true }).click();

        const responsePromise = this.page.waitForResponse(
            resp => resp.url().includes('/api/v2/admin/users') && resp.status() === 200
        );
        await this.page.getByRole('button', { name: 'Search' }).click();
        await responsePromise;
    }

    //Busqueda y navegacion en la tabla
    //Edita el primer usuario disponible en la tabla y devuelve su nombre de usuario
    async editFirstUserFromTable(): Promise<string> {
        const userRows = this.page.locator('.oxd-table-card');
        await expect(userRows.first()).toBeVisible();

        const firstRow = userRows.first();
        const currentUsername = (await firstRow.locator('.oxd-table-cell').nth(1).textContent())?.trim() || '';

        const userDetailsPromise = this.page.waitForResponse(
            resp => resp.url().includes('/api/v2/admin/users/') && resp.status() === 200
        );

        await firstRow.locator('button')
            .filter({ has: this.page.locator('i.bi-pencil-fill') })
            .click();

        await userDetailsPromise;

        const usernameInput = this.page.locator('.oxd-input-group', { hasText: 'Username' }).locator('input');
        await expect(usernameInput).toHaveValue(currentUsername);

        return currentUsername;
    }

    //Metodos de los formularios
    async clickOnAdd() {
        await expect(this.addButton).toBeVisible();
        await this.addButton.click();
    }

    async selectUserRole(userRole: string) {
        await expect(this.page.getByText(/(Add|Edit) User/)).toBeVisible();
        await this.page.locator('.oxd-input-group', { hasText: 'User Role' })
            .locator('.oxd-select-text-input')
            .click();

        await this.page.getByRole('option', { name: userRole, exact: true }).click();
    }

    async selectStatus(status: string) {
        await this.page.locator('.oxd-input-group', { hasText: 'Status' })
            .locator('.oxd-select-text-input')
            .click();

        await this.page.getByRole('option', { name: status, exact: true }).click();
    }

    async selectEmployeeName(employeeHint: string) {
        await this.employeeInput.fill(employeeHint);

        await this.page.waitForResponse(
            resp => resp.url().includes('/api/v2/pim/employees') && resp.status() === 200
        );

        const firstOption = this.page.locator('div[role="option"]').first();
        await expect(firstOption).toBeVisible();
        await firstOption.click();
    }

    async enterUsername(username: string) {
        const usernameInput = this.page
            .locator('.oxd-input-group', { hasText: 'Username' })
            .locator('input');

        await usernameInput.click();
        await usernameInput.clear();
        await usernameInput.fill(username);
    }

    async clickChangePasswordCheckbox() {
        await this.page.locator('.oxd-checkbox-wrapper').getByText('Yes').click();
    }

    async enterPassword(password: string) {
        await this.page.locator('.oxd-input-group', { hasText: 'Password' })
            .getByRole('textbox')
            .first()
            .fill(password);
    }

    async enterConfirmPassword(password: string) {
        await this.page.locator('.oxd-input-group', { hasText: 'Confirm Password' })
            .getByRole('textbox')
            .fill(password);
    }

    async clickOnSave() {
        await this.saveButton.click();
    }

    async checkUserWasAddedMessage() {
        await expect(this.toastMessage).toBeVisible();
        await expect(this.toastMessage).toHaveText('Successfully Saved');
    }

    async checkUserWasUpdatedMessage() {
        await expect(this.toastMessage).toBeVisible();
        await expect(this.toastMessage).toHaveText('Successfully Updated');
    }

    async addNewUser(user: UserModel) {
        await this.clickOnAdd()
        await this.selectUserRole(user.role)
        await this.selectStatus(user.status)
        await this.selectEmployeeName(user.employee)
        await this.enterUsername(user.username)
        await this.enterPassword(user.password)
        await this.enterConfirmPassword(user.confirmPassword)
        await this.clickOnSave()
    }
}
