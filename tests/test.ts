import { HomePage } from './HomePage';
import { RegisterPage } from './RegisterPage';
import { LoginPage } from './LoginPage';
import { ClubUserBooking } from './ClubUserBooking';
import { test as base } from '@playwright/test';

type Pages = { loginPage: LoginPage; homePage: HomePage; clubUserBooking: ClubUserBooking, registerPage: RegisterPage }; 
 
export const test = base.extend < Pages > ({

  registerPage: async ({page}, use) => {
    await use( new RegisterPage(page) );
  },

  loginPage: async ({page}, use) => { 
    await use( new LoginPage(page) );
  }, 

  homePage: async ({ page }, use) => { 
    await use( new HomePage(page) ); 
  }, 
  clubUserBooking: async ({ page }, use) => { 
    await use( new ClubUserBooking(page) ); 
  },
}); 
export { expect } from '@playwright/test'; 