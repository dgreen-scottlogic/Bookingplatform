import { type Locator, type Page } from '@playwright/test';

export class CleanUp {
    readonly signOutButton: Locator;
    readonly dashboardHeader: Locator;
    readonly email: Locator;
    readonly clubHeader: Locator;

    constructor(private readonly page: Page) {
        this.signOutButton = page.getByRole('button', {name: 'Sign Out'});
        this.dashboardHeader = page.getByText('Platform Dashboard');
        this.email = page.getByRole('textbox', {name:'Email'});
        this.clubHeader = page.getByRole('heading').filter({hasText:'Lakeview Bowls Club'});
    }

    async signOut() {
        await this.page.goto('/dashboard');
        if (await this.signOutButton.isVisible()) {
            await this.signOutButton.click()
        }
        }
    }