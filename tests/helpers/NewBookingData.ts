import { faker } from '@faker-js/faker';
import date from './date';

export const bookingId = faker.string.alphanumeric(27);
export const bookingDate = date;
export const randomTime = faker.number.int({ min: 9, max: 17});