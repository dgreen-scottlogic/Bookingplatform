import { test, expect } from './helpers/test';
import userLogins from './helpers/userLogins';
import date from './helpers/date';
import { randomName, randomEmail, randomPassword, clubSlugDefault } from './helpers/NewUserLogin';
import { registrationConfMsg, bookingConfMsg } from './helpers/ConfirmationMessages';
import HomePage from '@/app/page';


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

test('register with club', async ({ page, homePage, registerPage }) => {
    await homePage.goToRegister();
    await registerPage.registerWithClub(randomName, randomEmail, randomPassword, clubSlugDefault);

    await expect(page.getByText(registrationConfMsg)).toBeVisible();  
});

test('register without club', async ({ page, homePage, registerPage }) => {
    await homePage.goToRegister();
    await registerPage.registerWithoutClub(randomName, randomEmail, randomPassword);

    await expect(page.getByText(registrationConfMsg)).toBeVisible();  
});

userLogins.forEach(({ email, password, expectedURL }) => {
    test(`testing with email login ${email}`, async ({ homePage, loginPage, page }) => {
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

    await expect(page.getByText(bookingConfMsg)).toBeVisible();  
})

test('register with pre-registered email', async ({ homePage, registerPage, page }) => {
    await homePage.goToRegister();

    await registerPage.registerWithClub(randomName, userLogins[0].email, randomPassword, clubSlugDefault);

    await expect(page.getByText('Email already registered')).toBeVisible();
})


test('book rink in the past', async ({ homePage, loginPage, clubUserBookingPage, page }) => {
    test.fail(true, 'This test is expected to fail due to a known bug');
    await homePage.goToLogIn();
    
    await loginPage.login(userLogins[0].email, userLogins[0].password);

    await clubUserBookingPage.goto();
    await clubUserBookingPage.chooseBookingDate('2026-11-04');
    await clubUserBookingPage.pickFirstAvailableSlot();

    await expect(page.getByText(bookingConfMsg)).toBeHidden();  
})