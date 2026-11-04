import { type Locator, type Page } from '@playwright/test';

export class ClubUserBookingPage {
    readonly bookingPage: Locator;
    readonly bookingSlot: Locator;
    readonly requestBooking: Locator;

    constructor(private readonly page:Page) {
        this.bookingPage = page.getByRole('link', {name: 'Book Now'});
        this.bookingSlot = page.getByRole('button').filter({hasText: 'Open'}).nth(0);
        this.requestBooking = page.getByRole('button', {name: 'Request Booking'});
    }

    async goto() {
        await this.bookingPage.click();
    }
    async chooseBookingDate(date: string) {
        await this.page.locator('input[type="date"]').fill(date);
    }
    async pickFirstAvailableSlot() {
        await this.bookingSlot.click();
        await this.requestBooking.click();
    }
}