import { test, expect } from '@playwright/test';

test('first test', async ({ page }) => {
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
  await expect(page).toHaveURL('https://qauto.forstudy.space');
})

test('positiv test', async ({ page }) => {
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
  await page.click('.hero-descriptor_btn');
  await page.fill('#signupName', 'Name');
  await page.fill('#signupLastName', 'Test');
  await page.fill('#signupEmail', `aqa-${Date.now()}@test.com`);
  await page.fill('#signupPassword', 'Qwerty123!');
  await page.fill('#signupRepeatPassword', 'Qwerty123!');

  await page.click('button:has-text("Register")');

  await expect(page.locator('.sidebar > .btn-link')).toContainText('Log out');
});

test('#1 negativ test', async ({ page }) => {
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
  await page.click('.hero-descriptor_btn');

  await page.fill('#signupName', '');
  await page.click('.modal-body');
  const nameError = page.locator('.form-group:has(#signupName) .invalid-feedback')
  await expect(nameError).toHaveText('Name required');
  await page.fill('#signupName', '123');
  await expect(nameError).toHaveText('Name is invalid');
  await page.fill('#signupName', 'A');
  await expect(nameError).toHaveText('Name has to be from 2 to 20 characters long');
  await page.fill('#signupName', 'Incomprehensibilities');
   const borderColor = await page.locator('#signupName').evaluate(el =>
  window.getComputedStyle(el).getPropertyValue('border-color')
);
expect(borderColor).toBe('rgb(220, 53, 69)');
  await expect(page.locator('text=Name has to be from 2 to 20 characters long')).toBeVisible();
 // await expect(nameError).toHaveText('Name has to be from 2 to 20 characters long');
});
test('#2 negativ test', async ({ page }) => {
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
  await page.click('.hero-descriptor_btn');

  await page.fill('#signupLastName', '');
  await page.click('.modal-body');
  const nameError = page.locator('.form-group:has(#signupLastName) .invalid-feedback')
  await expect(nameError).toHaveText('Last name required');
  await page.fill('#signupLastName', '123');
  await expect(nameError).toHaveText('Last name is invalid');
  await page.fill('#signupLastName', 'A');
  await expect(nameError).toHaveText('Last name has to be from 2 to 20 characters long');
   await page.fill('#signupLastName', 'Incomprehensibilities');
  let borderColor = await page.locator('#signupLastName').evaluate(el =>
    window.getComputedStyle(el).getPropertyValue('border-color')
  );
  expect(borderColor).toBe('rgb(220, 53, 69)');
  await expect(page.locator('text=Last name has to be from 2 to 20 characters long')).toBeVisible();
 // await expect(nameError).toHaveText('Name has to be from 2 to 20 characters long');
});
test('#3 negativ test', async ({ page }) => {
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
  await page.click('.hero-descriptor_btn');

  await page.fill('#signupEmail', '');
  await page.click('#signupLastName');
  const nameError = page.locator('.form-group:has(#signupEmail) .invalid-feedback')
  await expect(nameError).toHaveText('Email required');
  await page.fill('#signupEmail', '123');
  await expect(nameError).toHaveText('Email is incorrect');
 
});
 test('#4 negativ test', async ({ page }) => {
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
  await page.click('.hero-descriptor_btn');

  await page.fill('#signupPassword', '');
  await page.click('.modal-body');
  const nameError = page.locator('.form-group:has(#signupPassword) .invalid-feedback')
  await expect(nameError).toHaveText('Password required');
  await page.fill('#signupPassword', '123');
  await expect(nameError).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
 });
test('#5 negativ test', async ({ page }) => {
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
  await page.click('.hero-descriptor_btn');
  
  
  await expect(page.locator('button:has-text("Register")')).toBeDisabled();
  await page.fill('#signupLastName', '123');
  await page.fill('#signupEmail', '123');
  await page.fill('#signupEmail', '123');
  await page.fill('#signupPassword', '123');

  await expect(page.locator('button:has-text("Register")')).toBeDisabled();
});


