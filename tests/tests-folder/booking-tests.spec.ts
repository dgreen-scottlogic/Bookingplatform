import { test, expect } from '../helpers/test';
import { bookingConfMsg } from '../helpers/ConfirmationMessages';

test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
})

test.afterEach(async ({ page, cleanUp }) => {
await cleanUp.signOut();
await page.close();
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
