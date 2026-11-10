import { test as setup } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';

const userEmail = process.env.USER_EMAIL!
const userPassword = process.env.USER_PASSWORD!
const clubSlug = process.env.CLUB_SLUG!

setup('create new database', async ({ page }) => {
  console.log('creating new database...');
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.goToLogIn();
  await loginPage.login(userEmail, userPassword, clubSlug);
  await page.context().storageState({ path: 'playwright/.auth/user.json' })
});