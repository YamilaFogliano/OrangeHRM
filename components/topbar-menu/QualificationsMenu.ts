import { Locator, Page } from "@playwright/test";

export class QualificationsMenu {

    readonly page: Page
    readonly qualifications: Locator
    readonly skillsOption
    readonly educationOption
    readonly licensesOption
    readonly languagesOption
    readonly membershipsOption

    constructor(page: Page) {
        this.page = page
        this.qualifications = page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Qualifications')
        this.skillsOption = page.getByRole('menuitem', { name: 'Skills' })
        this.educationOption = page.getByRole('menuitem', { name: 'Education' })
        this.licensesOption = page.getByRole('menuitem', { name: 'Licenses' })
        this.languagesOption = page.getByRole('menuitem', { name: 'Languages' })
        this.membershipsOption = page.getByRole('menuitem', { name: 'Memberships' })
    }


    private async clickOnQualif() {
        await this.qualifications.click()
    }

    async clickOnSkills() {
        await this.clickOnQualif()
        await this.skillsOption.click()
    }

    async clickOnEducation() {
        await this.clickOnQualif()
        await this.educationOption.click()
    }

    async clickOnLicenses() {
        await this.clickOnQualif()
        await this.licensesOption.click()
    }

    async clickOnLanguages() {
        await this.clickOnQualif()
        await this.languagesOption.click()
    }

    async clickOnMemberships() {
        await this.clickOnQualif()
        await this.membershipsOption.click()
    }
}