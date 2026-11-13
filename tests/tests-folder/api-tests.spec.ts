import { test, expect } from '../helpers/test';
import { CreateBooking } from '../pages/CreateBooking';

test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
})

test.afterEach(async ({ page, cleanUp }) => {
await cleanUp.signOut();
await page.close();
});

test('GET /api/bookings returns a list', { tag: '@api' }, async ({ request }) => { 
  const response = await request.get('/api/bookings'); 
  expect(response.status()).toBe(200); 
  const body = await response.json(); 
  expect(body.length).toBeGreaterThan(0); 
  expect(body[0]).toHaveProperty('id'); 
}); 

test('create a booking', { tag: '@api' }, async ({ request }) => { 
  const response = await CreateBooking(request);
  expect(response.status()).toBe(201);  
});