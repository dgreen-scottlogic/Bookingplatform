import { test, expect } from './test';

test('homepage shows page header @smoke', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.getByRole('heading', { name : 'Club Management Platform'})).toBeVisible();
})

test('log in as club member @smoke', async ({ homePage, loginPage, page }) => {
    
    await homePage.goto();
    await homePage.goToLogIn();
    
    await loginPage.login('testingaccount@email.com', 'testing');
    
    await expect(page).toHaveURL('http://localhost:3000/lakeview-bowls');
})

test('book available rink @smoke', async ({ homePage, loginPage, clubUserBooking, page }) => {

    await homePage.goto();
    await homePage.goToLogIn();
    
    await loginPage.login('testingaccount@email.com', 'testing');

    await clubUserBooking.goto();
    await clubUserBooking.chooseBookingDate('2026-11-03');
    await clubUserBooking.pickFirstAvailableSlot();

    await expect(page.getByText('Booking requested for you successfully!')).toBeVisible();  
})

test('register as club member @smoke', async ({ homePage, registerPage, loginPage, clubUserBooking, page }) => {

    await homePage.goto();
    await homePage.goToRegister();

    await registerPage.register('newaccount@email.com', 'new', 'lakeview-bowls');
    await expect(page.getByText('Registration successful!')).toBeVisible();

    await loginPage.login('newaccount@email.com', 'new');
    await expect(page).toHaveURL('http://localhost:3000/lakeview-bowls');
    
})