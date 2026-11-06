import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly email: Locator;
    readonly password: Locator;
    readonly submit: Locator;

constructor(private readonly page: Page) {
    this.email = page.getByRole('textbox', {name:'Email'});
    this.password = page.getByRole('textbox', {name:'Password'});
    this.submit = page.getByRole('button', {name: 'Sign In'});
}
 
async login(email: string, password: string, expectedURL: string) { 
    await this.email.fill(email); 
    await this.password.fill(password); 
    await this.submit.click(); 
    await this.page.waitForURL(expectedURL)
  }
}