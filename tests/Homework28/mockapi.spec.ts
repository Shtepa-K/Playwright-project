import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://qauto.forstudy.space/api';

// Используем сохранённое состояние авторизованного пользователя
test.use({ storageState: 'storage/user.json' });

test('change response', async ({ page }) => {
  await page.route('**/api/users/profile', async route => {
    const mockjson = {
      status: 'ok',
      data: {
        userId: 1,
        photoFilename: 'default-user.png',
        name: 'NewTestName',
        lastName: 'NewTestlastName',
      },
    };
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockjson),
    });
  });

  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/panel/profile');
  await expect(page.locator('p.profile_name.display-4')).toHaveText('NewTestName NewTestlastName');
});

test('add car - positive', async () => {
  const context = await request.newContext({ storageState: 'storage/user.json' });
  // добавление автомобиля
  const response = await context.post(`${BASE_URL}/cars`, {
    data: {
      carBrandId: 1,
      carModelId: 3,
      mileage: 101,
    },
  });
  console.log('Status:', response.status());
  // Проверка
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);
  
  const body = await response.json()
  expect(body.status).toBe('ok');
  expect(body.carBrandId).toBe(1);
  expect(body.carModelId).toBe(3);
  expect(body.mileage).toBe(101);
});

test('add car - #1 negativ', async () => {
  const context = await request.newContext({ storageState: 'storage/user.json' });
  // добавление автомобиля, переданы не все параметры
  const response = await context.post(`${BASE_URL}/cars`, {
    data: {
     // carBrandId: 1,
      carModelId: 3,
      mileage: 101,
    },
  });
  console.log('Status:', response.status());
  // Проверка
  expect(response.ok()).toBeFalsy();
  expect(response.status()).toBe(400);
  
  const body = await response.json()
  expect(body.status).toBe('error');
  expect(body.message).toBe('Car brand id is required');
});

test('add car - #2 negativ', async () => {
  const context = await request.newContext({ storageState: 'storage/user.json' });
  // добавление автомобиля, переданы не корректные параметры
  const response = await context.post(`${BASE_URL}/cars`, {
    data: {
      carBrandId: 'odin',
      carModelId: 153,
      mileage: 101,
    },
  });
  console.log('Status:', response.status());
  // Проверка
  expect(response.ok()).toBeFalsy();
  expect(response.status()).toBe(400);
  
  const body = await response.json()
  expect(body.status).toBe('error');
  expect(body.message).toBe('Invalid car brand type');
});

test('add car - #3 negativ', async () => {
  const context = await request.newContext({ storageState: 'storage/user.json' });
  // добавление автомобиля, переданы не корректные параметры
  const response = await context.post(`${BASE_URL}/cars`, {
    data: {
      carBrandId: 1,
      carModelId: 153,
      mileage: 101,
    },
  });
  console.log('Status:', response.status());
  // Проверка
  expect(response.ok()).toBeFalsy();
  expect(response.status()).toBe(404);
  
  const body = await response.json()
  expect(body.status).toBe('error');
  expect(body.message).toBe('Model not found');
});

test('add car - #4 negativ', async () => {
  const context = await request.newContext({ storageState: 'storage/user.json' });
  // добавление автомобиля, переданы не корректные параметры
  const response = await context.post(`${BASE_URL}/cars`, {
    data: {
      carBrandId: 1,
      carModelId: 2,
      //mileage: 100,
    },
  });
  console.log('Status:', response.status());
  // Проверка
  expect(response.ok()).toBeFalsy();
  expect(response.status()).toBe(400);
  
  const body = await response.json()
  expect(body.status).toBe('error');
  expect(body.message).toBe('Mileage is required');
});