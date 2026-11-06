import { test, expect } from './helpers/test';
import userLogins from './helpers/userLogins';
import date from './helpers/date';
import { randomName, randomEmail, randomPassword, clubSlugDefault } from './helpers/NewUserLogin';
import { registrationConfMsg, bookingConfMsg } from './helpers/ConfirmationMessages';
import { ClubUserBookingPage } from './pages/ClubUserBookingPage';
import LoginPage from '@/app/auth/login/page';
import RegisterPage from '@/app/auth/register/page';


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

test('register with club', async({ registerPageWithClub, page }) => {
    await expect(page.getByText(registrationConfMsg)).toBeVisible();  
}
)
test('register without club', async ({ registerPageWithoutClub, page }) => {
    await expect(page.getByText(registrationConfMsg)).toBeVisible();  
});

userLogins.forEach(({ email, password, expectedURL }) => {
    test(`testing with email login ${email} @smoke`, async ({ homePage, loginPage, page }) => {
        await homePage.goToLogIn();
        await page.waitForLoadState('networkidle');
        await loginPage.login(email, password, expectedURL);
        await expect(page).toHaveURL(`${expectedURL}`);
    });
})

test('book available rink', async ({ page, clubUserBookingPage }) => {
    await expect(page.getByText(bookingConfMsg)).toBeVisible();  
})

test('register with pre-registered email', async ({ registerPageWithClub, page }) => {
    await registerPageWithClub.goto();
    await registerPageWithClub.registerWithClub(randomName, userLogins[0].email, randomPassword, clubSlugDefault);
    await expect(page.getByText('Email already registered')).toBeVisible();
})


test('book rink in the past', async ({ clubUserBookingPage, page }) => {
    test.fail(true, 'This test is expected to fail due to a known bug');

    await clubUserBookingPage.goto();
    await clubUserBookingPage.chooseBookingDate('2026-11-04');
    await clubUserBookingPage.pickFirstAvailableSlot();

    await expect(page.getByText(bookingConfMsg)).toBeHidden();  
})

test('invalid email @smoke', async({ page, registerPageWithClub }) => {
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

test('GET /api/bookings returns a list', { tag: '@api' }, async ({ request }) => { 
  const response = await request.get('/api/bookings'); 
  expect(response.status()).toBe(200); 
  const body = await response.json(); 
  expect(body.length).toBeGreaterThan(0); 
  expect(body[0]).toHaveProperty('id'); 
}); 