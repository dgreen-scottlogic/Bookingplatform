import { type Locator, type Page } from '@playwright/test';

export class CleanUp {
    readonly signOutButton: Locator;
    readonly dashboardHeader: Locator;

    constructor(private readonly page: Page) {
        this.signOutButton = page.getByRole('button', {name: 'Sign Out'});
        this.dashboardHeader = page.getByText('Platform Dashboard');
    }

    async signOut() {
        await this.page.goto('http://localhost:3000/dashboard');
        if (await this.dashboardHeader.isVisible() || await this.signOutButton.isVisible()) {
            await this.signOutButton.click()
        }
        }
    }