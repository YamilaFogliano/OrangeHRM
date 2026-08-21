import { Locator, Page } from "@playwright/test";

export class NationalitiesMenu {
    private readonly nationalitiesOption: Locator;

    constructor(private readonly page: Page) {
        this.nationalitiesOption = this.page.getByRole('link', { name: 'Nationalities' });
    }

    async clickOnNations() {
        await this.nationalitiesOption.click();
    }
}