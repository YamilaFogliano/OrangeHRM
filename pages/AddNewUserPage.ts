import { Page, expect, Locator } from "@playwright/test";

export class AddNewUserPage {

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

    async clickOnAdd() {
        await expect(this.addButton).toBeVisible();
        await this.addButton.click();
    }

    async selectUserRole(userRole: 'Admin' | 'ESS') {
        await expect(this.page.getByText('Add User')).toBeVisible();
        await this.page.locator('.oxd-input-group', { hasText: 'User Role' })
            .locator('.oxd-select-text-input')
            .click();

        await this.page.getByRole('option', { name: userRole, exact: true }).click();
    }

    async selectStatus(status: 'Enabled' | 'Disabled') {
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
        await this.page.locator('.oxd-input-group', { hasText: 'Username' })
            .getByRole('textbox')
            .fill(username);
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
}
