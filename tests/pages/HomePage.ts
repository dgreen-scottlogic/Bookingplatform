import { type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly logIn: Locator;
    readonly register: Locator;
    readonly addYourClub: Locator;
    
    constructor(private readonly page: Page) {
        this.logIn = page.getByRole('link', {name:'Sign In'});
        this.register = page.getByRole('link', {name:'Register'});
        this.addYourClub = page.getByRole('link', {name:'Add Your Club'});
    }

    async goto() {
        await this.page.goto('/')
    }
    async goToLogIn() {
        await this.logIn.click()
    }

    async goToRegister() {
        await this.register.click()
    }

    async goToAddYourClub() {
        await this.addYourClub.click()
    }
}