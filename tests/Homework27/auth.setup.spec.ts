import { test, expect } from '@playwright/test';

const authFile = 'storage/user.json'; // путь к файлу для хранения состояния

test('authenticate UI', async ({ page }) => {
  // Переход на страницу логина
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');

  // Заполнение полей
  await page.click('button.header_signin');
  await page.fill('#signinEmail', '123test@gmail.com');
  await page.fill('#signinPassword', 'Parol123!');

  // Клик на кнопку логина
  await page.click('button:has-text("Login")');

  // Ожидание перехода на страницу гаража
  await page.waitForURL('https://guest:welcome2qauto@qauto.forstudy.space/panel/garage');

  // Проверка, что попали в гараж
  await expect(page.locator('h1:has-text("Garage")')).toBeVisible(); // или любой другой элемент на гараже

  // Сохранение storageState
  await page.context().storageState({ path: authFile });

 // console.log(`Auth state saved to ${authFile}`);
});

