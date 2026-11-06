import { test as teardown } from '@playwright/test';
import fs from 'fs';

teardown('delete database', async ({ }) => {
  fs.unlink('playwright/.auth/user.json', (err => {
        if (err) console.log(err);}));
});