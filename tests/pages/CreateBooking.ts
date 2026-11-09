import { APIRequestContext, Request, type Locator, type Page } from '@playwright/test';
import { bookingId, randomTime } from '../helpers/NewBookingData';
import date from '../helpers/date';

 export async function CreateUserPost( request: APIRequestContext ) {
    const response = await request.post('/api/bookings', {data:{
  "date": date,
  "slots": [
    { "rinkId": "seed-rink-7", "timeSlot": `${randomTime}:00`, "playerName": "Test Player", "bookingId": `${bookingId}` }
  ]
}});
return (response)
}