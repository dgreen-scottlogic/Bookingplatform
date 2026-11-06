import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { ClubUserBookingPage } from '../pages/ClubUserBookingPage';
import { test as base } from '@playwright/test';
import { CleanUp } from './CleanUp';
import { randomEmail, randomName, randomPassword, clubSlugDefault } from './NewUserLogin';
import date from './date';

type Pages = { loginPage: LoginPage; homePage: HomePage; clubUserBookingPage: ClubUserBookingPage, cleanUp: CleanUp, registerPageWithClub: RegisterPage, registerPageWithoutClub: RegisterPage }; 
 
export const test = base.extend < Pages > ({

  registerPageWithClub: async ({ page }, use) => {
    const registerPageWithClub = new RegisterPage(page);
    await registerPageWithClub.goto();
    await registerPageWithClub.registerWithClub(randomName, randomEmail, randomPassword, clubSlugDefault);
    
    await use( registerPageWithClub );
  },

  registerPageWithoutClub: async ({ page }, use) => {
    const registerPageWithoutClub = new RegisterPage(page);
    await registerPageWithoutClub.goto();
    await registerPageWithoutClub.registerWithoutClub(randomName, randomEmail, randomPassword);
    await use( registerPageWithoutClub );
  },

  loginPage: async ({ page }, use) => { 
    await use( new LoginPage(page) );
  }, 

  homePage: async ({ page }, use) => { 
    await use( new HomePage(page) ); 
  }, 

  clubUserBookingPage: async ({ page }, use) => { 
    const booking = new ClubUserBookingPage(page);
    await booking.goto();
    await booking.chooseBookingDate(date);
    await booking.pickFirstAvailableSlot();
    await use( booking ); 
  },

  cleanUp: async ({ page }, use) => {
    await use( new CleanUp(page) );
  }
  
}); 
export { expect } from '@playwright/test'; 