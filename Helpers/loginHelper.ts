import { request } from 'playwright-core';
import { Page } from '@playwright/test';

/**
 * Общая функция логина, возвращает значение SID cookie (используется и в UI, и в API)
 */
async function getSidFromLogin(): Promise<string> {
  const client = await request.newContext();
  const response = await client.post('https://qauto.forstudy.space/api/auth/signin', {
    data: {
      email: '123test@gmail.com',
      password: 'Parol123!',
      remember: true
    }
  });

  if (!response.ok()) {
    throw new Error(`Login failed: ${response.status()}`);
  }

  // Получаем заголовки set-cookie
  const setCookieHeader = response.headers()['set-cookie'];
  if (!setCookieHeader) {
    throw new Error('Set-Cookie header not found in login response');
  }

  // Парсим строку set-cookie, ищем sid
  const cookieArray = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
  const sidCookie = cookieArray.find((cookie) => cookie.startsWith('sid='));

  if (!sidCookie) {
    throw new Error('SID cookie not found in Set-Cookie headers');
  }

  const sidValue = sidCookie.split(';')[0].split('=')[1];
  console.log('Extracted SID:', sidValue);
  return sidValue;
}

/**
 * Используется в UI-тестах, устанавливает SID в браузерный контекст
 */
async function loginHelper(page: Page): Promise<string> {
  const sidValue = await getSidFromLogin();
  await page.context().addCookies([
    {
      name: 'sid',
      value: sidValue,
      domain: '.forstudy.space',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax'
    }
  ]);

  return sidValue;
}

/**
 * Используется в API-тестах — просто возвращает SID
 */
async function apiloginHelper(): Promise<string> {
  return await getSidFromLogin();
}

/**
 * Ручная установка SID куки на странице
 */
async function setCookies(page: Page, sidValue: string): Promise<void> {
  if (!sidValue) {
    throw new Error('SID value is empty or undefined');
  }

  await page.context().addCookies([
    {
      name: 'sid',
      value: sidValue,
      domain: '.forstudy.space',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax'
    }
  ]);

  await page.reload();
}

export { loginHelper, apiloginHelper, setCookies };