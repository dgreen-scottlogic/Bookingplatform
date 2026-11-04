import { test, expect } from './test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
})

test.afterEach(async ({ page, cleanUp }) => {
await cleanUp.signOut();
});

test('homepage shows page header @smoke', async ({ page }) => {
    await expect(page.getByRole('heading', { name : 'Club Management Platform'})).toBeVisible();
});

const userLogins = [
    {email: 'testingaccount@email.com', password: 'testing', expectedURL: '/lakeview-bowls'},
    {email: 'noclub@email.com', password: 'no', expectedURL: '/dashboard'},
    {email: 'admin@lakeview.club', password: 'club123', expectedURL: '/lakeview-bowls'},
    {email: 'admin@wlbooking.com', password: 'admin123', expectedURL: '/dashboard'}
];

userLogins.forEach(({ email, password, expectedURL }) => {
    test(`testing with email login ${email}`, async ({ homePage, loginPage, page }) => {
        await homePage.goToLogIn();
        await Promise.all([
            page.waitForURL(`**${expectedURL}`),
            loginPage.login(email, password),
        ]);
    })
})


test('book available rink @smoke', async ({ homePage, loginPage, clubUserBooking, page }) => {

    await homePage.goToLogIn();
    
    await loginPage.login('testingaccount@email.com', 'testing');

    await clubUserBooking.goto();
    await clubUserBooking.chooseBookingDate('2026-11-03');
    await clubUserBooking.pickFirstAvailableSlot();

    await expect(page.getByText('Booking requested for you successfully!')).toBeVisible();  
})

// test('register as club member @smoke', async ({ homePage, registerPage, loginPage, page }) => {

//     await homePage.goToRegister();

//     await registerPage.register('newaccount@email.com', 'new', 'lakeview-bowls');
//     await expect(page.getByText('Registration successful!')).toBeVisible();

//     await loginPage.login('newaccount@email.com', 'new');
//     await expect(page).toHaveURL('/lakeview-bowls');
    
// })