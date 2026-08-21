import { Locator, Page } from "@playwright/test";

export class CorporateBrandingMenu {
    private readonly corporateBrandingOption: Locator;

    constructor(private readonly page: Page) {
        this.corporateBrandingOption = this.page.getByRole('link', { name: 'Corporate Branding' });
    }

    async clickOnCorpBrand() {
        await this.corporateBrandingOption.click();
    }
}