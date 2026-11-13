import { test, expect } from '../helpers/test';
import userLogins from '../helpers/userLogins';
import { randomName, randomEmail, randomPassword, clubSlugDefault } from '../helpers/NewUserLogin';
import { registrationConfMsg, bookingConfMsg } from '../helpers/ConfirmationMessages';

test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
})

test.afterEach(async ({ page, cleanUp }) => {
await cleanUp.signOut();
await page.close();
});

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
