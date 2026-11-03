import { type Locator, type Page } from '@playwright/test';

export class RegisterPage {
    readonly email: Locator;
    readonly password: Locator;
    readonly clubSlug: Locator;
    readonly submit: Locator;

constructor(private readonly page: Page) {
    this.email = page.getByRole('textbox', {name:'Email'});
    this.password = page.getByRole('textbox', {name:'Password'});
    this.clubSlug = page.getByRole('textbox', {name:'Club slug'});
    this.submit = page.getByRole('button', {name: 'Register'});
}

async goto() {
    await this.page.goto('http://localhost:3000/auth/register')
}
 
async register(email: string, password: string, clubSlug: string) { 
    await this.email.fill(email); 
    await this.password.fill(password); 
    await this.clubSlug.fill(clubSlug);
    await this.submit.click(); 
  }
}