import { test, expect } from '@playwright/test';

test(`Has title equal to 'Welcome to the-internet'`, async ({ page }) => {
  // 1. Mở trang
  await page.goto('https://the-internet.herokuapp.com/');

  // 2. Lấy element
  const title = page.locator(`//h1[contains(@class, 'heading')]`);

  // 3. Lấy text element
  const actualTitle = await title.innerText(); // cần await vì innerText() là async

  // 4. Assertion
  expect(actualTitle).toBe('Welcome to the-internet'); // toBe() sync → không cần await

  // 5. Expect async cho page
  await expect(page).toHaveTitle(/The Internet/); // cần await vì toHaveTitle là async
});
