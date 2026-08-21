import { Locator, Page } from "@playwright/test";

export class ConfigurationMenu {

    readonly page: Page
    readonly configuration: Locator
    readonly emailConfigurationOption
    readonly emailSubscriptionOption
    readonly localizationOption
    readonly languagePackagesOption
    readonly modulesOption
    readonly socialMediaAuthOption
    readonly registerOauthClientOption
    readonly ldapConfigurationOption

    constructor(page: Page) {
        this.page = page
        this.configuration = page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Configuration')
        this.emailConfigurationOption = page.getByRole('menuitem', { name: 'Email Configuration' })
        this.emailSubscriptionOption = page.getByRole('menuitem', { name: 'Email Subscription' })
        this.localizationOption = page.getByRole('menuitem', { name: 'Localization' })
        this.languagePackagesOption = page.getByRole('menuitem', { name: 'Language Packages' })
        this.modulesOption = page.getByRole('menuitem', { name: 'Modules' })
        this.socialMediaAuthOption = page.getByRole('menuitem', { name: 'Social Media Authentication' })
        this.registerOauthClientOption = page.getByRole('menuitem', { name: 'Register OAuth Client' })
        this.ldapConfigurationOption = page.getByRole('menuitem', { name: 'LDAP Configuration' })
    }


    private async clickOnConfig() {
        await this.configuration.click()
    }

    async clickOnEmailConfig() {
        await this.clickOnConfig()
        await this.emailConfigurationOption.click()
    }

    async clickOnEmailSubs() {
        await this.clickOnConfig()
        await this.emailSubscriptionOption.click()
    }

    async clickOnLocalization() {
        await this.clickOnConfig()
        await this.localizationOption.click()
    }

    async clickOnLanguagePackage() {
        await this.clickOnConfig()
        await this.languagePackagesOption.click()
    }

    async clickOnModules() {
        await this.clickOnConfig()
        await this.modulesOption.click()
    }

        async clickOnSocialMediaAuth() {
        await this.clickOnConfig()
        await this.socialMediaAuthOption.click()
    }

        async clickOnRegisterOAuthClients() {
        await this.clickOnConfig()
        await this.registerOauthClientOption.click()
    }

        async clickOnLDAPConfig() {
        await this.clickOnConfig()
        await this.ldapConfigurationOption.click()
    }
}