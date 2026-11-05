import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { ClubUserBookingPage } from '../pages/ClubUserBookingPage';
import { test as base } from '@playwright/test';
import { CleanUp } from './CleanUp';

type Pages = { loginPage: LoginPage; homePage: HomePage; clubUserBookingPage: ClubUserBookingPage, cleanUp: CleanUp, registerPage: RegisterPage }; 
 
export const test = base.extend < Pages > ({

  registerPage: async ({ page }, use) => {
    
    await use( new RegisterPage(page) );
  },

  loginPage: async ({ page }, use) => { 
    await use( new LoginPage(page) );
  }, 

  homePage: async ({ page }, use) => { 
    await use( new HomePage(page) ); 
  }, 

  clubUserBookingPage: async ({ page }, use) => { 
    await use( new ClubUserBookingPage(page) ); 
  },

  cleanUp: async ({ page }, use) => {
    await use( new CleanUp(page) );
  }
  
}); 
export { expect } from '@playwright/test'; 