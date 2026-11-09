import { test, expect } from './helpers/test';
import userLogins from './helpers/userLogins';
import { randomName, randomEmail, randomPassword, clubSlugDefault } from './helpers/NewUserLogin';
import { registrationConfMsg, bookingConfMsg } from './helpers/ConfirmationMessages';

test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
})

test.afterEach(async ({ page, cleanUp }) => {
await cleanUp.signOut();
await page.close();
});

test.describe("registering and logging in", () => {
test.use({storageState: { cookies: [], origins: [] }});
    test('register with club', async({ registerPageWithClub, page }) => {
        await page.waitForLoadState('networkidle');
    await expect(page.getByText(registrationConfMsg)).toBeVisible();  
}
)
test('register without club', async ({ registerPageWithoutClub, page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(registrationConfMsg)).toBeVisible();  
});

test('register with pre-registered email', async ({ registerPageWithClub, page }) => {
    await registerPageWithClub.goto();
    await registerPageWithClub.registerWithClub(randomName, userLogins[0].email, randomPassword, clubSlugDefault);
    await expect(page.getByText('Email already registered')).toBeVisible();
});

userLogins.forEach(({ email, password, expectedURL }) => {
    test(`log in with email ${email} @smoke`, async ({ homePage, loginPage, page }) => {
        await homePage.goToLogIn();
        await page.waitForLoadState('networkidle');
        await loginPage.login(email, password, expectedURL);
        await expect(page).toHaveURL(`${expectedURL}`);
    });
})

test('invalid email html error shows', async({ page, registerPageWithClub }) => {
    await registerPageWithClub.goto();
    await registerPageWithClub.registerWithClub(randomName, 'invalidemail', randomPassword, clubSlugDefault);
    const input = page.getByRole('textbox', {name: 'Email'});
    await expect(input).toHaveJSProperty(`validity.typeMismatch`, true);
    await expect(page).toHaveURL('/auth/register');
});

test('weak password', async ({page, registerPageWithClub }) => {
    test.fail(true, 'This test is expected to fail due to a known bug');
    await registerPageWithClub.goto();
    await registerPageWithClub.registerWithClub(randomName, randomEmail, 'a', clubSlugDefault);

    await expect(page.getByText(registrationConfMsg)).toBeVisible();
});

});


test('homepage shows page header', async ({ page }) => {
    await expect(page.getByRole('heading', { name : 'Club Management Platform'})).toBeVisible();
});



test('book available rink', async ({ page, clubUserBookingPage }) => {
    await expect(page.getByText(bookingConfMsg)).toBeVisible();  
});


test('book rink in the past', async ({ clubUserBookingPage, page }) => {
    test.fail(true, 'This test is expected to fail due to a known bug');

    await clubUserBookingPage.goto();
    await clubUserBookingPage.chooseBookingDate('2026-11-04');
    await clubUserBookingPage.pickFirstAvailableSlot();

    await expect(page.getByText(bookingConfMsg)).toBeHidden();  
});

test('GET /api/bookings returns a list', { tag: '@api' }, async ({ request }) => { 
  const response = await request.get('/api/bookings'); 
  expect(response.status()).toBe(200); 
  const body = await response.json(); 
  expect(body.length).toBeGreaterThan(0); 
  expect(body[0]).toHaveProperty('id'); 
}); 