import { type Locator, type Page } from '@playwright/test';

export class RegisterPage {
    readonly name: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly clubSlug: Locator;
    readonly submit: Locator;

constructor(private readonly page: Page) {
    this.name = page.getByRole('textbox', {name: 'Name'});
    this.email = page.getByRole('textbox', {name:'Email'});
    this.password = page.getByRole('textbox', {name:'Password'});
    this.clubSlug = page.getByRole('textbox', {name:'Club slug'});
    this.submit = page.getByRole('button', {name: 'Register'});
}
 
async registerWithClub(name: string, email: string, password: string, clubSlug: string) { 
    await this.name.fill(name);
    await this.email.fill(email); 
    await this.password.fill(password);
    await this.clubSlug.fill(clubSlug);
    await this.submit.click(); 
  }

async registerWithoutClub(name: string, email: string, password: string) { 
    await this.name.fill(name);
    await this.email.fill(email); 
    await this.password.fill(password);
    await this.submit.click(); 
  }

}