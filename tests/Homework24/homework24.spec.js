import { test, expect } from '@playwright/test';
const { RegistrationPage } =  require('../../pages/RegistrationPage') ;

test('positive registration test', async ({ page }) => {
  const reg = new RegistrationPage(page);
  await reg.open();
  await reg.clickRegisterButton();

  const email = `aqa-${Date.now()}@test.com`;
  await reg.fillRegistrationForm('Name', 'Test', email, 'Qwerty123!');

  await reg.registerButton.click();
  await expect(page.locator('.sidebar > .btn-link')).toContainText('Log out');
});

test('negative registration - empty name', async ({ page }) => {
  const reg = new RegistrationPage(page);
  await reg.open();
  await reg.clickRegisterButton();

  await reg.nameInput.fill('');
  await page.click('.modal-body');
  const nameError = page.locator('.form-group:has(#signupName) .invalid-feedback');
  await expect(nameError).toHaveText('Name required');
});