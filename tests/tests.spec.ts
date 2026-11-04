import { test, expect } from './helpers/test';
import userLogins from './helpers/userLogins';
import date from './helpers/date';

test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
})

test.afterEach(async ({ page, cleanUp }) => {
await cleanUp.signOut();
await page.close();
});

test('homepage shows page header', async ({ page }) => {
    await expect(page.getByRole('heading', { name : 'Club Management Platform'})).toBeVisible();
});

userLogins.forEach(({ email, password, expectedURL }) => {
    test(`testing with email login ${email} @smoke`, async ({ homePage, loginPage, page }) => {
        await homePage.goToLogIn();
        await Promise.all([
            page.waitForURL(`**${expectedURL}`),
            loginPage.login(email, password),
        ]);
    })
})


test('book available rink', async ({ homePage, loginPage, clubUserBookingPage, page }) => {
    await homePage.goToLogIn();
    
    await loginPage.login(userLogins[0].email, userLogins[0].password);

    await clubUserBookingPage.goto();
    await clubUserBookingPage.chooseBookingDate(date);
    await clubUserBookingPage.pickFirstAvailableSlot();

    await expect(page.getByText('Booking requested for you successfully!')).toBeVisible();  
})