import { test, expect } from '../helpers/test';
import userLogins from '../helpers/userLogins';

test.afterEach(async ({ page, cleanUp }) => {
await cleanUp.signOut();
await page.close();
});

userLogins.forEach(({ email, password, expectedURL }) => {
    test(`log in with email ${email} @smoke`, async ({ homePage, loginPage, page }) => {
        await homePage.goToLogIn();
        await page.waitForLoadState('networkidle');
        await loginPage.login(email, password, expectedURL);
        await expect(page).toHaveURL(`${expectedURL}`);
    });
})

