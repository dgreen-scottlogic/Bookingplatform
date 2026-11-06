import { test as setup } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';

setup('create new database', async ({ page }) => {
  console.log('creating new database...');
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.goToLogIn();
  await loginPage.login('testingaccount@email.com', 'testing', '/lakeview-bowls');
  await page.context().storageState({ path: 'playwright/.auth/user.json' })
});