import { test, expect } from '@playwright/test';
import { ClubUserBooking } from './ClubUserBooking';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';

test('homepage shows page header @smoke', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.getByRole('heading', { name : 'Club Management Platform'})).toBeVisible();
})

test('log in as club member @smoke', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', {name: 'Sign In'}).click();
    await page.getByRole('textbox', {name:'Email'}).fill('testingaccount@email.com');
    await page.getByRole('textbox', {name:'Password'}).fill('testing');
    await page.getByRole('button', {name: 'Sign In'}).click();
    
    await expect(page).toHaveURL('http://localhost:3000/lakeview-bowls');
})

test('book available rink @smoke', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const clubUserBooking = new ClubUserBooking(page);

    await homePage.goToHomePage();
    await homePage.goToLogIn();
    
    await loginPage.login('testingaccount@email.com', 'testing');

    await clubUserBooking.goToBookingPage();
    await clubUserBooking.chooseBookingDate('2026-11-03');
    await clubUserBooking.pickFirstAvailableSlot();

    // await page.goto('http://localhost:3000/');
    // await page.getByRole('link', {name: 'Sign In'}).click();
    // await page.getByRole('textbox', {name:'Email'}).fill('testingaccount@email.com');
    // await page.getByRole('textbox', {name:'Password'}).fill('testing');
    // await page.getByRole('button', {name: 'Sign In'}).click();

    // await page.getByRole('link', {name: 'Bookings'}).click();   

    // await page
    //     .getByRole('button')
    //     .filter({hasText:'Open'})
    //     .nth(0)
    //     .click();


    // await page.getByRole('button', {name: 'Request Booking'}).click();

    await expect(page.getByText('Booking requested for you successfully!')).toBeVisible();  
})



