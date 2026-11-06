import { faker } from '@faker-js/faker';

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
export const randomName = firstName + lastName;
export const randomEmail = faker.internet.email({ firstName, lastName });
export const randomPassword = faker.internet.password();

export const clubSlugDefault = 'lakeview-bowls';