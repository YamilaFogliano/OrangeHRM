import { Page } from "@playwright/test";
import { UserManagementMenu } from "./UserManagementMenu";
import { JobMenu } from "./JobMenu";
import { OrganizationMenu } from "./OrganizationMenu";
import { QualificationsMenu } from "./QualificationsMenu";
import { NationalitiesMenu } from "./NationalitiesMenu";
import { CorporateBrandingMenu } from "./CorporateBrandingMenu";
import { ConfigurationMenu } from "./ConfigurationMenu";

export class TopBarMenu {

    private readonly page: Page
    readonly userManagement: UserManagementMenu
    readonly job: JobMenu
    readonly organization: OrganizationMenu
    readonly qualifications: QualificationsMenu
    readonly nationalities: NationalitiesMenu
    readonly corporateBranding: CorporateBrandingMenu
    readonly configuration: ConfigurationMenu

    constructor(page: Page) {
        this.page = page
        this.userManagement = new UserManagementMenu(page)
        this.job = new JobMenu(page)
        this.organization = new OrganizationMenu(page)
        this.qualifications = new QualificationsMenu(page)
        this.nationalities = new NationalitiesMenu(page)
        this.corporateBranding = new CorporateBrandingMenu(page)
        this.configuration = new ConfigurationMenu(page)
    }

}