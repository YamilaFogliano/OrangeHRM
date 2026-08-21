import { Locator, Page } from "@playwright/test";

export class JobMenu {

    readonly page: Page
    readonly job: Locator
    readonly jobTitlesOption
    readonly payGradesOption
    readonly EmploymentStatusOption
    readonly JobCategoriesOption
    readonly WorkShiftsOption

    constructor(page: Page) {
        this.page = page
        this.job = page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Job')
        this.jobTitlesOption = page.getByRole('menuitem', { name: 'Job Titles' })
        this.payGradesOption = page.getByRole('menuitem', { name: 'Pay Grades' })
        this.EmploymentStatusOption = page.getByRole('menuitem', { name: 'Employment Status' })
        this.JobCategoriesOption = page.getByRole('menuitem', { name: 'Job Categories' })
        this.WorkShiftsOption = page.getByRole('menuitem', { name: 'Work Shifts' })
    }


    private async clickObJob() {
        await this.job.click()
    }

    async clickOnJobTitles() {
        await this.clickObJob()
        await this.jobTitlesOption.click()
    }

    async clickOnPayGrades() {
        await this.clickObJob()
        await this.payGradesOption.click()
    }

    async clickOnEmploymentStatus() {
        await this.clickObJob()
        await this.EmploymentStatusOption.click()
    }

    async clickOnJobCategories() {
        await this.clickObJob()
        await this.JobCategoriesOption.click()
    }

    async clickOnWorkShifts() {
        await this.clickObJob()
        await this.WorkShiftsOption.click()
    }
}
